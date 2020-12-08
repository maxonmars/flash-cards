import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type PropsType = DefaultInputPropsType

interface FileType extends Blob {
   lastModified: number
   lastModifiedDate?: string
   name: string
   size: number
   type: string
}

export const SuperInputFiles: React.FC<PropsType> = ({ ...rest }) => {
   const [value, setStateValue] = useState<FileType[]>([])
   const [imgPrev, setImgPrev] = useState<string[]>([])

   useEffect(() => {
      // readers.push(String(reader.result))
      const readers: string[] = []
      for (let i = 0; i < value.length; i++) {
         const reader = new FileReader()
         value.length !== 0 && reader.readAsDataURL(value[i])
         reader.onloadend = () => {
            readers.push(String(reader.result))
            setImgPrev([...imgPrev, ...readers])
         }
      }
   }, [value])

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files

      let files
      if (fileList) {
         files = Array.from(fileList)
         setStateValue([...value, ...files])
      }
   }

   const onClickDeleteFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const id = e.currentTarget.id
      const filteredValue = value.filter((f) => f.name !== id)
      setStateValue(filteredValue)
   }
   return (
      <div>
         {Boolean(value.length) && (
            <div>
               Selected files:
               {value.map((f, index) => (
                  <div key={`${index}${f.lastModified}`}>
                     {`Имя файла: ${f.name}, размер: ${f.size}, тип: ${f.type}`}
                     <img src={imgPrev && imgPrev[index]} width={'100px'} height={'100px'} alt={'prev'} />
                     <button id={f.name} onClick={onClickDeleteFile}>
                        X
                     </button>
                  </div>
               ))}
            </div>
         )}
         <label>
            <div style={{ padding: '4px', border: '1px solid white', cursor: 'pointer', borderRadius: '4px' }}>
               Click to select some files...
            </div>
            <input {...rest} style={{ display: 'none' }} type='file' onChange={onChangeHandler} multiple />
         </label>
      </div>
   )
}
