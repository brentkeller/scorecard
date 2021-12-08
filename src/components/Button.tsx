import React from 'react';

interface IButton {
  onClick: () => void;
  children?: any;
  className?: string;
}

export const Button: React.FC<IButton> = (props) => {
  return (
    <button onClick={props.onClick} className={`btn ${props.className ?? ''}`}>
      {props.children}
    </button>
  );
};
