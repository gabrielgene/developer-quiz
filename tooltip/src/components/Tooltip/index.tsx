import React from 'react';
import { BaseTootip, Wrapper } from './styles';

export const placements = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
] as const;

export type Placement = typeof placements[number];

type Props = {
  className?: string;
  alwaysOpen?: boolean;
  open?: boolean;
  onOpen?: () => {};
  onClose?: () => {};
  tooltipElement: React.ReactElement;
  placement: Placement;
};

const Tooltip: React.FC<Props> = ({
  className,
  alwaysOpen,
  open,
  onOpen,
  onClose,
  tooltipElement,
  children,
  placement,
}) => {
  const [isShown, setIsShown] = React.useState<boolean>(false);

  const memoizedOpen = React.useCallback(() => {
    onOpen && onOpen();
    setIsShown(true);
  }, [onOpen]);

  const memoizedClose = React.useCallback(() => {
    onClose && onClose();
    setIsShown(false);
  }, [onClose]);

  return (
    <Wrapper onMouseEnter={memoizedOpen} onMouseLeave={memoizedClose}>
      <BaseTootip
        role="tooltip"
        className={className}
        show={open ? open : alwaysOpen || isShown}
        placement={placement}
      >
        {tooltipElement}
      </BaseTootip>
      {children}
    </Wrapper>
  );
};

export default Tooltip;
