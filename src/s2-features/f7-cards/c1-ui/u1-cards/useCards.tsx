import React from 'react'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { ApiCardsType } from '../../c3-dal/cardsAPI'
import { useDispatch } from 'react-redux'
import { thunks } from '../../c2-bll/cardsReducer'

export const useCards = (id: string) => {
   const dispatch = useDispatch()

   const modelCards = {
      renderTitle: () => {
         const headerNames = ['question', 'answer', 'Grade', 'Shots', 'updated', 'Covers']

         return (
            <tr>
               {headerNames.map((header, index) => (
                  <th key={index}>{header}</th>
               ))}
               <th>
                  <SuperButton
                     onClick={() =>
                        dispatch(
                           thunks.createCard(
                              {
                                 answer: 'Some Answer',
                                 question: 'Some question',
                                 answerImg: '',
                                 answerVideo: '',
                                 cardsPack_id: id,
                                 grade: 0,
                                 rating: 0,
                                 shots: 0,
                                 type: '',
                                 questionImg: '',
                                 questionVideo: '',
                              },
                              id,
                           ),
                        )
                     }>
                     ADD
                  </SuperButton>
               </th>
            </tr>
         )
      },
      renderData: (card: ApiCardsType, index: number) => {
         return (
            <tr key={index}>
               <td>{card.question}</td>
               <td>{card.answer}</td>
               <td>{card.grade}</td>
               <td>{card.shots}</td>
               <td>{card.updated.slice(5, 16)}</td>
               <td>{card.questionImg}</td>
               <td>
                  <SuperButton onClick={() => dispatch(thunks.deleteCard(card._id, card.cardsPack_id))}>
                     del
                  </SuperButton>
                  <SuperButton
                     onClick={() =>
                        dispatch(
                           thunks.updateCard(
                              {
                                 _id: card._id,
                                 question: 'update question',
                                 comments: 'new comment',
                              },
                              card.cardsPack_id,
                           ),
                        )
                     }>
                     update
                  </SuperButton>
               </td>
            </tr>
         )
      },
   }

   return { modelCards }
}
