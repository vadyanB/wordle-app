import React from 'react';

import { Answer } from '../shared/models/answer';

type RowProps = {
  answer?: Answer[];
  currentWord?: string[];
}

export const Row = ({answer, currentWord}: RowProps) => {
  const cellClassName = (color: string) => {
    return !!color ? `cell ${color}` : 'cell';
  }

  if (answer) {
    return (
      <div className="row">
        {answer.map((element, index) => (
          <div key={index} className={cellClassName(element.color)}>{element.key}</div>
        ))}
      </div>
    )
  } else {
    const currentWordLength = currentWord?.length || 0;
    const formattedCurrentWord: string[] = [...currentWord || [], ...Array(5 - currentWordLength).fill('')];

    return (
      <div className="row">
        {[...formattedCurrentWord].map((letter, i) => (
          <div key={i} className="cell">{letter}</div>
        ))}
      </div>
    )
  }
}