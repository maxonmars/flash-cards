import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type SuperRadioPropsType = DefaultRadioPropsType & {
   options?: any[]
   onChangeOption?: (option: any) => void
}

export const SuperRadio: React.FC<SuperRadioPropsType> = ({
   type,
   name,
   options,
   value,
   onChange,
   onChangeOption,
   ...restProps
}) => {
   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      const item = e.currentTarget.value
      onChange && onChange(e)
      onChangeOption && onChangeOption(item)
   }

   const mappedOptions: any[] = options
      ? options.map((o, i) => (
           <label key={name + '-' + i}>
              <input type='radio' onChange={onChangeCallback} name={name} value={o} checked={value === o} />
              <span>{o}</span>
           </label>
        ))
      : []

   return <>{mappedOptions}</>
}
