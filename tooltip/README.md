# Getting Started with Create React App

## API

| Name | Type | Description |
|:-----|:-----|:-----|
| className | string | className used to modify the style of the tooltip. |
| alwaysOpen | boolean | keep the tooltip always open. |
| open | boolean | used to control the state of the tooltip. |
| onOpen | function | function called when tooltip is opened. |
| onClose | function | function called when tooltip is closed. |
| tooltipElement | React.Element | element rendered inside the tooltip. |
| placement | string | tooltip positioning in relation to the child. |
| children | React.Element | child in which the tooltip will be rendered. |


## Roadmap
+ Behaviors:
  - FLIPPING
    + Scroll the container (or the whole page) to see the tooltip flip to the opposite side once it's about to overflow the visible area. Once enough space is detected on its preferred side, it will flip back.
  - OVERFLOW PREVENTION 
    + Scroll the container (or the whole page) to see the tooltip stay within the boundary. Once the opposite edges of the popcorn and tooltip are aligned, the tooltip is allowed to overflow to prevent detachment.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
