import { describe, expect, it, beforeEach } from 'vitest'
import { createId, readStorage, writeStorage } from './storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('creates prefixed unique ids', () => {
    const first = createId('v')
    const second = createId('v')
    expect(first.startsWith('v-')).toBe(true)
    expect(first).not.toBe(second)
  })

  it('round-trips JSON values', () => {
    expect(writeStorage('demo', { ok: true })).toBe(true)
    expect(readStorage('demo', null)).toEqual({ ok: true })
  })

  it('returns the fallback when empty', () => {
    expect(readStorage('missing', []).length).toBe(0)
  })
})
