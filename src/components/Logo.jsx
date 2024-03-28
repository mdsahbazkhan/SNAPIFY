import React from 'react'
import logoImage from './Logo.png';
function Logo({width = '100x'}) {
  return (
    <div>
    <img src={logoImage} alt="Logo" style={{ width }} />
  </div>
  )
}

export default Logo

