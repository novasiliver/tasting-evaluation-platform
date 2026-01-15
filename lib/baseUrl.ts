/**
 * Get the base URL for the application
 * Prioritizes NEXT_PUBLIC_BASE_URL env variable
 * Falls back to detecting from request URL
 * Defaults to production URL in production, localhost in development
 */
export function getBaseUrl(request?: Request): string {
  // First, check environment variable
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Try to detect from request headers (for production)
  if (request) {
    try {
      const requestUrl = new URL(request.url);
      const protocol = requestUrl.protocol;
      const host = requestUrl.host;
      if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
        return `${protocol}//${host}`;
      }
    } catch (error) {
      // If URL parsing fails, continue to defaults
    }
  }

  // Default based on environment
  if (process.env.NODE_ENV === 'production') {
    return 'https://tastecert.com';
  }

  return 'http://localhost:3000';
}

