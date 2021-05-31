import { render, fireEvent, waitFor } from '@testing-library/react';
import Tooltip from './index';
import styled from 'styled-components';

const Text = styled.h1`
  font-size: 32px;
  line-height: 32px;
  margin: 0;
  text-align: center;
  color: palevioletred;
  font-family: 'Roboto', sans-serif;
`;

const ToolTipText = styled.div`
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  color: palevioletred;
`;

describe('<Tooltip />', () => {
  it('should render properly', async () => {
    const { getByText } = render(
      <Tooltip
        placement="top"
        tooltipElement={<ToolTipText>I'm a tooltip</ToolTipText>}
      >
        <Text>I'm the main text</Text>
      </Tooltip>
    );

    expect(getByText("I'm the main text")).toBeVisible();
    expect(getByText("I'm a tooltip")).not.toBeVisible();

    fireEvent.mouseEnter(getByText("I'm the main text"));
    await waitFor(() => getByText("I'm a tooltip"));
    expect(getByText("I'm a tooltip")).toBeVisible();
  });

  it('should render always open tooltip', () => {
    const { getByText } = render(
      <Tooltip
        alwaysOpen
        placement="top"
        tooltipElement={<ToolTipText>I'm a tooltip</ToolTipText>}
      >
        <Text>I'm the main text</Text>
      </Tooltip>
    );

    expect(getByText("I'm the main text")).toBeVisible();
    expect(getByText("I'm a tooltip")).toBeVisible();
  });

  it('should call onOpen and onClose', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    const { getByText } = render(
      <Tooltip
        alwaysOpen
        onOpen={onOpen}
        onClose={onClose}
        placement="top"
        tooltipElement={<ToolTipText>I'm a tooltip</ToolTipText>}
      >
        <Text>I'm the main text</Text>
      </Tooltip>
    );

    fireEvent.mouseEnter(getByText("I'm the main text"));
    fireEvent.mouseLeave(getByText("I'm the main text"));

    expect(onOpen).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
