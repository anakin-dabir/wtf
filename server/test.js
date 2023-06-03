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

function isInputValid(inputText) {
	const regexPattern = /^[a-zA-Z0-9!@'/"\\|*_-]+$/;

	return regexPattern.test(inputText);
}

// Example usage
const userInput1 = 'Hello123!@"/|*_-';
console.log(isInputValid(userInput1)); // Output: true

const userInput2 = 'Testing<>123';
console.log(isInputValid(userInput2)); // Output: false
