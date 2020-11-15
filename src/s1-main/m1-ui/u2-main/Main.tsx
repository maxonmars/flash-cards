import React from 'react'
import { Header } from '../u4-header/Header'
import { Routes } from '../u3-routes/Routes'
import s from './Main.module.scss'

export const Main = () => {
   return (
      <div className={s.mainContainer}>
         Main
         <Header />
         <Routes />
      </div>
   )
}
