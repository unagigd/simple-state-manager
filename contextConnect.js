import React from 'react';
import { ContextConsumer } from './AppContextStore';

function getWrappedActions(mapDispatchToProps, reduceState, getState) {
  function dispatch(actionCallback) {
    return actionCallback(reduceState, getState, dispatch);
  }

  return Object.keys(mapDispatchToProps).reduce(
    (reduced, key) => ({
      ...reduced,
      [key]: (...args) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `%c Action: %c ${key}`,
            'color: #00a; font-weight: 600',
            'color: #a00; font-weight: 600',
            args
          );
        }
        return mapDispatchToProps[key](...args)(reduceState, getState, dispatch);
      }
    }),
    {}
  );
}

export default function contextConnect(mapStateToProps = () => {}, mapDispatchToProps = {}) {
  return function getWrappedComponent(ComponentToWrap) {
    return function render(props) {
      return (
        <ContextConsumer>
          {({ state, reduceState, getState }) => (
            <ComponentToWrap
              {...props}
              {...mapStateToProps(state || {})}
              {...getWrappedActions(mapDispatchToProps, reduceState, getState)}
            />
          )}
        </ContextConsumer>
      );
    };
  };
}
