import React from 'react'
import Halogen from 'halogen'

import '../styles/Loading.css'

const Loading = () => (
  <div className='loading'>
    <Halogen.ScaleLoader color='grey' size='32px' />
  </div>
)

export default Loading
