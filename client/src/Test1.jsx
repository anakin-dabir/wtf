import React, { useState } from 'react';
import SubmitBtn from './SubmitBtn';
import { useValidation } from './useValidation';
import FormInput from './FormInput';
import Modal from './Modal';
import { useStore } from './Store';
import SideBar from './SideBar';
import toast from 'react-hot-toast';

const Test1 = () => {
	const socket = useStore((state) => state.socket);
	const [isPending, setIsPending] = useState(false);
	const { formData, handleChange, btnDisable, clearFormData } = useValidation([
		'file',
		'email',
	]);

	const [notification, setNotification] = useState('');

	const submitF = (e) => {
		e.preventDefault();
		setIsPending(true);
		setTimeout(() => {
			console.log('Submitted', formData);
			setIsPending(false);
			clearFormData();
			socket.emit('formData', formData);
			const formInput = new FormData();
			formInput.append('image', formData.file);
			formInput.append('email', formData.email);
			console.log(formInput);
			socket.on('res:formData', (formData) => {
				setNotification(`This is the new message from ${formData._id}`);
			});
			toast.success('New Notification is here');

			window.modal_1.close();
		}, 2000);
	};

	return (
		<>
			<br />
			<br />
			<button
				className='btn mt-36  btn-wide btn-outline btn-primary'
				onClick={() => window.modal_1.showModal()}>
				__Login
			</button>

			<Modal
				id='modal_1'
				encType={true}
				submitF={submitF}>
				<FormInput
					onChange={handleChange}
					name={'file'}
					formData={formData}
					type='file'
					error={false}
					margin='mt-4'
				/>
				<FormInput
					onChange={handleChange}
					name={'email'}
					formData={formData}
					margin='mt-4'
					error={false}
				/>
				<SubmitBtn
					disable={btnDisable}
					margin='mt-10'
					isPending={isPending}
					onSubmit={submitF}
				/>
			</Modal>
			<br />
			<br />
			<SideBar
				data={notification}
				setData={setNotification}
			/>
			<br />
			<br />
		</>
	);
};

export default Test1;
