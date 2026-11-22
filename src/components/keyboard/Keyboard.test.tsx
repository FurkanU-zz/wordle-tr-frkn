import { fireEvent, render } from '@testing-library/react'
import { Keyboard } from './Keyboard'

jest.mock('../../lib/statuses', () => ({ getStatuses: () => ({}) }))

test.each([
  ['ç', 'Ç'],
  ['ğ', 'Ğ'],
  ['i', 'İ'],
  ['ı', 'I'],
  ['ö', 'Ö'],
  ['ş', 'Ş'],
  ['ü', 'Ü'],
  ['Ç', 'Ç'],
  ['Ğ', 'Ğ'],
  ['İ', 'İ'],
  ['I', 'I'],
  ['Ö', 'Ö'],
  ['Ş', 'Ş'],
  ['Ü', 'Ü'],
  ['a', 'A'],
  ['q', 'Q'],
  ['w', 'W'],
  ['x', 'X'],
])('accepts physical key %s as %s', (key, expected) => {
  const onChar = jest.fn()
  render(
    <Keyboard
      onChar={onChar}
      onDelete={jest.fn()}
      onEnter={jest.fn()}
      guesses={[]}
    />
  )

  fireEvent.keyUp(window, { key })

  expect(onChar).toHaveBeenCalledTimes(1)
  expect(onChar).toHaveBeenCalledWith(expected)
})

test('ignores non-letter keys and preserves Enter and Backspace', () => {
  const onChar = jest.fn()
  const onDelete = jest.fn()
  const onEnter = jest.fn()
  const { unmount } = render(
    <Keyboard
      onChar={onChar}
      onDelete={onDelete}
      onEnter={onEnter}
      guesses={[]}
    />
  )

  ;['1', ' ', 'ArrowLeft', 'Shift', 'ß', 'é'].forEach((key) => {
    fireEvent.keyUp(window, { key })
  })
  fireEvent.keyUp(window, { key: 'Enter', code: 'Enter' })
  fireEvent.keyUp(window, { key: 'Backspace', code: 'Backspace' })

  expect(onChar).not.toHaveBeenCalled()
  expect(onEnter).toHaveBeenCalledTimes(1)
  expect(onDelete).toHaveBeenCalledTimes(1)

  unmount()
  fireEvent.keyUp(window, { key: 'a' })
  expect(onChar).not.toHaveBeenCalled()
})
