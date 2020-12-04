import React, { useState } from 'react'
import Modal from './Modal'

const ModalContainer: React.FC = () => {
   const [show, setShow] = useState(false)

   console.log('render ModalContainer')
   return (
      <>
         <button onClick={() => setShow(true)}>show simple Modal</button>
         <Modal
            enableBackground={true}
            backgroundOnClick={() => setShow(false)}
            width={400}
            height={200}
            // modalOnClick={() => setShow(false)}

            show={show}>
            Simple Modal
            <button onClick={() => setShow(false)}>Close</button>
         </Modal>
      </>
   )
}

export default ModalContainer
