import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { Profile } from './Profile'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'
import { actions } from '../../../f1-login/l2-bll/loginReducer'

export const ProfileContainer = () => {
   const name = useSelector<AppStateType, string | null>((state) => state.login.name)
   const email = useSelector<AppStateType, string | null>((state) => state.login.email)
   const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.login.isLoggedIn)

   const dispatch = useDispatch()

   const logout = () => {
      dispatch(actions.isLoggedInAC(false))
   }

   if (!isLoggedIn) {
      return <Redirect to={PATH.LOGIN} />
   }

   return <Profile name={name} email={email} logout={logout} />
}
