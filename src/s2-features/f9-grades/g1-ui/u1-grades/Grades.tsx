import React from 'react'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'

type PropsType = {
   handlerAddGrade: (grade: number) => void
}

export const Grades: React.FC<PropsType> = ({ handlerAddGrade }) => {
   return (
      <>
         <SuperButton onClick={() => handlerAddGrade(1)} children={'думал не думал'} />
         <SuperButton onClick={() => handlerAddGrade(2)} children={'заплужил'} />
         <SuperButton onClick={() => handlerAddGrade(3)} children={'долго думал'} />
         <SuperButton onClick={() => handlerAddGrade(4)} children={'долго не думал'} />
         <SuperButton onClick={() => handlerAddGrade(5)} children={'не долго думал'} />
      </>
   )
}
