import React, { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState } from 'react'
import s from './SuperEditableSpan.module.scss'
import { SuperInputText } from '../c1-SuperInputText/SuperInputText'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperEditableSpanType = DefaultInputPropsType & {
   onChangeText?: (value: string) => void
   onEnter?: () => void
   error?: string
   spanClassName?: string
   affairs?: string

   spanProps?: DefaultSpanPropsType
}

export const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
   autoFocus,
   onBlur,
   onEnter,
   spanProps,

   ...restProps
}) => {
   const [editMode, setEditMode] = useState<boolean>(false)
   const { children, onDoubleClick, className, ...restSpanProps } = spanProps || {}

   const onEnterCallback = () => {
      setEditMode(false)

      onEnter && onEnter()
   }
   const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
      setEditMode(false)

      onBlur && onBlur(e)
   }
   const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setEditMode(true)

      onDoubleClick && onDoubleClick(e)
   }

   const spanClassName = `${s.EditableSpan} ${className}`

   return (
      <div className={s.spanContainer}>
         {editMode ? (
            <SuperInputText autoFocus onBlur={onBlurCallback} onEnter={onEnterCallback} {...restProps} />
         ) : (
            <div className={s.spanWrapper}>
               <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
                  {children || restProps.value}
               </span>
               <sup>{restProps.affairs}</sup>
            </div>
         )}
      </div>
   )
}
