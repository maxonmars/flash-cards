import React from 'react'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { NavLink } from 'react-router-dom'
import { ApiPacksType } from '../../p3-dal/packsAPI'

export const usePacks = () => {
   const modelPacks = {
      renderTitle: () => {
         const headerNames = ['Name', 'CardsCount', 'update', 'url']

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
      renderData: (table: ApiPacksType, index: number) => {
         return (
            <tr key={index}>
               <td>{table.name}</td>
               <td>{table.cardsCount}</td>
               <td>{table.updated.slice(5, 16)}</td>
               <td>{table.deckCover}</td>
               <td>
                  <SuperButton>del</SuperButton>
                  <SuperButton>update</SuperButton>
                  <NavLink to={`/cards/${table._id}`}>cards</NavLink>
               </td>
            </tr>
         )
      },
   }

   return { modelPacks }
}
