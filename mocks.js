import { jest } from '@jest/globals'

jest.unstable_mockModule('./prisma/index.js', () => ({
  default: (import('./prisma/mocks/index.js')).default,
}))

jest.setTimeout(30000)