import React, { createContext } from 'react'

export const myContext = createContext();

function Context({children}) {

  return (
    <myContext.Provider value={{}}>
        {children}
    </myContext.Provider>
  )
}

export default Context