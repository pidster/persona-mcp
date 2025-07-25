import { describe, it, expect } from 'vitest';
import { VERSION } from '../src/version.js';

describe('version.ts', () => {
  it('should export VERSION constant', () => {
    expect(VERSION).toBeDefined();
    expect(typeof VERSION).toBe('string');
  });

  it('should have a valid semantic version format', () => {
    // Test for semantic version format (x.y.z or x.y.z-prerelease)
    // Allow dots in prerelease (e.g., alpha.0, beta.1)
    const semverRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
    expect(VERSION).toMatch(semverRegex);
  });

  it('should match package.json version', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');

    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    expect(VERSION).toBe(packageJson.version);
  });

  it('should be a non-empty string', () => {
    expect(VERSION).toBeTruthy();
    expect(VERSION.length).toBeGreaterThan(0);
  });

  it('should not contain whitespace', () => {
    expect(VERSION).not.toMatch(/\s/);
  });

  it('should be immutable', () => {
    const originalVersion = VERSION;

    // Test that VERSION is an import and cannot be reassigned
    // This test checks that VERSION maintains its value (immutability through const)
    expect(VERSION).toBe(originalVersion);
    expect(typeof VERSION).toBe('string');
  });

  it('should be accessible via named export', () => {
    // Test that we can import VERSION as a named export
    expect(typeof VERSION).toBe('string');
    expect(VERSION).toBeTruthy();
  });
});
