import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Tooltip, { placements } from './components/Tooltip';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Text = styled.h1`
  font-size: 32px;
  line-height: 32px;
  margin: 0;
  text-align: center;
  color: palevioletred;
  font-family: 'Roboto', sans-serif;
`;

const Button = styled.button`
  background: white;
  color: palevioletred;
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const ToolTipText = styled.div`
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`;

const StyledTooltip = styled(Tooltip)`
  background-color: palevioletred;
  color: palevioletred;
`;

export function App() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="App">
      <Wrapper>
        <Tooltip
          placement="top"
          alwaysOpen
          tooltipElement={<ToolTipText>Im always open</ToolTipText>}
        >
          <Text>Tooltip on top</Text>
        </Tooltip>
      </Wrapper>
      <Wrapper>
        <Tooltip
          placement="top"
          open={open}
          tooltipElement={<ToolTipText>I'm tooltip</ToolTipText>}
        >
          <Text>Controlled tooltip</Text>
        </Tooltip>
        <Button onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'}
        </Button>
      </Wrapper>
      <Wrapper>
        <Tooltip
          placement="bottom"
          tooltipElement={
            <ToolTipText>
              Im a tooltip too too too too too too too too too too long
            </ToolTipText>
          }
        >
          <Text>Tooltip on bottom</Text>
        </Tooltip>
      </Wrapper>
      <Wrapper>
        <Tooltip
          placement="right"
          tooltipElement={
            <ToolTipText>
              Im a tooltip
              <br />
              with
              <br />
              some
              <br />
              blocks
            </ToolTipText>
          }
        >
          <Text>Tooltip on right</Text>
        </Tooltip>
      </Wrapper>
      <Wrapper>
        <StyledTooltip
          alwaysOpen
          placement="left"
          tooltipElement={
            <ToolTipText style={{ color: 'white' }}>Im a tooltip</ToolTipText>
          }
        >
          <Text>Styled tooltip on left</Text>
        </StyledTooltip>
      </Wrapper>
      <Wrapper>
        <Tooltip
          placement="left"
          tooltipElement={<ToolTipText>Im a tooltip</ToolTipText>}
        >
          <Text>Double</Text>
          <Text>Block</Text>
        </Tooltip>
      </Wrapper>
      {placements.map((t) => (
        <Wrapper key={t}>
          <Tooltip
            alwaysOpen
            placement={t}
            tooltipElement={<ToolTipText>Im a tooltip</ToolTipText>}
          >
            <Text>Tooltip on {t}</Text>
          </Tooltip>
        </Wrapper>
      ))}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
