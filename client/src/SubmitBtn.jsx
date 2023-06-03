import React from 'react';

const SubmitBtn = ({
	disable = false,
	isPending,
	width = 'w-full',
	outline = false,
	text = ['Click Here', 'Progress...'],
	dots = false,
	onSubmit = null,
	margin = '',
	onClick = false,
	disableF = false,
}) => {
	return disableF ? (
		disable
	) : !disable() ? (
		!isPending ? (
			<button
				onClick={onSubmit}
				type={`${onClick ? '' : 'submit'}`}
				className={`btn btn-primary ${margin} ${width} ${
					outline ? 'btn-outline' : ''
				}`}>
				{text[0]}
			</button>
		) : (
			<button
				disabled={true}
				className={`btn ${width} ${margin} ${
					outline
						? ' disabled:bg-opacity-10 disabled:border disabled:text-neutral disabled:border-neutral disabled:border-opacity-10'
						: 'disabled:bg-neutral disabled:text-neutral-content'
				} `}>
				{!dots ? <span className='loading loading-spinner'></span> : null}
				{text[1]}
				{dots ? <span className='loading loading-dots'></span> : null}
			</button>
		)
	) : (
		<button
			disabled={true}
			className={`btn ${width} ${margin} ${
				outline
					? ' disabled:bg-opacity-10 disabled:border disabled:text-neutral disabled:border-neutral disabled:border-opacity-10'
					: 'disabled:bg-neutral disabled:text-neutral-content'
			} `}>
			{text[0]}
		</button>
	);
};

export default SubmitBtn;
