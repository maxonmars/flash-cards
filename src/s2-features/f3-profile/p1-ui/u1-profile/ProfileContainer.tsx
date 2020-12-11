import React, { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { Profile } from './Profile'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'
import { thunks } from '../../../f1-login/l2-bll/loginReducer'
import { ReactComponent as Loader } from '../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'

export const ProfileContainer = () => {
   const name = useSelector<AppStateType, string>((state) => state.login.name)
   const email = useSelector<AppStateType, string>((state) => state.login.email)
   const isLoggedIn = useSelector<AppStateType, string>((state) => state.login.isLoggedIn)
   const error = useSelector<AppStateType, string>((state) => state.registration.error)
   const statePending = useSelector<AppStateType, boolean>((state) => state.login.pending)

   const dispatch = useDispatch()

   const [pending, setPending] = useState(false)

   useEffect(() => {
      if (!name) dispatch(thunks.meTC())
   }, [dispatch, name])

   const logout = async () => {
      setPending(true)
      await dispatch(thunks.logoutTC())
   }

   if (statePending) {
      return <Loader />
   }

   return (
      <>
         {isLoggedIn === 'notLogged' ? (
            <Redirect to={PATH.LOGIN} />
         ) : (
            <Profile name={name} email={email} logout={logout} error={error} pending={pending} />
         )}
      </>
   )
}
