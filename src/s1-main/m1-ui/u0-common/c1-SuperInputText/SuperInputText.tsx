import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from 'react'
import s from './SuperInputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
   onChangeText?: (value: string) => void
   onEnter?: () => void
   error?: string
   spanClassName?: string
   placeholder?: string
}

export const SuperInputText: React.FC<SuperInputTextPropsType> = ({
   type,
   onChange,
   onChangeText,
   onKeyPress,
   onEnter,
   error,
   className,
   spanClassName,
   placeholder,

   ...restProps
}) => {
   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)

      onChangeText && onChangeText(e.currentTarget.value)
   }
   const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyPress && onKeyPress(e)

      e.key === 'Enter' && onEnter && onEnter()
   }

   const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
   const finalInputClassName = error ? `${s.formFieldError}` : `${s.formField}`

   return (
      <div className={s.formGroup}>
         <input
            id='lineInput'
            placeholder={placeholder}
            type={'text'}
            onChange={onChangeCallback}
            onKeyPress={onKeyPressCallback}
            className={finalInputClassName}
            {...restProps}
         />
         {/*<label className={s.formLabel} htmlFor="lineInput">{placeholder}</label>*/}
         {/*{error && <span className={finalSpanClassName}>{error}</span>}*/}
      </div>
   )
}
