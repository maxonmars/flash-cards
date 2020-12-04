import React from 'react'
import { SuperInputText } from './c1-SuperInputText/SuperInputText'
import { SuperButton } from './c2-SuperButton/SuperButton'
import { SuperCheckbox } from './c3-SuperCheckbox/SuperCheckbox'
import { GradesPage } from '../../../s3-devs/grades/g1-ui/GradesPage'

export const ComponentsTestRack = () => {
   return (
      <div>
         <SuperInputText placeholder={'First Name'} />
         <SuperInputText placeholder={'Last Name'} />
         <SuperInputText placeholder={'Email'} />
         <SuperInputText placeholder={'Password'} />
         <SuperButton children={'Log in'} />
         <SuperCheckbox children={'Remember Me'} />
         <GradesPage />
      </div>
   )
}
