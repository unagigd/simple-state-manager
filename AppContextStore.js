import React from 'react';

export const { Provider: ContextPovider, Consumer: ContextConsumer } = React.createContext();

export default class AppContextStore extends React.Component {
  constructor(props) {
    super();

    this.storeState = {};

    this.state = {
      ...this.storeState
    };

    this.reduceState = this.reduceState.bind(this);
    this.getState = this.getState.bind(this);
  }

  getState() {
    return this.storeState;
  }

  reduceState(newState) {
    this.storeState = {
      ...this.storeState,
      ...newState
    };

    this.setState(
      prevState => ({
        ...prevState,
        ...newState
      }),
      () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('%c New state', 'background: #222; color: #bada55', this.state);
        }
      }
    );
  }

  render() {
    const { ...propsFromState } = this.state;

    return (
      <ContextPovider
        value={{
          state: { ...propsFromState },
          reduceState: this.reduceState,
          getState: this.getState
        }}
      >
        {this.props.children}
      </ContextPovider>
    );
  }
}
