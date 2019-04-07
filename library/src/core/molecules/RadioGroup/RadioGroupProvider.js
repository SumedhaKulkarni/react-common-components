import React from 'react';
import {
  node,
} from 'prop-types';

export const RadioGroupContext = React.createContext();
export function RadioGroupProvider({
  children,
  ...props
}) {
  return (
    <RadioGroupContext.Provider value={{ ...props }}>
      {children}
    </RadioGroupContext.Provider>
  );
}
RadioGroupProvider.propTypes = {
  children: node.isRequired,
};
