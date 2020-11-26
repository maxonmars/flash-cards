import React from 'react'
import { NavLink } from 'react-router-dom'
import { PATH } from '../u3-routes/Routes'

export const Header = () => {
   return (
      <div>
         Header
         <NavLink to={PATH.LOGIN}>Login_/</NavLink>
         <NavLink to={PATH.REGISTRATION}>Registration_/</NavLink>
         <NavLink to={PATH.PROFILE}>Profile_/</NavLink>
         <NavLink to={PATH.PASSWORD_RECOVERY}>Password recovery_/</NavLink>
         <NavLink to={PATH.NEW_PASSWORD_ENTRY}>New password entry_/</NavLink>
         <NavLink to={PATH.CARDS}>Cards_/</NavLink>
         <NavLink to={PATH.COMPONENT_TEST_RACK}>Component test rack_/</NavLink>
      </div>
   )
}
