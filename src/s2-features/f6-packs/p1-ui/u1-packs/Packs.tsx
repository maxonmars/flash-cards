import React from 'react'
import { Table } from '../../../../s1-main/m1-ui/u0-common/c9-Table/Table'
import { ApiPacksType } from '../../p3-dal/packsAPI'

type PropsType = {
   packs: ApiPacksType[]
   modelPacks: {
      renderTitle: () => JSX.Element
      renderData: (table: ApiPacksType, index: number) => JSX.Element
   }
}

export const Packs: React.FC<PropsType> = ({ packs, modelPacks }) => {
   return (
      <>
         <Table data={packs} model={modelPacks} />
      </>
   )
}
