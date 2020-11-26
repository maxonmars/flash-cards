import React from 'react'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { ApiCardsType } from '../../c3-dal/cardsAPI'

export const useCards = () => {
   const modelCards = {
      renderTitle: () => {
         const headerNames = ['question', 'answer', 'Grade', 'updated', 'Covers']

         return (
            <tr>
               {headerNames.map((header, index) => (
                  <th key={index}>{header}</th>
               ))}
               <th>
                  <SuperButton>ADD</SuperButton>
               </th>
            </tr>
         )
      },
      renderData: (table: ApiCardsType, index: number) => {
         return (
            <tr key={index}>
               <td>{table.question}</td>
               <td>{table.answer}</td>
               <td>{table.grade}</td>
               <td>{table.updated.slice(5, 16)}</td>
               <td>{table.questionImg}</td>
               <td>
                  <SuperButton>del</SuperButton>
                  <SuperButton>update</SuperButton>
               </td>
            </tr>
         )
      },
   }

   return { modelCards }
}
