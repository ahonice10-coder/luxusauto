import { describe, expect, it } from 'vitest'
import { translations } from './translations'
import { translate } from './translate'

describe('translate', () => {
  it('returns nested French strings', () => {
    expect(translate(translations, 'fr', 'nav.home')).toBe('Accueil')
    expect(translate(translations, 'fr', 'language.italian')).toBe('Italiano')
  })

  it('falls back to the path when a key is missing', () => {
    expect(translate(translations, 'fr', 'does.not.exist')).toBe('does.not.exist')
  })
})
