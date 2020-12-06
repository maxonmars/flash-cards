import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../../s1-main/m2-bll/store'
import Modal from '../../../../../s1-main/m1-ui/u0-common/Atoms/Modals/Modal'
import { SuperButton } from '../../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import s from './CardModal.module.scss'
import { cardsActions, InitialCardsType, thunks } from '../../../c2-bll/cardsReducer'

type AddCardModalType = {
   PackID: string
}

export const DeleteCardModal: React.FC<AddCardModalType> = ({ PackID }) => {
   const {
      deleteModal: { showDeleteModal, cardID },
   } = useSelector<AppStateType, InitialCardsType>((state) => state.cards)
   const dispatch = useDispatch()

   return (
      <>
         <Modal
            enableBackground={true}
            backgroundOnClick={() => {
               dispatch(cardsActions.showDeleteModal(!showDeleteModal, ''))
            }}
            width={400}
            height={300}
            // modalOnClick={() => setShow(false)}
            show={showDeleteModal}>
            <div className={s.modal__container}>
               <h4>Вы уверены что хотите удалить стопку?</h4>
               <div className={s.button__container}>
                  <SuperButton
                     onClick={() => {
                        dispatch(cardsActions.showDeleteModal(!showDeleteModal, ''))
                     }}>
                     Отмена
                  </SuperButton>
                  <SuperButton onClick={() => dispatch(thunks.deleteCard(cardID, PackID))}>
                     Удалить карточку
                  </SuperButton>
               </div>
            </div>
         </Modal>
      </>
   )
}

export default DeleteCardModal
