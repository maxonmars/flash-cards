import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../../s1-main/m2-bll/store'
import { actions, InitialPacksStateType, thunks } from '../../../p2-bll/packsReducer'
import Modal from '../../../../../s1-main/m1-ui/u0-common/Atoms/Modals/Modal'
import { SuperButton } from '../../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import s from '../PacksContainer.module.scss'

export const DeletePackModal = () => {
   const {
      deleteModal: { showDeleteModal, packID },
   } = useSelector<AppStateType, InitialPacksStateType>((state) => state.packs)
   const dispatch = useDispatch()

   return (
      <>
         <Modal
            enableBackground={true}
            backgroundOnClick={() => {
               dispatch(actions.showDeleteModal(!showDeleteModal, ''))
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
                        dispatch(actions.showDeleteModal(!showDeleteModal, ''))
                     }}>
                     Отмена
                  </SuperButton>
                  <SuperButton onClick={() => dispatch(thunks.deletePack(packID))}>Удалить пак</SuperButton>
               </div>
            </div>
         </Modal>
      </>
   )
}

export default DeletePackModal
