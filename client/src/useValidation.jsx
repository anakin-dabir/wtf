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
		const { name, value } = e.target;
		const error = validateForm(name, value);
		setformData((prev) => ({
			...prev,
			[name]: value,
			[`${name}Error`]: error,
			[`${name}Msg`]: error
				? `${name.charAt(0).toUpperCase() + name.slice(1)} is invalid`
				: '',
		}));
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
