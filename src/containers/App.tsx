import React, { useMemo } from 'react';

import { FloatingActionButton } from '../components/FloatingActionButton';
import { Margin } from '../models/Margin';
import { Mode } from '../models/Mode';
import { Position } from '../models/Position';

type Props = {
  margin: Margin;
  mode: Mode | null;
  onClick(event: React.MouseEvent<HTMLElement>): void;
  position: Position;
};

export const App: React.VFC<Props> = ({ margin, position, mode, onClick }) => {
  const icon = useMemo(() => getIconFromMode(mode), [mode]);

  if (icon === null) {
    return null;
  }

  return (
    <FloatingActionButton
      icon={icon}
      margin={margin}
      position={position}
      onClick={onClick}
    />
  );
};

function getIconFromMode(mode: Mode | null): string | null {
  switch (mode) {
    case 'preview':
      return 'edit';
    case 'source':
    case 'live':
      return 'file-text';
    default:
      return null;
  }
}
