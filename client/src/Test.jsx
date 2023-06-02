import { useEffect, useState, useTransition } from 'react';
import { useApi } from './useApi';
import { Toaster, toast } from 'react-hot-toast';
import { useStore } from './Store';
import { useValidation } from './useValidation';

const Test = () => {
	const login = useStore((state) => state.login);
	const id = 1234;
	const { data, isLoading, inLoading, fetchData } = useApi();

	const { formData, handleChange, clearFormData, btnDisable } = useValidation([
		'name',
		'email',
	]);

	const [isPending, startT] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		startT(true);
		setTimeout(() => {
			console.log(formData);
			clearFormData();
			startT(false);
		}, 2000);
	};
	return inLoading ? (
		<div className='fixed p-3 top-1/2 left-1/2 text-4xl'>Loading...</div>
	) : (
		<>
			<pre>{JSON.stringify(data)}</pre>
			<div>{data?.name}</div>
			<button
				onClick={() => {
					fetchData('post', 'getF', { id: 1222 }, true);
				}}>
				Click Me
			</button>
			<br />

			<br />
			<br />

			<div className='text-2xl font-bold text-center mb-2'>Login/Register</div>
			<form
				className='flex flex-col relative left-1/2 -translate-x-1/2  space-y-2 max-w-xs'
				onSubmit={handleSubmit}>
				<input
					className='p-3.5 border border-slate-400'
					type='text'
					name='name'
					placeholder='Enter Name'
					value={formData.name}
					onChange={handleChange}
				/>
				<span className='text-red-600'>{formData?.nameMsg}</span>

				<input
					className='p-3.5 border border-slate-400'
					type='text'
					name='email'
					placeholder='Enter Email'
					value={formData.email}
					onChange={handleChange}
				/>
				<span className='text-red-600'>{formData.emailMsg}</span>

				{!isPending ? (
					<button
						// disabled={formData.emailError || formData.nameError}
						disabled={btnDisable()}
						className={`btn  btn-primary  disabled:text-black`}
						type='submit'>
						Login
					</button>
				) : (
					<button
						disabled={true}
						className='btn disabled:bg-base-300'>
						<span className='loading bg-white loading-spinner'></span>
						<span className='text-base-content'>Logging...</span>
					</button>
				)}
			</form>

			<br />
			<br />
			<div className='flex flex-col ml-5'>
				<span className='ml-5 loading loading-infinity loading-lg'></span>
				<br />
				<span className='loading rounded-lg  loading-bars loading-lg'></span>
				<br />
				<span className='loading loading-ring h-20 w-20'></span>
				<br />
				<span className='loading loading-dots loading-lg'></span>
				<br />
			</div>

			<div className='relative left-1/2 -translate-x-1/2 flex flex-col'>
				{/* <StripePayment /> */}
			</div>
			<br />
			<br />

			<div className='relative  left-1/2 -translate-x-1/2 mb-2'>
				<TestForm />
			</div>
		</>
	);
};

export default Test;

export const TestForm = (
	disabled = true,
	isPending = false,
	width = 'btn-wide'
) => {
	const [isLoading, setisLoading] = useState(false);

	const btnClickFunction = () => {};
	return (
		<>
			{!isPending ? (
				<button
					disabled={disabled}
					className={`btn btn-wide btn-primary disabled:text-base-content`}>
					Registration
				</button>
			) : (
				<button
					disabled={true}
					className='btn btn-wide disabled:bg-base-300'>
					<span className='loading bg-base-content loading-spinner'></span>
					<span className='text-base-content'>Logging...</span>
				</button>
			)}
		</>
	);
};

export const StripePayment = () => {
	const { data, inLoading, fetchData } = useApi();
	const checkoutItems = [
		{ _id: 1, name: 'Anakin', price: 999, quantity: 2 },
		{ _id: 2, name: 'MARIO', price: 999, quantity: 2 },
		{ _id: 3, name: 'Pizzakuran', price: 999, quantity: 2 },
	];

	const clickBtn = () => {
		fetchData('post', 'create-checkout-session', { checkoutItems });
	};

	return (
		<>
			<div className='text-3xl text-center font-bold text-base-content'>
				Stripe Payment
			</div>
			{checkoutItems.map((item) => {
				return (
					<div key={item._id}>
						<div className='text-xl font-bold text-base-content'>
							{item.name}
						</div>
						<div className='text-sm text-base-content'>$ {item.price}</div>
					</div>
				);
			})}
			<button
				onClick={clickBtn}
				className='btn btn-wide'>
				CheckOut
			</button>
		</>
	);
};
