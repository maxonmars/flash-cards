import React from 'react'
import { Grades } from './Grades'
import { useDispatch } from 'react-redux'
import { thunks } from '../../../f7-cards/c2-bll/cardsReducer'

export type PropsGradesPageType = {
   card_id: string
}

export const GradesContainer: React.FC<PropsGradesPageType> = ({ card_id }) => {
   const dispatch = useDispatch()

   const handlerAddGrade = (grade: number) => {
      dispatch(thunks.updateCardGrade({ grade, card_id }))
   }
   return (
      <>
         <Grades handlerAddGrade={handlerAddGrade} />
      </>
   )
}
