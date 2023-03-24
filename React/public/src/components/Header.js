import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
//  navlink it is not workin and it show previous active link, so exact is used to reduce it
function Header() {
  return (
    <div className='Header'>
      <div className='title'><p>Crop and Fertilizer Recommendation</p></div>
      <div className='recomm'>
        <div className='a'>
        <NavLink to='/' exact activeClassName='active'>
          <h5 className='hom'>Home</h5>
        </NavLink>
        </div>
        <div className='a'>
        <NavLink to='/Crop Recommendation'  activeClassName='active'>
          <h5 className='crop'>Crop </h5>
        </NavLink>
        </div>
        <div className='a'>
        <NavLink to='/Fertilizer Recommendation' activeClassName='active' >
          <h5 className='fertilizer'>Fertilizer </h5>
      </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Header