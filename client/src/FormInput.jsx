import React, { useState } from 'react';

const FormInput = ({
	width = 'w-full',
	height = 'h-24',
	style = false,
	name = 'name',
	type = 'text',
	onChange,
	error = true,
	margin = '',
	resize = true,
	formData,
}) => {
	const [show, setShow] = useState(false);
	let label = name.charAt(0).toUpperCase() + name.slice(1);
	let value = formData[`${name}`];
	let errorMsg = formData[`${name}Msg`];
	return (
		<>
			<div
				className={`form-control relative  text-base-content ${width} ${margin}`}>
				{type !== 'password' ? (
					<>
						<label className='label'>{label}</label>
						{type !== 'textarea' ? (
							type !== 'file' ? (
								<input
									type={type}
									onChange={onChange}
									value={value}
									placeholder={`Enter ${label}`}
									name={name}
									className={`input focus:outline-none w-full
                    ${
											style
												? 'border-0 border-b-2 border-b-primary'
												: 'border-opacity-70  focus:border-opacity-100 focus:border-primary'
										} 

                    ${
											errorMsg === ''
												? ''
												: 'border-b-error focus:border-error border-error'
										}
                    `}
								/>
							) : (
								<input
									type='file'
									onChange={onChange}
									name={name}
									className={`file-input file-input-bordered w-full
                    

                    ${
											errorMsg === ''
												? ''
												: 'border-b-error focus:border-error border-error'
										}
                    `}
								/>
							)
						) : (
							<textarea
								onChange={onChange}
								value={value}
								placeholder={`Enter ${label}`}
								name={name}
								className={`${
									resize ? 'resize-y' : 'resize-none'
								} textarea focus:outline-none w-full ${height}
                        ${
													style
														? 'border-0 border-b-2 border-b-primary'
														: 'border-opacity-40  focus:border-opacity-100 focus:border-primary'
												} 

                ${
									errorMsg === ''
										? ''
										: 'border-b-error focus:border-error border-error'
								}
                `}></textarea>
						)}
					</>
				) : (
					<>
						<label className='label'>
							{label}
							{show ? (
								<span
									onClick={() => setShow((prev) => !prev)}
									className='right-0 text-sm cursor-pointer'>
									Hide
								</span>
							) : (
								<span
									onClick={() => setShow((prev) => !prev)}
									className='right-0 text-sm cursor-pointer'>
									Show
								</span>
							)}
						</label>
						<input
							type={show ? 'text' : 'password'}
							onChange={onChange}
							value={value}
							placeholder={`Enter ${label}`}
							name={name}
							className={`input focus:outline-none w-full
                ${
									style
										? 'border-0 border-b-2 border-b-primary'
										: 'border-opacity-40  focus:border-opacity-100 focus:border-primary'
								} 

                ${
									errorMsg === ''
										? ''
										: 'border-b-error focus:border-error border-error'
								}
                `}
						/>
					</>
				)}

				{!error ? (
					errorMsg === '' ? null : (
						<label className='label text-error'>{errorMsg}</label>
					)
				) : errorMsg === '' ? null : (
					<div className='right-2 top-[49px]  absolute dropdown dropdown-top dropdown-left'>
						<label
							tabIndex={0}
							className='btn btn-circle btn-ghost btn-xs text-info'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='w-7 h-7 text-error stroke-current'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
							</svg>
						</label>
						<div
							tabIndex={0}
							className='relative dropdown-content border border-error border-opacity-10 bg-base-200  backdrop-blur-md shadow-2xl rounded-lg p-2 w-64'>
							<label className='label text-base-content'>{errorMsg}</label>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default FormInput;
