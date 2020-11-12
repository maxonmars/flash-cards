import React from 'react'
import { NavLink } from 'react-router-dom'
import { PATH } from '../u3-routes/Routes'

export const Header = () => {
   return (
      <div>
         Header
         <NavLink to={PATH.LOGIN}>Login</NavLink>
         <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
         <NavLink to={PATH.PROFILE}>Profile</NavLink>
         <NavLink to={PATH.PASSWORD_RECOVERY}>Password recovery</NavLink>
         <NavLink to={PATH.NEW_PASSWORD_ENTRY}>New password entry</NavLink>
         <NavLink to={PATH.COMPONENT_TEST_RACK}>Component test rack</NavLink>
      </div>
   )
}
