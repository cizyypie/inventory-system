import { jest } from '@jest/globals';

jest.unstable_mockModule('./prisma/index.js', () => {
  return import('./prisma/__mocks__/index.js');
});

jest.setTimeout(30000);
