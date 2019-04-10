import { useState } from 'react';

function useFilterList(list) {
  const [listCollection, setFilterList] = useState(list);
  const [cloneListCollection] = useState(list);

  const filterList = (text, prop = 'title') => {
    let clonedList = cloneListCollection;
    if (text.length > 0) {
      clonedList= clonedList.filter(item => item[prop].toLowerCase().indexOf(text.toLowerCase()) >= 0); // eslint-disable-line
    } else {
      clonedList = cloneListCollection;
    }
    setFilterList(clonedList);
  };
  return [listCollection, filterList];
}

export default useFilterList;
