// context for managing the filterbar / sidebar visibility

import React, { createContext, useContext, useState } from 'react';

const FilterBarState = createContext();

export const useFilterBarState = () => useContext(FilterBarState);

const FilterBar = ({children}) => {
  const [ visible, setVisible ] = useState(false);

  const value = { visible, setVisible };
  
  return (
    <FilterBarState.Provider value={ value } >
      {children}
    </FilterBarState.Provider>
  )
}

export default FilterBar;