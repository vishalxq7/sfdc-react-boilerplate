import React, { useState } from 'react';
import './Header.css';
import { Link, NavLink, useLocation } from 'react-router';
import { useOktaAuth } from '@okta/okta-react';

export const Header = () => {
	const { oktaAuth } = useOktaAuth();

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const location = useLocation();

	const handleDropdownToggle = () => setDropdownOpen((open) => !open);
	const handleDropdownClose = () => setDropdownOpen(false);

	const handleLogout = () => {
		oktaAuth.signOut();
	};

	const isUserIconActive = dropdownOpen || location.pathname === '/dashboard';

	return (
		<header>
			<nav className="navbar navbar-dark bg-primary px-3 mb-5">
				<a
					className="navbar-brand"
					href="#"
					style={{ fontWeight: 600, fontSize: 22 }}
				>
					MyApp
				</a>
				<ul
					className="navbar-nav flex-row align-items-center"
					style={{ gap: 24 }}
				>
					<li className="nav-item">
						<NavLink className="nav-link" to={`/`}>
							Home
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to={`/contact`}>
							Contact
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to={`/dashboard`}>
							Dashboard
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to={`/cart`}>
							Cart
						</NavLink>
					</li>
				</ul>
				<ul
					className="navbar-nav ms-auto flex-row align-items-center"
					style={{ gap: 24 }}
				>
					<li className="nav-item dropdown" style={{ position: 'relative' }}>
						<button
							className={`nav-link dropdown-toggle d-flex align-items-center btn btn-link ${
								isUserIconActive ? 'active' : ''
							}`}
							id="profileDropdown"
							type="button"
							aria-expanded={dropdownOpen}
							onClick={handleDropdownToggle}
							style={{ boxShadow: 'none', padding: 0, marginLeft: 8 }}
						>
							<i className="bi bi-person-fill fs-4"></i>
						</button>
						{dropdownOpen && (
							<ul
								className="dropdown-menu dropdown-menu-end show"
								aria-labelledby="profileDropdown"
								style={{ position: 'absolute', right: 0, top: '100%' }}
								onMouseLeave={handleDropdownClose}
							>
								<li>
									<NavLink
										className="dropdown-item"
										to="/profile"
										onClick={handleDropdownClose}
									>
										Profile
									</NavLink>
								</li>
								<li>
									<button
										className="dropdown-item"
										type="button"
										onClick={handleLogout}
									>
										Logout
									</button>
								</li>
							</ul>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};
