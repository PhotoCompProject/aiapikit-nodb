import React from 'react';
import { styles } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  selected = false,
  className = '',
  onClick
}) => {
  const baseClasses = styles.card.base;
  const interactiveClasses = interactive ? styles.card.interactive : '';
  const selectedClasses = selected ? styles.card.selected : '';

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${selectedClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};