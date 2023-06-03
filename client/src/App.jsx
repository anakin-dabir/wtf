import React, { Suspense } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	NavLink,
	Link,
	Outlet,
	useLocation,
	Navigate,
} from 'react-router-dom';
import Test from './Test';
import NavBar from './NavBar';
import { Toaster } from 'react-hot-toast';
import { useStore } from './Store';
const Test1 = React.lazy(() => import('./Test1'));
import Socket from './Socket';
import Login from './Login';
import Otp from './Otp';

const LocationProtectedRoute = () => {
	const isLogin = useStore((state) => state.login);
	const location = useLocation();
	return isLogin ? (
		<Outlet />
	) : (
		<Navigate
			to='/login'
			replace
			state={{ from: location }}
		/>
	);
};

const ProtectedRoute = () => {
	const isLogin = useStore((state) => state.login);
	return isLogin ? (
		<Outlet />
	) : (
		<Navigate
			to='/login'
			replace
		/>
	);
};

const LoginProtectedRoute = () => {
	const isLogin = useStore((state) => state.login);
	return !isLogin ? <Outlet /> : <Navigate to='/' />;
};

const App = () => {
	const setLogin = useStore((state) => state.setLogin);
	return (
		<>
			<BrowserRouter>
				<Toaster
					position='top-right'
					toastOptions={{
						duration: 2000,
						className: 'shadow-lg lg:mr-10 p-3.5 text-lg',
					}}
				/>
				<NavBar />
				<Socket />
				<Routes>
					<Route
						path='/'
						element={<div>Home</div>}
					/>
					<Route element={<ProtectedRoute />}>
						<Route
							path='/test'
							element={<Test />}
						/>
						<Route
							path='/testt'
							element={
								<Suspense fallback={'Loading...'}>
									<Test1 />
								</Suspense>
							}
						/>
					</Route>
					<Route element={<LoginProtectedRoute />}>
						<Route
							path='/login'
							element={<Login />}
						/>
						<Route
							path='/login/:email/:id'
							element={<Otp />}
						/>
					</Route>
					<Route
						path='*'
						element={<div>404 Error...</div>}
					/>
				</Routes>
				<button
					className='mt-14 btn btn-primary btn-wide'
					onClick={setLogin}>
					Login ??
				</button>
			</BrowserRouter>
		</>
	);
};

export default App;
