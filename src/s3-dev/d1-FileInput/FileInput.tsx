import React, { useEffect, useRef } from 'react'

type PropsType = {
   value: any
}

export const FileInput: React.FC<PropsType> = ({ value, ...rest }) => {
   const inputRef = useRef<HTMLInputElement>(null)

   useEffect(() => {
      if (value === '') {
         let currentValue = inputRef.current && inputRef.current.value
         currentValue = ''
      } else {
         let currentFiles = inputRef.current && inputRef.current.files
         currentFiles = value
      }
   }, [value])

   return <input {...rest} type='file' ref={inputRef} />
}
