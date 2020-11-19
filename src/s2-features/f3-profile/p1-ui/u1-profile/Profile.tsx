import React from 'react'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'

type PropsType = {
   name: string
   email: string
   error: string
   logout: () => void
}

export const Profile = ({ name, email, logout, error }: PropsType) => {
   return (
      <div>
         <h2>Profile</h2>
         {error && <div style={{ color: 'red' }}>{error}</div>}
         <span>Name: {name}</span>
         <span>Email: {email}</span>
         <SuperButton onClick={logout}>Log out</SuperButton>
      </div>
   )
}
