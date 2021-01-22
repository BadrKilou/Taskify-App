import React, { useState } from 'react'
import './scss/ResponsiveNav.scss';
import { Link } from 'react-router-dom';
const ResponsiveNav = (props) => {
    const [active, setActive] = useState(false);

    const toggleNav = () => {
        setActive(!active)
    }
    return (
        <>
        <div className={active ? 'menu active' : 'menu'}>
  <button onClick={toggleNav} class="nav-tgl" type="button" aria-label="toggle menu">
    <span aria-hidden="true"></span>
  </button>
  <nav className='nav'>
    
    <ul className={active ? 'links active' : 'links'}>
      <li>
    <Link to='/register' onClick={() => setActive(false)}>{props.register}</Link>
      </li>
      <li>
    <Link to='/login' onClick={() => setActive(false)}>{props.login}</Link>
      </li>
      <li>
    <Link to='/about' onClick={() => setActive(false)}>{props.about}</Link>
      </li>
    </ul>

  </nav>
</div>
      </>
    )
}

export default ResponsiveNav
