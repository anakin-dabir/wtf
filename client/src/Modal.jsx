const Modal = ({
	id,
	children,
	width = 'max-w-sm',
	style = 'modal-middle',
}) => {
	return (
		<dialog
			id={id}
			className={`modal ${style}`}>
			<form
				method='dialog'
				className={`modal-box ${width}`}>
				<button
					htmlFor={id}
					className='btn btn-sm btn-circle btn-ghost absolute right-4 top-4'>
					✕
				</button>
				<div className={`mt-5 p-4 ${width} `}>{children}</div>
			</form>
			<form
				method='dialog'
				className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
};

export default Modal;
