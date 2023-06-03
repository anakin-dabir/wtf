import React, { useEffect } from 'react';
import { useValidation } from './useValidation';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { useApi } from './useApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate();
	const { formData, handleChange, clearFormData, btnDisable } = useValidation([
		'name',
		'email',
	]);
	const { data, inLoading, fetchData } = useApi();
	const handleFunction = (e) => {
		e.preventDefault();
		console.log({ formData, login: false });
		fetchData('post', 'auth/register', { formData, login: false }, true);
		clearFormData();
	};
	useEffect(() => {
		if (data) {
			if (localStorage.getItem('countdown'))
				localStorage.removeItem('countdown');
			localStorage.setItem('otp_key', JSON.stringify(data.id));
			navigate(
				`/login/${data.email.replace(/^(.{2}).+@/, '$1*****@')}/${data.id}`
			);
		}
	}, [data]);
	return (
		<form>
			<FormInput
				name='name'
				onChange={handleChange}
				style={false}
				formData={formData}
				margin='mt-2'
			/>
			<FormInput
				name='email'
				style={false}
				margin='mt-2'
				onChange={handleChange}
				formData={formData}
			/>
			<SubmitBtn
				isPending={inLoading}
				onSubmit={handleFunction}
				disable={btnDisable}
				text={['Register', 'Registering...']}
				margin='mt-8'
			/>
		</form>
	);
};

export default Register;
