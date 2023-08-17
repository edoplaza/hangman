import { useEffect, useState, useCallback } from 'react'

import { Keyboard } from './Keyboard'
import { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'

import words from './wordList.json'

const NUMBER_OF_BODY_PARTS = 6

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= NUMBER_OF_BODY_PARTS
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return
      setGuessedLetters((currentLetters) => [...currentLetters, letter]) // Important: previous state!
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener('keydown', handler)

    return () => document.removeEventListener('keydown', handler)
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== 'Enter') return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener('keydown', handler)

    return () => document.removeEventListener('keydown', handler)
  })

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: '2rem',
          textAlign: 'center',
        }}
      >
        {isLoser && 'You lose, loser!'}
        {isWinner && 'You are a winner!'}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
        reveal={isLoser}
      />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabled={isLoser || isWinner}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      {wordToGuess}
    </div>
  )
}

export default App
