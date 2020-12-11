import React, { ChangeEvent, RefObject } from 'react'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { Error } from '../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import { ReactComponent as Loader } from './../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'
import s from './profile.module.scss'
import { AvatarInput } from '../../../../s3-dev/d4-AvatarInput/AvatarInput'

type PropsType = {
   name: string
   email: string
   error: string
   pending: boolean
   logout: () => void
}

export const Profile: React.FC<PropsType> = ({ name, email, logout, error, pending }) => {
   return (
      <div>
         {pending ? (
            <Loader />
         ) : (
            <>
               <h2>Profile</h2>
               {error && <Error textError={error} />}
               <AvatarInput />
               <div>
                  <span style={{ marginRight: '20px' }}>Name: {name}</span>
                  <span style={{ marginRight: '20px' }}>Email: {email}</span>
               </div>
            </>
         )}
         <SuperButton onClick={logout} children={'Log out'} disabled={pending} />
      </div>
   )
}
