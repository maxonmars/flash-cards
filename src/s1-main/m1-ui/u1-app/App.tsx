import React from 'react'
import { Main } from '../u2-main/Main'
import { HashRouter } from 'react-router-dom'

export const App = () => {
   return (
      <HashRouter>
         <div>
            <Main />
         </div>
      </HashRouter>
   )
}
