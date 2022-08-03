import { useState, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override = {
  display: 'block',
  margin: '0 auto',
}

const Spinner = () => {
  const [color, setColor] = useState('#ffffff')

  useEffect(() => {
    setColor('#1e3a8a') // Necesita cambiar para que se vea bien
  }, [])

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={150}
      />
    </div>
  )
}

export default Spinner
