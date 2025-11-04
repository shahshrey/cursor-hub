import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly userMessage: string = 'An error occurred',
    public readonly isOperational = true
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, userMessage: string = 'Invalid input') {
    super(message, 400, userMessage, true)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, userMessage: string = 'Resource not found') {
    super(message, 404, userMessage, true)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', userMessage: string = 'Authentication required') {
    super(message, 401, userMessage, true)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', userMessage: string = 'Access denied') {
    super(message, 403, userMessage, true)
  }
}

function sanitizeErrorMessage(message: string): string {
  const sensitivePatterns = [
    /\/[A-Za-z0-9\/._-]+/g,
    /password|secret|token|key/gi,
    /postgresql:\/\/[^\s]+/g,
    /mongodb:\/\/[^\s]+/g,
  ]

  let sanitized = message
  sensitivePatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[REDACTED]')
  })

  return sanitized
}

export function handleApiError(error: unknown): NextResponse {
  const isDevelopment = process.env.NODE_ENV === 'development'

  if (error instanceof AppError) {
    if (isDevelopment) {
      console.error(`[${error.name}]`, error.message)
    }
    
    return NextResponse.json(
      { 
        error: error.userMessage,
        ...(isDevelopment && { details: sanitizeErrorMessage(error.message) })
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof ZodError) {
    if (isDevelopment) {
      console.error('[ValidationError]', error.errors)
    }
    
    return NextResponse.json(
      { 
        error: 'Invalid request parameters',
        ...(isDevelopment && { details: error.errors })
      },
      { status: 400 }
    )
  }

  console.error('[UnexpectedError]', error instanceof Error ? error.message : 'Unknown error')
  if (isDevelopment && error instanceof Error) {
    console.error(error.stack)
  }
  
  return NextResponse.json(
    { 
      error: 'An unexpected error occurred',
      ...(isDevelopment && error instanceof Error && { 
        details: sanitizeErrorMessage(error.message) 
      })
    },
    { status: 500 }
  )
}

export function logError(error: unknown, context?: string): void {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  if (isDevelopment) {
    console.error(`[Error${context ? ` - ${context}` : ''}]`, error)
  } else {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[Error${context ? ` - ${context}` : ''}]`, sanitizeErrorMessage(message))
  }
}

