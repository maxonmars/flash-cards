import React, { CSSProperties } from 'react'

import { Range, getTrackBackground } from 'react-range'

export const FlexStyle: CSSProperties = { display: 'flex' }
export const FlexAlignCenter: CSSProperties = { ...FlexStyle, alignItems: 'center' }
export const FlexCenterCenter: CSSProperties = { ...FlexAlignCenter, justifyContent: 'center' }

type DoubleRangeType = {
   step: number
   startData: number
   endData: number
   rangeData: Array<number>
   rangeDataHandler: (value: Array<number>) => void
}

const DoubleRange: React.FC<DoubleRangeType> = ({ step, startData, endData, rangeData, rangeDataHandler }) => {
   return (
      <Range
         values={rangeData}
         step={step}
         min={startData}
         max={endData}
         onChange={(value) => {
            rangeDataHandler(value)
         }}
         renderTrack={({ props, children }) => (
            <div
               onMouseDown={props.onMouseDown}
               onTouchStart={props.onTouchStart}
               style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '50%',
                  margin: '30px',
               }}>
               <div
                  ref={props.ref}
                  style={{
                     height: '5px',
                     width: '100%',
                     borderRadius: '4px',
                     background: getTrackBackground({
                        values: rangeData,
                        colors: ['#ccc', '#548BF4', '#ccc'],
                        min: startData,
                        max: endData,
                     }),
                     alignSelf: 'center',
                  }}>
                  {children}
               </div>
            </div>
         )}
         renderThumb={({ index, props, isDragged }) => (
            <div
               {...props}
               style={{
                  ...props.style,
                  height: '12px',
                  width: '12px',
                  borderRadius: '1px',
                  backgroundColor: '#FFF',
                  ...FlexCenterCenter,
                  boxShadow: '0px 2px 6px #AAA',
               }}>
               <div
                  style={{
                     position: 'absolute',
                     top: '-28px',
                     color: '#fff',
                     fontWeight: 'bold',
                     fontSize: '14px',
                     fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                     padding: '4px',
                     borderRadius: '4px',
                     backgroundColor: '#548BF4',
                  }}>
                  {rangeData[index].toFixed(0)}
                  {/*// 10.12345 => 10; (1) => 10.1; (2) > 10.12; ...*/}
               </div>
               <div style={{ height: '16px', width: '5px', backgroundColor: isDragged ? '#548BF4' : '#CCC' }} />
            </div>
         )}
      />
   )
}

export default DoubleRange
