import React from 'react'
import { Grades } from './Grades'
import { gradesAPI } from '../../g3-dal/gradesAPI'
import { useDispatch } from 'react-redux'
import { thunks } from '../../../../s2-features/f7-cards/c2-bll/cardsReducer'

export const GradesContainer = () => {
   const dispatch = useDispatch()

   const handlerAddGrade = (grade: number) => {
      dispatch(thunks.updateCardGrade({ grade, card_id: '5fc8f0ccfb71f8000484472e' }))
   }
   return (
      <>
         <Grades handlerAddGrade={handlerAddGrade} />
      </>
   )
}
