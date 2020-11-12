import React from 'react'
import {Header} from "../u4-header/Header";
import {Routes} from "../u3-routes/Routes";
import s from './Main.module.css'

export const Main = () => {

    return <div className={s.mainContainer}>Main
        <Header/>
        <Routes/>
    </div>
}