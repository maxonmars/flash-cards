import React from 'react'
import { Table } from '../../../../s1-main/m1-ui/u0-common/c9-Table/Table'
import { ApiCardsType } from '../../c3-dal/cardsAPI'

type PropsType = {
   cards: ApiCardsType[]
   modelCards: {
      renderTitle: () => JSX.Element
      renderData: (table: ApiCardsType, index: number) => JSX.Element
   }
}

export const Cards: React.FC<PropsType> = ({ cards, modelCards }) => {
   return (
      <>
         <Table data={cards} model={modelCards} />
      </>
   )
}
