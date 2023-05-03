import { useState } from 'react'
import logo from '../images/menuBg.png';
import * as SlIcons from 'react-icons/sl';
import * as GiIcons from 'react-icons/gi';
import * as FiIcons from 'react-icons/fi';

const Header = ({ setContent, money, username }) => {
  const [active, setActive] = useState(1)

  const logout = async (e) => {
    e.preventDefault()
    try {
      // eslint-disable-next-line
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Forbidden");
      } else {
        alert("Something went wrong");
        console.log(error)
      }
    }
  };

  const handleClick = (n) => {
    setActive(n)
    switch (n) {
      case 1:
        setContent('mainOffer')
        break;
      case 2:
        setContent('tickets')
        break;
      case 3:
        setContent('compare')
        break;
      default:
        break;
    }
  }

  return (
    <div className="mainMenu">
      <div style={{ padding: '10px 0px', maxWidth: 267 }}>
        <img src={logo} className='mainMenuBg' alt='logo' onClick={() => window.location.reload()} />
      </div>
      <a className={(active === 1) ? 'activeItem menuTile' : 'menuTile'} style={{ marginLeft: 40 }} href="/#" onClick={() => handleClick(1)}>MAIN OFFER</a>
      <a className={(active === 2) ? 'activeItem menuTile' : 'menuTile'} href="/#" onClick={() => handleClick(2)}>TICKETS</a>
      <a className={(active === 3) ? 'activeItem menuTile' : 'menuTile'} href="/#" onClick={() => handleClick(3)}>COMPARE</a>
      <div className='marginRight'>
        <div className='menuMoney'>
          <GiIcons.GiMoneyStack size={24} style={{ marginRight: 6 }} />
          {money.toFixed(2)} €
        </div>
        <div className='menuUser'>
          <SlIcons.SlUser size={16} style={{ marginRight: 6 }} />
          {username.toUpperCase()}
        </div>
        <a className='menuLogout' onClick={logout} href="/#">
          <FiIcons.FiLogOut size={18} style={{ marginRight: 6 }} />
          LOGOUT
        </a>
      </div>
    </div>
  )
}

export default Header