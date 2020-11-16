import React from 'react'
import { Main } from '../u2-main/Main'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../m2-bll/store'

export const App = () => {
   return (
      <Provider store={store}>
         <HashRouter>
            <div>
               <Main />
            </div>
         </HashRouter>
      </Provider>
   )
}
