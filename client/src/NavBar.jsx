import { useState, useEffect, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
// import Logout from '../Login-Form/Logout';
// import MyAwesomeThemeComponent from '../ThemeToggle/toggle';

const NavBar = () => {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
	const [pathHide, setpathHide] = useState(false);
	const location = useLocation();
	const navRef = useRef(null);

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
		setPrevScrollPos(currentScrollPos);
	};
	const handleMouse = (e) => {
		const { clientX, clientY } = e;
		// const isMatchingPath = paths.some((path) => {
		// 	return location.pathname.startsWith(path);
		// });

		if (navRef.current && navRef.current.contains(e.target)) {
			setpathHide(false);
		} else {
			setpathHide(clientY > 10);
		}
	};

	useEffect(() => {
		if (location.pathname === '/login') {
			setpathHide(true);
		} else {
			setpathHide(false);
		}
	}, [location]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		if (location.pathname === '/login') {
			window.addEventListener('mousemove', handleMouse);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('mousemove', handleMouse);
		};
	}, [prevScrollPos, pathHide, visible]);

	return (
		<div
			ref={navRef}
			className={`fixed ${
				pathHide ? 'hidden' : ''
			} w-full text-base-content z-50  backdrop-blur-md bg-base-100 bg-opacity-10 transition duration-300 ease-in-out
			 shadow-md   ${visible ? 'top-0' : '-top-full'}`}>
			<div className='navbar px-3 container mx-auto lg:max-w-screen-xl'>
				<div className='text-2xl font-bold navbar-start'>DaisyUI</div>

				{/* <div className='navbar-center'>
					<MyAwesomeThemeComponent />
				</div> */}

				<div className='navbar-end'>
					<ul className='menu menu-horizontal gap-1 menu-lg rounded-box'>
						<li>
							<NavLink
								className={({ isActive }) => (isActive ? 'active' : '')}
								to={'/testt'}>
								Test1
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) => (isActive ? 'active' : '')}
								to={'/test'}>
								Test
							</NavLink>
						</li>
						{/* <div className='dropdown ml-3'>
							<label
								tabIndex={0}
								className='btn btn-ghost btn-circle avatar avatar-online'>
								<div className='w-12 bg-primary rounded-full avatar-online'>
									<img
										src={`http://localhost:9999/photos/${provider.currentUser.img}`}
									/>
								</div>
							</label>
							<ul
								tabIndex={0}
								className='menu dropdown-content mt-3 p-2 shadow-lg bg-primary-content text-base-content rounded-box w-52'>
								<li>
									<Link to={`/profile/${provider.currentUser._id}`}>
										Profile
									</Link>
								</li>
								<li>
									<Link to='/logout'>Logout</Link>
								</li>
							</ul>
						</div> */}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default NavBar;
