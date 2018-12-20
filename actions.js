export function setStateProperty(propertyValue) {
  return (reduceState, getState, dispatch) => {
    // dispatch(otherAction);
    reduceState({      
        property: propertyValue
    });
  };
}
