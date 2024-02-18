import React, { Dispatch, useEffect } from 'react';

import { useBoard } from '../hooks/useBoard';
import { Row } from './Row';
import { Modal } from './Modal';

type BoardProps = {
  solution: string;
  setReloadApp: Dispatch<boolean>;
}
export const Board = ({solution, setReloadApp}: BoardProps) => {
  const {
    currentWord,
    answers,
    turn,
    isWin,
    isOpenModal,
    setStateToDefault,
    handleKeyup
  } = useBoard({mystery: solution})

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isWin) {
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup])

  return (
    <div className="board-wrapper">
      <div className="row-wrapper">
        {
          answers.map((answer, index) => turn === index ?
            <Row key={index} currentWord={currentWord}/> : <Row key={index} answer={answer}/>
          )
        }
      </div>
      <div>
        {isOpenModal &&
            <Modal isWin={isWin} turn={turn} setReloadApp={setReloadApp} setStateToDefault={setStateToDefault}/>}
      </div>
    </div>
  )
}
