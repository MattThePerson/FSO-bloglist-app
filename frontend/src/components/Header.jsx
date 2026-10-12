import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const NavigationBar = styled.div`
  background: #57c;
  width: 90vw;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px 2rem;
  border-radius: 4px;
`

const LogoLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: bold;
  font-family: sans-serif;
  color: #eee;
  text-decoration: none;
`

const NavLinks = styled.div`
  display: flex;
  gap: 0.3rem;
`

const navItem = css`
  background: none;
  color: #fff;
  border: none;
  outline: none;
  font-size: 1rem;
  underline: none;
  font-family: sans-serif;
  font-weight: semibold;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  padding: 3px 6px;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: #ddd;
  }
`

const NavLink = styled(Link)`
  ${navItem}
`

const NavButton = styled.button`
  ${navItem}
`

/* Header */
const Header = ({ user, handleLogout }) => {

  const logInOutButton = user
    ? <NavButton onClick={handleLogout}>LOGOUT</NavButton>
    : <NavLink className="nav-link" to="/login">LOGIN</NavLink>

  return (
    <NavigationBar>
      <LogoLink className="nav-link" to="/">Blog App</LogoLink>
      <NavLinks>
        <NavLink className="nav-link" to="/">BLOGS</NavLink>
        <NavLink className="nav-link" to="/create">NEW BLOG</NavLink>
        {logInOutButton}
      </NavLinks>
    </NavigationBar>
  )
}

export default Header

