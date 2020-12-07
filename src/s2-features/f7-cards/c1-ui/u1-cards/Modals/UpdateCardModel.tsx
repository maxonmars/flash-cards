import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../../s1-main/m2-bll/store'
import { cardsActions, InitialCardsType, thunks } from '../../../c2-bll/cardsReducer'
import Modal from '../../../../../s1-main/m1-ui/u0-common/Atoms/Modals/Modal'
import { FormikErrors, useFormik } from 'formik'
import { SuperButton } from '../../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { SuperInputText } from '../../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { Error } from '../../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import s from './CardModal.module.scss'
import { ReactComponent as Loader } from '../../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'

type FormValues = {
   question: string
   comments: string
}
type AddCardModalType = {
   PackID: string
}

export const UpdateCardModal: React.FC<AddCardModalType> = ({ PackID }) => {
   const {
      updateModal: { showUpdateModal, question, comments, _id },
   } = useSelector<AppStateType, InitialCardsType>((state) => state.cards)
   const dispatch = useDispatch()

   const updateName = useFormik({
      initialValues: {
         question: question,
         comments: comments,
      },
      onSubmit: (values) => {
         const { question, comments } = values
         dispatch(thunks.updateCard({ _id, question, comments }, PackID))
      },
      validate: (values) => {
         const { question } = values
         const errors: FormikErrors<FormValues> = {}
         if (question.length < 1) {
            errors.question = 'Укажите название для пака'
         }
         return errors
      },
   })

   return (
      <>
         <Modal
            enableBackground={true}
            backgroundOnClick={() => {
               dispatch(cardsActions.showUpdateModal(!showUpdateModal, ''))
            }}
            width={400}
            height={400}
            // modalOnClick={() => setShow(false)}
            show={showUpdateModal}>
            <div className={s.modal__container}>
               <SuperButton
                  onClick={() => {
                     dispatch(cardsActions.showUpdateModal(!showUpdateModal, ''))
                  }}
                  className={s.close__btn}>
                  X
               </SuperButton>
               <h4>Укажите новое название</h4>
               <form onSubmit={updateName.handleSubmit}>
                  {updateName.isSubmitting ? (
                     <Loader />
                  ) : (
                     <>
                        <SuperInputText placeholder={'Update question'} {...updateName.getFieldProps('question')} />
                        {updateName.errors && <Error textError={updateName.errors.question} />}
                        <SuperInputText placeholder={'Your comments'} {...updateName.getFieldProps('comments')} />
                        <SuperButton disabled={!updateName.dirty && updateName.isSubmitting} type='submit'>
                           Update
                        </SuperButton>
                     </>
                  )}
               </form>
            </div>
         </Modal>
      </>
   )
}

export default UpdateCardModal
