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
  downloadCount?: number
}

export interface ResourceIndex {
  resources: ResourceMetadata[]
  categories: Record<ResourceType, string[]>
  totalCount: number
  generatedAt: string
}

export interface ResourceDownloadData {
  slug: string
  download_count: number | null
}
