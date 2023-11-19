import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from "./NavbarElements";

import { useState, useEffect } from 'react';

function Navbar() {
	const [isAdmin, setIsAdmin] = useState('false');

	useEffect(() => {
    setIsAdmin(localStorage.getItem('authenticated'));
  }, []);

	const logOut = () => {
		localStorage.setItem('authenticated', 'false');
		
		setIsAdmin('false');
	}

	return (	
		<>
			<Nav>
				<Bars />

				<NavMenu>
					<NavLink to="/" >
						Home
					</NavLink>
					<NavLink to="/detect" activeStyle>
						Detect
					</NavLink>
					<NavLink to="/contribute" activeStyle>
						Contribute
					</NavLink>
          {
            isAdmin === 'true' &&

            <NavLink to="/admin" activeStyle>
						  Admin
					  </NavLink>
          }
				</NavMenu>
				<NavBtn>
					{
						isAdmin === 'false' ?
						<NavBtnLink to="/sign-in">
							Sign In
						</NavBtnLink>
						:
						<NavBtnLink to="/" onClick={logOut}>
							Sign Out
						</NavBtnLink>
					}
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
