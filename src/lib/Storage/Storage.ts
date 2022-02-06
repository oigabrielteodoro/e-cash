import { pipe } from 'fp-ts/function'
import { Option, fromNullable, fold, none, some } from 'fp-ts/Option'

const PREFIX = '@e-cash'

export function getItem<T>(key: string): Option<T> {
  const storagedValue = localStorage.getItem(`${PREFIX}:${key}`)

  return pipe(
    storagedValue,
    fromNullable,
    fold(
      () => none,
      (storagedValue) => {
        const parsedValue = JSON.parse(storagedValue)

        return some(parsedValue)
      },
    ),
  )
}

export function setItem(key: string, value: unknown) {
  const valueToStorage = JSON.stringify(value)

  localStorage.setItem(`${PREFIX}:${key}`, valueToStorage)
}

export function removeItem(key: string) {
  localStorage.removeItem(key)
}
