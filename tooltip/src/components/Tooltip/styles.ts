import styled from 'styled-components';
import { Placement } from './';

type BaseTooltipProps = {
  show: boolean;
  placement: Placement;
};

const topPlacementStyle = `
  transform: translate(-50%, 0);
  bottom: calc(100% + 5px);
`;

const bottomPlacementStyle = `
  transform: translate(-50%, 0);
  top: calc(100% + 5px);
`;

const rightPlacementStyle = `
  left: calc(100% + 5px);
  transform: translate(0, -50%);
`;

const leftPlacementStyle = `
  right: calc(100% + 5px);
  transform: translate(0, -50%);
`;

// Properties with 15% and 85% are better aligned with the main element
const TooltipStyleBasedOnPlacement = {
  top: `
    left: 50%;
    ${topPlacementStyle}
  `,
  'top-start': `
    left: 0%;
    ${topPlacementStyle}
  `,
  'top-end': `
    left: 100%;
    ${topPlacementStyle}
  `,
  bottom: `
    left: 50%;
    ${bottomPlacementStyle}
  `,
  'bottom-start': `
    left: 0%;
    ${bottomPlacementStyle}
  `,
  'bottom-end': `
    left: 100%;
    ${bottomPlacementStyle}
  `,
  right: `
    top: 50%;
    ${rightPlacementStyle}
  `,
  'right-start': `
    top: 15%; 
    ${rightPlacementStyle}
  `,
  'right-end': `
    top: 85%;
    ${rightPlacementStyle}
  `,
  left: `
    top: 50%;
    ${leftPlacementStyle}
  `,
  'left-start': `
    top: 15%;
    ${leftPlacementStyle}
  `,
  'left-end': `
    top: 85%;
    ${leftPlacementStyle}
  `,
};

// The arrow in the proportion of 80% and 20% is better aligned in relation to the tooltip
const ArrowStyleBasedOnPlacement = {
  top: `
    left: 50%;
    top: 100%;
  `,
  'top-start': `
    left: 80%;
    top: 100%;
  `,
  'top-end': `
    left: 20%;
    top: 100%;
  `,
  bottom: `
    left: 50%;
    bottom: 100%;
  `,
  'bottom-start': `
    left: 80%;
    bottom: 100%;
  `,
  'bottom-end': `
    left: 20%;
    bottom: 100%;
  `,
  right: `
    top: 50%;
    left: 0%;
  `,
  'right-start': `
    top: 60%;
    left: 0%;
  `,
  'right-end': `
    top: 40%;
    left: 0%;
  `,
  left: `
    top: 50%;
    right: 0%;
  `,
  'left-start': `
    top: 60%;
    right: 0%;
  `,
  'left-end': `
    top: 40%;
    right: 0%;
  `,
};

export const BaseTootip = styled.div<BaseTooltipProps>`
  opacity: ${(props) => (props.show ? 1 : 0)};

  background-color: #ffffff;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 4px;
  transition: opacity 0.4s;
  position: absolute;
  display: inline-block;
  width: max-content;

  /* Arrow */
  &&::after {
    content: '';
    position: absolute;
    margin: -4px;
    border-width: 4px;
    border-style: solid;
    transform: rotate(45deg);
    ${(props) => ArrowStyleBasedOnPlacement[props.placement]}
  }

  ${(props) => TooltipStyleBasedOnPlacement[props.placement]}
`;

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;
