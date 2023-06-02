import React, { useState } from 'react';

const Sidebar = ({ data = null, setData }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className='relative'>
			{/* Overlay */}
			{isOpen && (
				<div
					className='fixed inset-0 backdrop-blur-md bg-base-300 bg-opacity-50 '
					onClick={toggleSidebar}></div>
			)}

			{/* Sidebar */}
			<div
				className={`fixed z-50 inset-y-0 right-0 w-72 bg-base-100 text-base-content shadow-2xl transform ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				} transition-transform duration-300 ease-in-out`}>
				{/* Sidebar content */}
				<button
					onClick={toggleSidebar}
					className='btn btn-sm btn-circle btn-ghost absolute right-5 top-8'>
					✕
				</button>
				{/*Content */}
				<div className='p-4 flex mt-4 flex-col'>
					<div className='text-2xl font-bold'>Notifications</div>
					<div className='divider bg-base-content  h-[0.5px] opacity-30'></div>
					<div className='mt-4 flex gap-2 flex-col'>
						{data && (
							<div className={`bg-neutral  p-3 text-neutral-content`}>
								{data}
							</div>
						)}
					</div>
				</div>

				<button
					onClick={() => setData(null)}
					className='btn btn-ghost fixed bottom-4 w-full'>
					Clear All
				</button>
			</div>

			{/* Toggle button */}
			<button
				onClick={toggleSidebar}
				className='btn btn-ghost btn-circle'>
				<div className='indicator'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
						/>
					</svg>
					{data && (
						<span className='badge badge-xs badge-primary indicator-item'></span>
					)}
				</div>
			</button>
		</div>
	);
};

export default Sidebar;
