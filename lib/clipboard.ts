export async function copyToClipboard(text: string, useFallback = false): Promise<boolean> {
  try {
    if (!useFallback && navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch (clipboardError) {
        if (clipboardError instanceof Error && clipboardError.name === 'NotAllowedError') {
          console.warn('Clipboard API failed due to focus, falling back to execCommand')
          useFallback = true
        } else {
          throw clipboardError
        }
      }
    }
    
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    textArea.setAttribute('readonly', '')
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    
    textArea.focus()
    textArea.select()
    textArea.setSelectionRange(0, text.length)
    
    const success = document.execCommand('copy')
    document.body.removeChild(textArea)
    
    if (!success) {
      throw new Error('execCommand("copy") returned false')
    }
    
    return success
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
    }
    return false
  }
}

