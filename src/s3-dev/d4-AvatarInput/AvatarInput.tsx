import React, { SetStateAction, useEffect, useState } from 'react'
import s from './avatar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { InitialStateType, thunks } from '../../s2-features/f1-login/l2-bll/loginReducer'
import { AppStateType } from '../../s1-main/m2-bll/store'
import { loginAPI } from '../../s2-features/f1-login/l3-dal/loginAPI'
import { SuperButton } from '../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { ReactComponent as Loader } from '../../../src/s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'

export const AvatarInput = () => {
   const [file, setFile] = useState<string>('')
   const { name, avatar, uploadAvatar } = useSelector<AppStateType, InitialStateType>((state) => state.login)

   const dispatch = useDispatch()

   const fileHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader()
      reader.onloadend = () => {
         dispatch(thunks.setPhotoTC(reader.result, name))
      }

      const newFile = e.target.files && e.target.files[0]
      if (newFile) {
         setFile(URL.createObjectURL(newFile))
         reader.readAsDataURL(newFile)
      }
   }
   const renderFiles = (file: string) => {
      return (
         <>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', height: '200px' }}>
               <div className={s.user_photoBlock} style={{ backgroundImage: `url(${file || avatar})` }}></div>
            </div>
         </>
      )
   }

   return (
      <>
         {uploadAvatar ? (
            <Loader />
         ) : (
            <>
               <div>
                  <input onChange={fileHandleChange} style={{ display: 'none' }} type={'file'} id={'file'} />
               </div>
               <label htmlFor={'file'}>{renderFiles(file)}</label>
            </>
         )}
      </>
   )
}
