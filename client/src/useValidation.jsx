import { useState } from 'react';

export const useValidation = (fields) => {
	const initialFields = fields.reduce(
		(state, fieldName) => ({
			...state,
			[fieldName]: fieldName.includes('file') ? null : '',
			[`${fieldName}Error`]: true,
			[`${fieldName}Msg`]: '',
		}),
		{}
	);

	const [formData, setformData] = useState(initialFields);

	const validateForm = (name, value) => {
		switch (name) {
			case 'email':
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				const isValid = emailRegex.test(value);
				return !isValid;

			default:
				if (!value || value === '') {
					return true;
				}
				return false;
		}
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		const error = validateForm(name, value);
		setformData((prev) => ({
			...prev,
			[name]: name.includes('file') ? files[0] : value,
			[`${name}Error`]: error,
			[`${name}Msg`]: error
				? name.includes('file')
					? 'No File Chosen'
					: `${name.charAt(0).toUpperCase() + name.slice(1)} is invalid`
				: '',
		}));
		console.log(formData);
	};

	const clearFormData = () => {
		setformData(initialFields);
	};

	const btnDisable = () => {
		return Object.entries(formData).some(
			([key, value]) => key.endsWith('Error') && value
		);
	};

	return { formData, handleChange, clearFormData, btnDisable };
};
