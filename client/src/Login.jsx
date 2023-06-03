import './style.css';
import React, { useState } from 'react';
import log from './img/log.svg';
import reg from './img/register.svg';
import { useStore } from './Store';
import Register from './Register';

const Login = () => {
	const [register, setRegister] = useState(false);
	const theme = useStore((state) => state.theme);
	const changeMode = () => {
		setRegister((prev) => !prev);
	};

	return (
		<div
			className={`before:absolute before:bg-gradient-to-r ${
				theme === 'light'
					? 'before:from-neutral before:to-neutral'
					: 'before:from-base-300 before:to-base-300'
			}  container1 bg-base-100 ${register ? 'sign-up-mode' : ''}`}>
			<div className='forms-container '>
				<div className='signin-signup bg-base-100'>
					{register ? (
						<div className='sign-up-form max-w-lg  md:max-w-xl'>
							<Register />
						</div>
					) : (
						<div className='sign-in-form'></div>
					)}
				</div>
			</div>

			<div className='panels-container'>
				<div className='panel left-panel'>
					<div
						className={`content
            'text-base-content'}`}>
						<h3 className='text-2xl font-bold mb-2'>Gonna Register?</h3>
						<p className='text-lg mb-4'>
							Oh Come on! Do it & let's fun together
						</p>
						<button
							onClick={changeMode}
							className={`btn btn-primary rounded-full`}
							id='sign-up-btn'>
							Register
						</button>
					</div>

					<img
						src={log}
						className='image'
					/>
				</div>
				<div className='panel right-panel'>
					<div
						className={`content
            ${
							theme == 'light' ? 'text-neutral-content' : 'text-base-content'
						}`}>
						<h3 className='text-2xl font-bold mb-2'>You already Registered?</h3>
						<p className='text-lg mb-4'>
							Then what are you still doing here...?
						</p>
						<button
							onClick={changeMode}
							className={`btn btn-primary rounded-full`}
							id='sign-up-btn'>
							Login
						</button>
					</div>

					<img
						src={reg}
						className='image'
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
