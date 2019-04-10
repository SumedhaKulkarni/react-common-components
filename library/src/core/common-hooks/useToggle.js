import { useState } from 'react';

function useToggle(initialValue) {
  const [toggleValue, setToggleValue] = useState(initialValue);
  const toggler = () => setToggleValue(!toggleValue);
  return [toggleValue, toggler];
}

export default useToggle;
