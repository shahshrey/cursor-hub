import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ResourceMetadata, ResourceIndex, ResourceType } from '../types/resources'

const CURSOR_RESOURCES_DIR = path.join(process.cwd(), 'cursor-resources')
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'data')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'resources-index.json')

const TYPE_MAPPING: Record<string, ResourceType> = {
  commands: 'command',
  rules: 'rule',
  mcps: 'mcp',
  hooks: 'hook',
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractTitleFromMd(content: string, fileName: string): string {
  const taskMatch = content.match(/<task\s+name=["']([^"']+)["']>/i)
  if (taskMatch) return taskMatch[1]

  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) return h1Match[1].trim()

  return fileName.replace(/\.md$/, '').replace(/-/g, ' ')
}

function extractDescriptionFromMd(content: string): string {
  const objectiveMatch = content.match(/<task_objective>([\s\S]*?)<\/task_objective>/i)
  if (objectiveMatch) {
    return objectiveMatch[1].trim().replace(/\n/g, ' ').substring(0, 300)
  }

  const firstParagraph = content
    .split('\n\n')
    .find(p => p.trim() && !p.startsWith('#') && !p.startsWith('<'))
  
  return firstParagraph ? firstParagraph.trim().substring(0, 300) : ''
}

function extractTitleFromSh(content: string, fileName: string): string {
  const lines = content.split('\n')
  for (const line of lines) {
    if (line.startsWith('# ') && !line.startsWith('#!/')) {
      return line.substring(2).trim()
    }
  }
  return fileName.replace(/\.sh$/, '').replace(/-/g, ' ')
}

function extractDescriptionFromSh(content: string): string {
  const lines = content.split('\n')
  const commentLines: string[] = []
  let foundShebang = false

  for (const line of lines) {
    if (line.startsWith('#!/')) {
      foundShebang = true
      continue
    }
    if (foundShebang && line.startsWith('#')) {
      const comment = line.substring(1).trim()
      if (comment) commentLines.push(comment)
    } else if (foundShebang && line.trim()) {
      break
    }
  }

  return commentLines.join(' ').substring(0, 300)
}

function processFile(filePath: string, resourceType: ResourceType, category: string): ResourceMetadata | null {
  try {
    const stats = fs.statSync(filePath)
    const content = fs.readFileSync(filePath, 'utf-8')
    const fileName = path.basename(filePath)
    const extension = path.extname(filePath)
    const relativePath = path.relative(CURSOR_RESOURCES_DIR, filePath)

    let title = ''
    let description = ''
    let frontmatter: Record<string, any> | null = null
    let tags: string[] = []

    if (extension === '.md') {
      try {
        const parsed = matter(content)
        frontmatter = Object.keys(parsed.data).length > 0 ? parsed.data : null
        title = frontmatter?.title || extractTitleFromMd(content, fileName)
        description = frontmatter?.description || extractDescriptionFromMd(content)
        tags = frontmatter?.tags || []
      } catch (parseError) {
        title = extractTitleFromMd(content, fileName)
        description = extractDescriptionFromMd(content)
        tags = []
      }
    } else if (extension === '.mdc') {
      try {
        const parsed = matter(content)
        frontmatter = parsed.data
        title = frontmatter?.title || fileName.replace(/\.mdc$/, '').replace(/-/g, ' ')
        description = frontmatter?.description || parsed.content.substring(0, 300)
        tags = frontmatter?.tags || []
      } catch (parseError) {
        title = fileName.replace(/\.mdc$/, '').replace(/-/g, ' ')
        description = content.substring(0, 300)
        tags = []
      }
    } else if (extension === '.json') {
      try {
        const json = JSON.parse(content)
        const serverName = Object.keys(json.mcpServers || {})[0] || fileName.replace(/\.json$/, '')
        title = serverName
        description = json.mcpServers?.[serverName]?.description || ''
        tags = ['mcp', 'server']
      } catch {
        title = fileName.replace(/\.json$/, '')
        description = ''
      }
    } else if (extension === '.sh') {
      title = extractTitleFromSh(content, fileName)
      description = extractDescriptionFromSh(content)
      tags = ['shell', 'script']
    }

    const slug = `${resourceType}-${category}-${slugify(fileName.replace(extension, ''))}`
    const excerpt = description || content.substring(0, 300).replace(/\n/g, ' ')
    const searchContent = `${title} ${description} ${tags.join(' ')} ${excerpt}`.toLowerCase()

    return {
      slug,
      title,
      description,
      type: resourceType,
      category,
      filePath: relativePath,
      fileName,
      fileSize: stats.size,
      extension,
      excerpt,
      tags,
      frontmatter,
      searchContent,
      createdAt: stats.birthtime.toISOString(),
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error)
    return null
  }
}

function scanDirectory(dir: string, resourceType: ResourceType): ResourceMetadata[] {
  const resources: ResourceMetadata[] = []
  const typeDir = path.join(dir, resourceType === 'command' ? 'commands' : resourceType === 'rule' ? 'rules' : resourceType === 'mcp' ? 'mcps' : 'hooks')

  if (!fs.existsSync(typeDir)) {
    console.warn(`Directory not found: ${typeDir}`)
    return resources
  }

  const categories = fs.readdirSync(typeDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())

  for (const categoryDir of categories) {
    const categoryPath = path.join(typeDir, categoryDir.name)
    const files = fs.readdirSync(categoryPath)

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const stat = fs.statSync(filePath)

      if (stat.isFile()) {
        const resource = processFile(filePath, resourceType, categoryDir.name)
        if (resource) {
          resources.push(resource)
        }
      }
    }
  }

  return resources
}

function generateIndex(): ResourceIndex {
  console.log('🚀 Starting resource indexing...')

  const resources: ResourceMetadata[] = []
  const categories: Record<ResourceType, string[]> = {
    command: [],
    rule: [],
    mcp: [],
    hook: [],
  }

  for (const [typeKey, resourceType] of Object.entries(TYPE_MAPPING)) {
    console.log(`📁 Scanning ${typeKey}...`)
    const typeResources = scanDirectory(CURSOR_RESOURCES_DIR, resourceType)
    resources.push(...typeResources)

    const uniqueCategories = [...new Set(typeResources.map(r => r.category))]
    categories[resourceType] = uniqueCategories.sort()
    console.log(`   Found ${typeResources.length} resources in ${uniqueCategories.length} categories`)
  }

  const index: ResourceIndex = {
    resources: resources.sort((a, b) => a.title.localeCompare(b.title)),
    categories,
    totalCount: resources.length,
    generatedAt: new Date().toISOString(),
  }

  return index
}

function saveIndex(index: ResourceIndex): void {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf-8')
  console.log(`\n✅ Index generated successfully!`)
  console.log(`   Total resources: ${index.totalCount}`)
  console.log(`   Output: ${OUTPUT_FILE}`)
  console.log(`   File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB`)
}

try {
  const index = generateIndex()
  saveIndex(index)
} catch (error) {
  console.error('❌ Error generating index:', error)
  process.exit(1)
}

