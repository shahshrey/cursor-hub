export type ResourceType = 'command' | 'rule' | 'mcp' | 'hook'

export interface ResourceMetadata {
  slug: string
  title: string
  description: string
  type: ResourceType
  category: string
  filePath: string
  fileName: string
  fileSize: number
  extension: string
  excerpt: string
  tags: string[]
  frontmatter: Record<string, any> | null
  searchContent: string
  createdAt: string
}

export interface ResourceIndex {
  resources: ResourceMetadata[]
  categories: Record<ResourceType, string[]>
  totalCount: number
  generatedAt: string
}

