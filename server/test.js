const fields = ['file1', 'name'];
const initialFields = fields.reduce(
	(state, fieldName) => ({
		...state,
		[fieldName]: fieldName.includes('file') ? null : '',
		[`${fieldName}Error`]: false,
	}),
	{}
);

console.log(initialFields);
const allErrorsTrue = Object.keys(initialFields).every(
	(key) => key.endsWith('Error') && initialFields[key]
);
console.log(allErrorsTrue);

const validateForm = (name, value) => {
	switch (name) {
		case 'email':
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			const isValid = emailRegex.test(value);
			return isValid;
			break;
		default:
			// if (!value || value === '') {
			// } else {
			// }
			break;
	}
};

console.log(validateForm('email', 'anakingma@il.com'));
