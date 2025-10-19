import { FileCode, FileText, FileJson, Terminal, type LucideIcon } from 'lucide-react'
import type { ResourceType } from '@/types/resources'

export function getFileIcon(extension: string): LucideIcon {
  switch (extension) {
    case '.md':
    case '.mdc':
      return FileText
    case '.json':
      return FileJson
    case '.sh':
      return Terminal
    default:
      return FileCode
  }
}

export function getResourceTypeIcon(type: ResourceType): string {
  switch (type) {
    case 'command':
      return '⚡'
    case 'rule':
      return '📋'
    case 'mcp':
      return '🔌'
    case 'hook':
      return '🪝'
  }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

export function formatNumber(num: number): string {
  if (num < 1000) return num.toString()
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`
  return `${(num / 1000000).toFixed(1)}M`
}

export function getLanguageFromExtension(extension: string): string {
  switch (extension) {
    case '.md':
    case '.mdc':
      return 'markdown'
    case '.json':
      return 'json'
    case '.sh':
      return 'bash'
    case '.js':
      return 'javascript'
    case '.ts':
      return 'typescript'
    case '.tsx':
      return 'typescript'
    case '.py':
      return 'python'
    default:
      return 'text'
  }
}

