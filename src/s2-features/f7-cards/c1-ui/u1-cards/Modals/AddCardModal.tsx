import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormikErrors, useFormik } from 'formik'
import s from './CardModal.module.scss'
import Modal from '../../../../../s1-main/m1-ui/u0-common/Atoms/Modals/Modal'
import { SuperInputText } from '../../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { Error } from '../../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import { AppStateType } from '../../../../../s1-main/m2-bll/store'
import { cardsActions, InitialCardsType, thunks } from '../../../c2-bll/cardsReducer'
import { ReactComponent as Loader } from '../../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'

type AddCardModalType = {
   PackID: string
}

type FormValues = {
   question: string
   answer: string
}

export const AddCardModal: React.FC<AddCardModalType> = ({ PackID }) => {
   const { showCardsModal } = useSelector<AppStateType, InitialCardsType>((state) => state.cards)
   const dispatch = useDispatch()
   const setName = useFormik({
      initialValues: {
         question: '',
         answer: '',
      },
      onSubmit: (values) => {
         const { question, answer } = values
         dispatch(thunks.createCard(question, answer, PackID))
      },
      validate: (values) => {
         const { question, answer } = values
         const errors: FormikErrors<FormValues> = {}
         if (question.length < 1) {
            errors.question = 'Укажите вопрос'
         }
         if (answer.length < 1) {
            errors.answer = 'Укажите ответ'
         }
         return errors
      },
   })

   return (
      <>
         <Modal
            enableBackground={true}
            backgroundOnClick={() => {
               dispatch(cardsActions.showCardsModal(!showCardsModal))
            }}
            width={400}
            height={400}
            // modalOnClick={() => setShow(false)}
            show={showCardsModal}>
            <div className={s.modal__container}>
               <SuperButton
                  onClick={() => {
                     dispatch(cardsActions.showCardsModal(!showCardsModal))
                  }}
                  className={s.close__btn}>
                  X
               </SuperButton>
               <h4>Укажите параметры карты</h4>
               <form onSubmit={setName.handleSubmit}>
                  {setName.isSubmitting ? (
                     <Loader />
                  ) : (
                     <>
                        <SuperInputText placeholder={'Укажите вопрос'} {...setName.getFieldProps('question')} />
                        {setName.errors && <Error textError={setName.errors.question} />}
                        <SuperInputText placeholder={'Укажите ответ'} {...setName.getFieldProps('answer')} />
                        {setName.errors && <Error textError={setName.errors.answer} />}
                        <SuperButton
                           disabled={!(setName.isValid && setName.dirty) || setName.isSubmitting}
                           type='submit'>
                           Add Card
                        </SuperButton>
                     </>
                  )}
               </form>
            </div>
         </Modal>
      </>
   )
}

export default AddCardModal
