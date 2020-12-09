import React, { useState } from 'react'
import { SuperInputText } from './c1-SuperInputText/SuperInputText'
import { SuperButton } from './c2-SuperButton/SuperButton'
import { SuperCheckbox } from './c3-SuperCheckbox/SuperCheckbox'
import { FileInput } from '../../../s3-dev/d1-FileInput/FileInput'
import { SuperInputFiles } from '../../../s3-dev/d2-SuperFileInput/SuperInputFiles'
import { SuperMultiplePreview } from '../../../s3-dev/d3-SuperMultiplePreview/SuperMultiplePreview'

export const ComponentsTestRack = () => {
   return (
      <div>
         {/*<SuperInputText placeholder={'First Name'}/>*/}
         {/*<SuperInputText placeholder={'Last Name'}/>*/}
         {/*<SuperInputText placeholder={'Email'}/>*/}
         {/*<SuperInputText placeholder={'Password'}/>*/}
         {/*<SuperButton children={'Log in'}/>*/}
         {/*<SuperCheckbox children={'Remember Me'}/>*/}
         {/*<FileInput value={'aaaa'} />*/}
         {/*<hr />*/}
         {/*<SuperInputFiles />*/}
         <SuperMultiplePreview />
      </div>
   )
}
