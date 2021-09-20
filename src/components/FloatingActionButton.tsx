import { icons } from 'feather-icons';
import React, { useMemo } from 'react';

import { Margin } from '../models/Margin';
import { Position } from '../models/Position';

type Props = {
  icon: string;
  margin: Margin;
  onClick(event: React.MouseEvent<HTMLElement>): void;
  position: Position;
};

export const FloatingActionButton: React.VFC<Props> = ({
  icon,
  margin,
  position,
  onClick,
}) => {
  const svg = useMemo(() => icons[icon]?.toSvg(), [icon]);

  const style = useMemo(() => getStyle(margin, position), [margin, position]);

  if (svg === undefined) {
    return null;
  }

  return (
    // TODO <button> or <input type="button"> instead of <div>.
    // In some themes, the default style of the button is overridden,
    // which breaks it on mobile.
    <div
      className="fab-FloatingActionButton"
      dangerouslySetInnerHTML={{ __html: svg }}
      role="button"
      style={style}
      onClick={onClick}
    />
  );
};

function getStyle(margin: Margin, position: Position) {
  switch (position) {
    case 'bottomLeft':
      return { bottom: margin, left: margin };
    case 'bottomRight':
      return { bottom: margin, right: margin };
  }
}
