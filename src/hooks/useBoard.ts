import { useState } from 'react';

import { LetterColor } from '../shared/models/color.enum';
import { Answer } from '../shared/models/answer';

const defaultStates = {
  turn: 0,
  currentWord: [],
  answers: [...Array(5)],
  isWin: false,
  isOpenModal: false,
}

export const useBoard = ({mystery}: { mystery: string }) => {
  const [turn, setTurn] = useState<number>(defaultStates.turn);
  const [currentWord, setCurrentWord] = useState<string[]>(defaultStates.currentWord);
  const [answers, setAnswers] = useState<Answer[][]>(defaultStates.answers);
  const [isWin, setIsWin] = useState<boolean>(defaultStates.isWin);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(defaultStates.isOpenModal);

  const setStateToDefault = () => {
    setTurn(defaultStates.turn);
    setCurrentWord(defaultStates.currentWord);
    setAnswers(defaultStates.answers);
    setIsWin(defaultStates.isWin);
    setIsOpenModal(defaultStates.isOpenModal);
  }
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

      const isWin = formattedAnswer.every(({color}) => color === LetterColor.GREEN);
      if (isWin) {
        setIsWin(isWin);
        setIsOpenModal(true);
      }
      return newAnswers;
    })

    setTurn(prevTurn => prevTurn + 1)
    setCurrentWord([])
  }

  const handleKeyup = ({key}: { key: string }) => {
    switch (true) {
      case (key === 'Backspace'): {
        return setCurrentWord(prev => prev.slice(0, -1));
      }
      case (/^[A-Za-z]$/.test(key) && currentWord.length < 5): {
        return setCurrentWord(prev => [...prev, key]);
      }
      case (key === 'Enter'): {
        if (currentWord.length !== 5) {
          return;
        }

        if (turn === 4) {
          return setIsOpenModal(true);
        }

        const formattedAnswer = formatAnswer()
        return addNewAnswer(formattedAnswer);
      }
      case (currentWord.length >= 5): {
        return;
      }
    }
  }

  return {turn, currentWord, answers, isWin, isOpenModal, setIsOpenModal, setStateToDefault, handleKeyup};
}
