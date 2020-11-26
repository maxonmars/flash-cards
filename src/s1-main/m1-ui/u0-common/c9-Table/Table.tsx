import React from 'react'
import './Table.scss'
import * as ReactBootStrap from 'react-bootstrap'

type PropsType<DataItem> = {
   data: DataItem[]
   model: {
      renderTitle: () => JSX.Element
      renderData: <T extends DataItem>(value: T, index: number) => JSX.Element
   }
}

export const Table = <T extends object>({ data, model }: PropsType<T>) => {
   return (
      <div>
         <ReactBootStrap.Table striped bordered hover variant='dark'>
            <thead>{model.renderTitle()}</thead>
            <tbody>{data.map(model.renderData)}</tbody>
         </ReactBootStrap.Table>
      </div>
   )
}
