import { WORDS } from '../constants/wordlist'
import { getWordOfDay, isWordInWordList } from './words'

afterEach(() => {
  jest.restoreAllMocks()
})

test.each(['İNCİR', 'IRMAK', 'ÇİÇEK', 'GÜNEŞ'])(
  'recognizes the Turkish uppercase guess %s',
  (word) => {
    expect(isWordInWordList(word)).toBe(true)
  }
)

test.each([
  ['incir', 'İNCİR'],
  ['ırmak', 'IRMAK'],
])('uses Turkish uppercase for the daily word %s', (word, expected) => {
  const index = WORDS.indexOf(word)
  expect(index).toBeGreaterThanOrEqual(0)
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  jest.spyOn(Date, 'now').mockReturnValue(epochMs + index * 86400000)

  expect(getWordOfDay().solution).toBe(expected)
})
