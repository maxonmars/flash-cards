import React from 'react'
import s from './Error.module.scss'

type PropsType = {
   textError?: string
}

export const Error = ({ textError }: PropsType) => {
   return (
      <div className={s.error} style={{ color: '#ff6c11', marginBottom: '20px' }}>
         {textError}
      </div>
   )
}
