import React from 'react'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { ApiCardsType } from '../../c3-dal/cardsAPI'
import { useDispatch, useSelector } from 'react-redux'
import { cardsActions, InitialCardsType } from '../../c2-bll/cardsReducer'
import { AppStateType } from '../../../../s1-main/m2-bll/store'

export const useCards = (id: string) => {
   const {
      showCardsModal,
      deleteModal: { showDeleteModal },
      updateModal: { showUpdateModal },
   } = useSelector<AppStateType, InitialCardsType>((state) => state.cards)
   const userID = useSelector<AppStateType, string>((state) => state.login.userID)
   const packUserID = useSelector<AppStateType, string>((state) => state.cards.settings.packUserId)
   const dispatch = useDispatch()
   const modelCards = {
      renderTitle: () => {
         const headerNames = ['question', 'answer', 'Grade', 'updated', 'Covers']

         return (
            <tr>
               {headerNames.map((header, index) => (
                  <th key={index}>{header}</th>
               ))}
               <th>
                  {userID !== packUserID ? (
                     ''
                  ) : (
                     <SuperButton onClick={() => dispatch(cardsActions.showCardsModal(!showCardsModal))}>
                        ADD
                     </SuperButton>
                  )}
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
               <td>{card.updated.slice(5, 16)}</td>
               <td>{card.questionImg}</td>
               <td>
                  {userID !== packUserID ? (
                     ''
                  ) : (
                     <>
                        <SuperButton onClick={() => dispatch(cardsActions.showDeleteModal(!showDeleteModal, card._id))}>
                           del
                        </SuperButton>
                        <SuperButton onClick={() => dispatch(cardsActions.showUpdateModal(!showUpdateModal, card._id))}>
                           update
                        </SuperButton>
                     </>
                  )}
               </td>
            </tr>
         )
      },
   }

   return { modelCards }
}
