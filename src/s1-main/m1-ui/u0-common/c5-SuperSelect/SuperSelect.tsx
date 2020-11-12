import React, { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
   options?: Array<string>
   onChangeOption?: (option: any) => void
   value?: string
}

export const SuperSelect: React.FC<SuperSelectPropsType> = ({
   options,
   onChange,
   onChangeOption,
   value,
   ...restProps
}) => {
   const mappedOptions: any[] = options
      ? options.map((o, index) => (
           <option key={index} value={o} selected={o === value}>
              {o}
           </option>
        ))
      : []

   const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
      const item = e.currentTarget.value
      onChange && onChange(e)
      onChangeOption && onChangeOption(item)
   }

   return (
      <div>
         <select onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
         </select>
      </div>
   )
}
