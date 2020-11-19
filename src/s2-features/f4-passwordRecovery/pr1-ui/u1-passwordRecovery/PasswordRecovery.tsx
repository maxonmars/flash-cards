import React, { ChangeEvent } from 'react'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { ReactComponent as Loader } from '../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'

type PasswordRecoveryPageType = {
   pending: boolean
   result: string
   inputText: string
   inputHandler: (e: ChangeEvent<HTMLInputElement>) => void
   buttonClickHandler: () => void
}
export const PasswordRecovery: React.FC<PasswordRecoveryPageType> = ({
   pending,
   result,
   inputText,
   inputHandler,
   buttonClickHandler,
}) => {
   return (
      <div>
         <span>Восстановление пароля</span>
         <p>{result}</p>
         <div>
            {pending ? <Loader /> : <SuperInputText value={inputText} onChange={inputHandler} />}
            <SuperButton onClick={buttonClickHandler} disabled={pending} children={'Send'} />
         </div>
      </div>
   )
}
