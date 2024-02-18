import { useState } from 'react';

import { LetterColor } from '../shared/models/color.enum';
import { Answer } from '../shared/models/answer';

export const useBoard = ({mystery}: { mystery: string }) => {
  const [turn, setTurn] = useState<number>(0)
  const [currentWord, setCurrentWord] = useState<string[]>([])
  const [answers, setAnswers] = useState<Answer[][]>([...Array(5)])
  const [isWin, setIsWin] = useState<boolean>(false)

  const formatAnswer = () => {
    const mysteryArray = [...mystery];
    // create default answer
    const formattedAnswer: Answer[] = [...currentWord].map(key => {return {key, color: LetterColor.GRAY}});

    // add green and yellow colors
    [LetterColor.GREEN, LetterColor.YELLOW].forEach(color => {
      switch (color) {
        case (LetterColor.GREEN): {
          formattedAnswer.forEach(({key}, index) => {
            if (mysteryArray[index] === key) {
              mysteryArray[index] = '';
              formattedAnswer[index].color = LetterColor.GREEN;
            }
          })
          break;
        }
        case (LetterColor.YELLOW): {
          formattedAnswer.forEach(({key, color}, index) => {
            if (mysteryArray.includes(key) && color !== LetterColor.GREEN) {
              formattedAnswer[index].color = LetterColor.YELLOW;
              mysteryArray[mysteryArray.indexOf(key)] = '';
            }
          })
          break;
        }
      }
    })

    return formattedAnswer;
  }

  const addNewAnswer = (formattedAnswer: Answer[]) => {

    setAnswers(prevAnswers => {
      let newAnswers = [...prevAnswers]
      newAnswers[turn] = formattedAnswer;
      return newAnswers;
    })

    setTurn(prevTurn => prevTurn + 1)
    setCurrentWord([])
  }

  const handleKeyup = ({key}: { key: string }) => {
    debugger
    switch (true) {
      case (key === 'Backspace'): {
        return setCurrentWord(prev => prev.slice(0, -1));
      }
      case (/^[A-Za-z]$/.test(key) && currentWord.length < 5): {
        return setCurrentWord(prev => [...prev, key]);
      }
      case (key === 'Enter'): {
        if (isWin) {
          // Add logic for win case
          return;
        }

        if (turn + 1 > 5) {
          // Add logic for lose case
          return;
        }

        if (currentWord.length !== 5) {
          return;
        }

        const formattedAnswer = formatAnswer()
        return addNewAnswer(formattedAnswer);
      }
      case (currentWord.length >= 5): {
        return;
      }
    }
  }

  return {turn, currentWord, answers, isWin, handleKeyup}
}
