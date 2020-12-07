import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../../s1-main/m2-bll/store'
import { actions, InitialPacksStateType, thunks } from '../../../p2-bll/packsReducer'
import Modal from '../../../../../s1-main/m1-ui/u0-common/Atoms/Modals/Modal'
import { FormikErrors, useFormik } from 'formik'
import { SuperButton } from '../../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { SuperInputText } from '../../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { Error } from '../../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import s from '../PacksContainer.module.scss'
import { ReactComponent as Loader } from '../../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'

type FormValues = {
   packName: string
}

export const UpdatePackModal = () => {
   const {
      deleteModal: { packID },
      updateModal: { showUpdateModal, packName },
   } = useSelector<AppStateType, InitialPacksStateType>((state) => state.packs)
   const dispatch = useDispatch()

   const updateName = useFormik({
      initialValues: {
         packName: packName,
      },
      onSubmit: (values) => {
         const { packName } = values
         dispatch(thunks.updatePack({ name: packName, _id: packID }))
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
               dispatch(actions.showUpdateModal(!showUpdateModal, ''))
            }}
            width={400}
            height={300}
            // modalOnClick={() => setShow(false)}
            show={showUpdateModal}>
            <div className={s.modal__container}>
               <SuperButton
                  onClick={() => {
                     dispatch(actions.showUpdateModal(!showUpdateModal, ''))
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
                        <SuperInputText placeholder={'Set pack name'} {...updateName.getFieldProps('packName')} />
                        {updateName.errors && <Error textError={updateName.errors.packName} />}
                        <SuperButton
                           disabled={!(updateName.isValid && updateName.dirty) || updateName.isSubmitting}
                           type='submit'>
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

export default UpdatePackModal
