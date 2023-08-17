import styles from './Keyboard.module.css'

type KeyboardProps = {
  disabled: boolean

  inactiveLetters: string[]
  activeLetters: string[]
  addGuessedLetter: (letter: string) => void
}

const KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

export function Keyboard({
  disabled = false,

  addGuessedLetter,
  activeLetters,
  inactiveLetters,
}: KeyboardProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr)',
        gap: '.5rem',
      }}
    >
      {KEYS.map((key) => {
        const isActive = activeLetters?.includes(key)
        const isInactive = inactiveLetters?.includes(key)
        return (
          <button
            key={key}
            className={`${styles.btn} 
               ${isActive ? styles.active : ''}
               ${isInactive ? styles.inactive : ''}`}
            onClick={() => addGuessedLetter(key)}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}
