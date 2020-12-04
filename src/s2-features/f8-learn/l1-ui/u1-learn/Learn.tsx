import React from 'react'
import { ApiCardsType } from '../../../f7-cards/c3-dal/cardsAPI'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { GradesPage } from '../../../f9-grades/g1-ui/GradesPage'

type PropsType = {
   card: ApiCardsType
   isChecked: boolean
   setChecked: (checked: boolean) => void
   nextQuestion: () => void
}

export const Learn: React.FC<PropsType> = ({ card, nextQuestion, setChecked, isChecked }) => {
   return (
      <>
         <h2>Let's learn</h2>
         <span>{card.question}</span>
         <SuperButton onClick={() => setChecked(true)} children={'Show answer'} />
         {isChecked && (
            <>
               <span>{card.answer}</span>
               <GradesPage card_id={card._id} />
               <SuperButton onClick={() => nextQuestion()} children={'Next question'} />
            </>
         )}
      </>
   )
}
