import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { usePacks } from './usePacks'
import { Packs } from './Packs'
import { thunks as loginThunk } from '../../../f1-login/l2-bll/loginReducer'
import { actions, InitialPacksStateType, thunks } from '../../p2-bll/packsReducer'
import SearchDataContainer from '../../../../s1-main/m1-ui/u0-common/Atoms/SearchData/SearchDataContainer'
import Pagination from '../../../../s1-main/m1-ui/u0-common/Atoms/Pagination/Pagination'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'
import Modal from '../../../../s1-main/m1-ui/u0-common/Atoms/Modal/Modal'
import { FormikErrors, useFormik } from 'formik'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { Error } from '../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import s from './PacksContainer.module.scss'

type FormValues = {
   packName: string
}

export const PacksContainer = () => {
   const name = useSelector<AppStateType, string>((state) => state.login.name)
   const isLoggedIn = useSelector<AppStateType, string>((state) => state.login.isLoggedIn)
   const {
      packs,
      settings: { page, pageCount, packTotalCount },
      showAddModal,
      deleteModal: { showDeleteModal, packID },
      updateModal: { showUpdateModal },
   } = useSelector<AppStateType, InitialPacksStateType>((state) => state.packs)
   const { modelPacks } = usePacks()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(thunks.fetchPacks())
      if (!name) dispatch(loginThunk.meTC())
   }, [dispatch, name])

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

   const updateName = useFormik({
      initialValues: {
         packName: '',
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

   const getPage = (newPage: number, newPageCount: number) => {
      dispatch(thunks.fetchPacks(newPage, newPageCount))
   }

   const handlerDispatch = () => {
      dispatch(thunks.fetchPacks())
   }

   if (isLoggedIn === 'notLogged') {
      return <Redirect to={PATH.LOGIN} />
   }

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
                  <SuperInputText placeholder={'Set pack name'} {...setName.getFieldProps('packName')} />
                  {setName.errors && <Error textError={setName.errors.packName} />}
                  <SuperButton disabled={!(setName.isValid && setName.dirty) || setName.isSubmitting} type='submit'>
                     Add Pack
                  </SuperButton>
               </form>
            </div>
         </Modal>
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
                  <SuperInputText placeholder={'Set pack name'} {...updateName.getFieldProps('packName')} />
                  {updateName.errors && <Error textError={updateName.errors.packName} />}
                  <SuperButton
                     disabled={!(updateName.isValid && updateName.dirty) || updateName.isSubmitting}
                     type='submit'>
                     Update
                  </SuperButton>
               </form>
            </div>
         </Modal>

         <SearchDataContainer
            fetchData={handlerDispatch}
            startRange={0}
            endRange={10}
            searchValue={actions.searchPacks}
            rangeValue={actions.setMinMaxPack}
            getMyData={actions.getMyPack}
         />

         <Packs packs={packs} modelPacks={modelPacks} />
         <Pagination page={page} pageCount={pageCount} pageTotalCount={packTotalCount} getPage={getPage} />
      </>
   )
}
