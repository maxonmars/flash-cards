import React from 'react'
import { GradesContainer } from './u1-grades/GradesContainer'

export type PropsGradesPageType = {
   card_id: string
}

export const GradesPage: React.FC<PropsGradesPageType> = ({ card_id }) => {
   return (
      <>
         <GradesContainer card_id={card_id} />
      </>
   )
}
