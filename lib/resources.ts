import fs from 'fs'
import path from 'path'
import type { ResourceMetadata, ResourceIndex, ResourceType } from '@/types/resources'

const INDEX_PATH = path.join(process.cwd(), 'public', 'data', 'resources-index.json')
const RESOURCES_DIR = path.join(process.cwd(), 'cursor-resources')

let cachedIndex: ResourceIndex | null = null

export function getResourceIndex(): ResourceIndex {
  if (cachedIndex) return cachedIndex

  try {
    const indexData = fs.readFileSync(INDEX_PATH, 'utf-8')
    cachedIndex = JSON.parse(indexData)
    return cachedIndex!
  } catch (error) {
    console.error('Failed to load resource index:', error)
    throw new Error('Resource index not found. Run `npm run resources:index` to generate it.')
  }
}

export function getResourceBySlug(slug: string): ResourceMetadata | null {
  const index = getResourceIndex()
  return index.resources.find(r => r.slug === slug) || null
}

export function getResourcesByType(type: ResourceType): ResourceMetadata[] {
  const index = getResourceIndex()
  return index.resources.filter(r => r.type === type)
}

export function getResourcesByCategory(type: ResourceType, category: string): ResourceMetadata[] {
  const index = getResourceIndex()
  return index.resources.filter(r => r.type === type && r.category === category)
}

export function getResourceContent(filePath: string): string {
  const absolutePath = path.join(RESOURCES_DIR, filePath)
  
  const resolvedPath = path.resolve(absolutePath)
  const resolvedResourcesDir = path.resolve(RESOURCES_DIR)
  
  if (!resolvedPath.startsWith(resolvedResourcesDir)) {
    throw new Error('Invalid file path: path traversal detected')
  }

  const allowedExtensions = ['.md', '.mdc', '.json', '.sh']
  const extension = path.extname(resolvedPath)
  
  if (!allowedExtensions.includes(extension)) {
    throw new Error(`Invalid file type: ${extension}`)
  }

  if (!fs.existsSync(resolvedPath)) {
    throw new Error('Resource file not found')
  }

  return fs.readFileSync(resolvedPath, 'utf-8')
}

export async function getResourceWithContent(slug: string): Promise<(ResourceMetadata & { content: string }) | null> {
  const resource = getResourceBySlug(slug)
  if (!resource) return null

  try {
    const content = getResourceContent(resource.filePath)
    return { ...resource, content }
  } catch (error) {
    console.error(`Failed to load content for ${slug}:`, error)
    return null
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

