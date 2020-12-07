import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormikErrors, useFormik } from 'formik'
import s from '../PacksContainer.module.scss'
import Modal from '../../../../../s1-main/m1-ui/u0-common/Atoms/Modals/Modal'
import { SuperInputText } from '../../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { Error } from '../../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import { AppStateType } from '../../../../../s1-main/m2-bll/store'
import { actions, InitialPacksStateType, thunks } from '../../../p2-bll/packsReducer'
import { ReactComponent as Loader } from '../../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'
type FormValues = {
   packName: string
}

export const AddPackModal = () => {
   const { showAddModal } = useSelector<AppStateType, InitialPacksStateType>((state) => state.packs)
   const dispatch = useDispatch()

   const setName = useFormik({
      initialValues: {
         packName: '',
      },
      onSubmit: (values) => {
         const { packName } = values
         dispatch(thunks.createPack(packName))
      },
      validate: (values) => {
         const { packName } = values
         const errors: FormikErrors<FormValues> = {}
         if (packName.length < 1) {
            errors.packName = 'Укажите название для пака'
         }
         return errors
      },
   })

   return (
      <>
         <Modal
            enableBackground={true}
            backgroundOnClick={() => {
               dispatch(actions.showAddModal(!showAddModal))
            }}
            width={400}
            height={300}
            // modalOnClick={() => setShow(false)}
            show={showAddModal}>
            <div className={s.modal__container}>
               <SuperButton
                  onClick={() => {
                     dispatch(actions.showAddModal(!showAddModal))
                  }}
                  className={s.close__btn}>
                  X
               </SuperButton>
               <h4>Укажите название карточной стопки</h4>
               <form onSubmit={setName.handleSubmit}>
                  {setName.isSubmitting ? (
                     <Loader />
                  ) : (
                     <>
                        <SuperInputText placeholder={'Set pack name'} {...setName.getFieldProps('packName')} />
                        {setName.errors && <Error textError={setName.errors.packName} />}
                        <SuperButton
                           disabled={!(setName.isValid && setName.dirty) || setName.isSubmitting}
                           type='submit'>
                           Add Pack
                        </SuperButton>
                     </>
                  )}
               </form>
            </div>
         </Modal>
      </>
   )
}

export default AddPackModal
