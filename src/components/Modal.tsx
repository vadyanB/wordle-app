import { Dispatch } from 'react';

type ModalWrapperProps = {
  isWin: boolean,
  turn: number,
  setReloadApp: Dispatch<boolean>,
  setStateToDefault(): void,
}
export const Modal = ({isWin, turn, setReloadApp, setStateToDefault}: ModalWrapperProps) => {
  function reloadApp() {
    setReloadApp(true);
    setStateToDefault();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        {isWin && (
          <div className="modal-content">
            <div className="modal-emoji">🏆</div>
            <div className="title">You're a Winner, Champ!</div>
            <div className="desc">Congrats! You've just crushed it and won the game. Now, bask in your glory and
              celebrate like a boss! 🎉
            </div>
          </div>
        )}
        {!isWin && turn === 4 && (
          <div className="modal-content">
            <div className="modal-emoji">🙈</div>
            <div className="title">Oops! Tough Luck, But Don't Give Up!</div>
            <div className="desc">You didn't quite make it this time, but hey, no worries! Give it another shot, and who
              knows, the next round might be your moment of glory! Keep going, champ! 💪🎮
            </div>
          </div>
        )}
        <button className="modal-button" onClick={() => reloadApp()}>Try again</button>
      </div>
    </div>
  );
}

