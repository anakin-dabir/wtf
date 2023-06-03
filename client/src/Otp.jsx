import { useState, useEffect, useContext } from 'react';
import {
	useLocation,
	useNavigate,
	useParams,
	useHref,
	json,
} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import SubmitBtn from './SubmitBtn';

const Otp = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { id, email } = useParams();
	useEffect(() => {
		const _id = JSON.parse(localStorage.getItem('otp_key'));
		if (id !== _id) {
			navigate('*');
		}
	}, []);
	const [otp, setOTP] = useState({ otp: '', inValid: true });
	const [isLoading, setIsLoading] = useState({ otp: false, resend: false });

	const [time, setTime] = useState(
		parseInt(localStorage.getItem('countdown')) || 61
	);

	useEffect(() => {
		localStorage.setItem('countdown', time.toString());
		const timer = setTimeout(() => {
			if (time > 1) {
				setTime(time - 1);
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [time]);

	const handleOTPChange = (e) => {
		setOTP({ inValid: false, otp: e.target.value });
		if (e.target.value === '') {
			setOTP((prev) => {
				return { ...prev, inValid: true };
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// validate OTP
		setIsLoading((prev) => {
			return { ...prev, otp: true };
		});
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API}/auth/otpVerification`,
				{ id, otp: otp.otp },
				{ withCredentials: true }
			);
			const { body, msg } = response.data;
			toast.success(msg);
			setOTP({ otp: '', inValid: true });
			localStorage.clear();
			setProvider((prev) => ({
				...prev,
				login: true,
				currentUser: body,
			}));

			navigate(location.state?.from || '/', { replace: true });
		} catch (err) {
			toast.error(err.response.data.msg);
		}
		setIsLoading((prev) => {
			return { ...prev, otp: false };
		});
	};

	const resendOTP = async () => {
		setIsLoading((prev) => {
			return { ...prev, resend: true };
		});

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API}/auth/resendOTP`,
				{ id }
			);
			const { body, msg, email } = response.data;
			localStorage.setItem('otp_key', JSON.stringify(body));
			toast.success(msg);
			setIsLoading((prev) => {
				return { ...prev, resend: false };
			});
			navigate(`/login/${email}/${body}`);
			setTime(61);
			localStorage.setItem('countdown', '60');
		} catch (err) {
			toast.error(err.response.data.msg);
		}
	};

	return JSON.parse(localStorage.getItem('otp_key')) !== id ? null : (
		<div className='card h-screen justify-center items-center'>
			<div className='w-full max-w-md'>
				<div className='bg-primary bg-opacity-10  p-8 shadow-lg'>
					<h1 className='text-4xl text-base-content font-bold mb-5'>
						OTP Verification
					</h1>
					<p className='mb-6 text-lg text-base-content'>
						Please enter the OTP code sent to your email{' '}
						<span className='text-error'>
							{email.replace(/^(.{2}).+@/, '$1*****@')}
						</span>
					</p>

					<form
						className='p-0 w-full'
						onSubmit={handleSubmit}>
						<div className='form-control w-full mb-6'>
							<label className='label text-xl font-bold'>OTP Code</label>
							<input
								type='text'
								value={otp.otp}
								onChange={handleOTPChange}
								placeholder='Enter OTP'
								className={`input ${
									otp.inValid ? 'border-b-error' : 'border-b-primary'
								} peer/otp  w-full border-0  border-b-2 focus:outline-0`}
							/>
						</div>
						<button
							type='submit'
							disabled={otp.inValid}
							className={`btn disabled:bg-[#00000065] disabled:text-white btn-block mb-5 ${
								isLoading.otp ? 'loading' : 'btn-primary'
							}`}>
							{isLoading.otp ? 'Verifying...' : 'Verify'}
						</button>
					</form>
					<SubmitBtn
						text={[`Resend OTP ${time === 1 ? null : time}`]}
						disable={time > 1 ? true : false}
						disableF={true}
						onClick={true}
						onSubmit={resendOTP}
					/>

					{/* <button
						onClick={resendOTP}
						disabled={time > 1 ? true : false}
						className={`btn ${
							isLoading.resend && 'loading'
						} btn-block disabled:bg-gray-500 disabled:text-[black]`}>
						Resend OTP {time === 1 ? null : time}
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default Otp;
