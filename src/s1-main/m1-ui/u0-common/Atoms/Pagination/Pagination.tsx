import React, { CSSProperties, ReactNode } from 'react'

interface IPaginationProps {
   page: number
   pageCount: number
   pageTotalCount: number
   getPage: (newPage: number, newPageCount: number) => void
   title?: ReactNode
   paginationStyle?: CSSProperties
   buttonStyle?: CSSProperties
   selectStyle?: CSSProperties
}

const Pagination: React.FC<IPaginationProps> = ({
   page,
   pageCount,
   pageTotalCount,
   getPage,
   title = 'Pagination',
   paginationStyle,
   buttonStyle,
   selectStyle,
}) => {
   let pages = []
   const lastPage = Math.ceil(pageTotalCount / pageCount)

   for (let i = 1; i <= lastPage; i++)
      pages.push(
         <button
            key={i}
            style={{ background: page === i ? 'lime' : undefined, ...buttonStyle }}
            onClick={() => getPage(i, pageCount)}>
            {i}
         </button>,
      )

   // 1 ... 4 5 (6) 7 8 ... 11
   if (page + 4 < lastPage) {
      pages[page + 2] = (
         <span key={page + 3} style={buttonStyle}>
            - ... -
         </span>
      )
      pages = pages.filter((p, i) => i < page + 3 || i === lastPage - 1)
   }
   if (page > 5) {
      pages[1] = (
         <span key={2} style={buttonStyle}>
            - ... -
         </span>
      )
      pages = pages.filter((p, i) => i < 2 || i > page - 4)
   }

   return (
      <div style={{ margin: '0 10px', minHeight: '50px', ...paginationStyle }}>
         {title}

         <select value={pageCount} onChange={(e) => getPage(page, Number(e.currentTarget.value))} style={selectStyle}>
            <option value={4}>4</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
         </select>
         {pages}
      </div>
   )
}

export default Pagination
