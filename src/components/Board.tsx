import React, { useEffect } from 'react';

import { useBoard } from '../hooks/useBoard';
import { Row } from './Row';

type BoardProps = {
  solution: string;
}
export const Board = ({solution}: BoardProps) => {
  const {currentWord, answers, turn, handleKeyup} = useBoard({mystery: solution})

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup])

  return (
    <div className="row-wrapper">
      {
        answers.map((answer, index) => turn === index ?
          <Row key={index} currentWord={currentWord}/> : <Row key={index} answer={answer}/>
        )
      }
    </div>
  )
}
