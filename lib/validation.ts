import { z } from 'zod'

export const slugSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')

export const searchParamsSchema = z.object({
  q: z
    .string()
    .max(200, 'Search query too long')
    .regex(/^[a-zA-Z0-9\s\-_.,!?()[\]{}'"/@#$%&*+=<>:;|\\]+$/, 'Invalid characters in search query')
    .optional()
    .transform(val => val?.trim()),
  type: z.enum(['command', 'rule', 'mcp', 'hook']).optional(),
  category: z
    .string()
    .max(100)
    .regex(/^[a-zA-Z0-9\-_]+$/, 'Invalid category format')
    .optional(),
  limit: z
    .string()
    .optional()
    .transform(val => val ? parseInt(val, 10) : 100)
    .pipe(z.number().int().min(1).max(1000)),
})

export const filterStateSchema = z.object({
  type: z.enum(['command', 'rule', 'mcp', 'hook', 'all']).optional(),
  category: z.string().max(100).optional(),
  searchQuery: z.string().max(200).optional(),
  sortBy: z.enum(['name', 'downloads', 'recent']).optional(),
})

export function validateSlug(slug: string): boolean {
  return slugSchema.safeParse(slug).success
}

export function sanitizeString(input: string, maxLength: number = 500): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '')
}

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export const MAX_REQUEST_SIZE = 1024 * 1024
export const MAX_QUERY_LENGTH = 200
export const MAX_SLUG_LENGTH = 255

