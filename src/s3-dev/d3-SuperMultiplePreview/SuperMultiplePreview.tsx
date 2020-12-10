import React, { useState } from 'react'

type FileType = {
   id: string
   img: string
   name: string
   type: string
   size: number
   lastMod: number
}

export const SuperMultiplePreview = () => {
   const [selectedFiles, setSelectedFiles] = useState<Array<FileType>>([])

   const fileHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const fileArray = Array.from(e.target.files).map((file) => {
            const randomId = Math.floor(Math.random() * 100 + Math.random() * 100 + Math.random() * 100)
            return {
               id: `${randomId}`,
               img: URL.createObjectURL(file),
               name: file.name,
               size: file.size,
               lastMod: file.lastModified,
               type: file.type,
            }
         })
         setSelectedFiles((prevFiles) => {
            return prevFiles.concat(fileArray)
         })
      }
   }

   const renderFiles = (files: Array<FileType>) => {
      return files.map((file) => {
         return (
            <div style={{ border: '1px solid red', borderRadius: '4px', padding: '5px' }}>
               <img style={{ margin: '8px' }} height={'100px'} src={file.img} key={file.id} alt={'file img'} />
               <div>{file.name}</div>
               <div>{file.type}</div>
               <div>{file.size}</div>
               <div>{file.lastMod}</div>
               <button id={file.id} onClick={fileHandleDelete}>
                  X
               </button>
            </div>
         )
      })
   }
   const fileHandleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSelectedFiles(selectedFiles.filter((file) => file.id !== e.currentTarget.id))
   }

   return (
      <>
         <div>Multiple files preview</div>
         <div>
            <input onChange={fileHandleChange} multiple style={{ display: 'none' }} type={'file'} id={'file'} />
         </div>
         <div>
            <label
               htmlFor={'file'}
               style={{ padding: '4px', border: '1px solid white', cursor: 'pointer', borderRadius: '4px' }}>
               add file...
            </label>
         </div>
         <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderFiles(selectedFiles)}</div>
      </>
   )
}
