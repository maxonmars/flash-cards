import React from 'react'
import s from './Error.module.scss'

type PropsType = {
   textError?: string
}

export const Error = ({ textError }: PropsType) => {
   return <div className={s.error}>{textError}</div>
}
