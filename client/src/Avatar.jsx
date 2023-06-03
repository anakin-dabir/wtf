import React from 'react';

const Avatar = ({
	rounded = 'rounded-full',
	chat = false,
	url = '',
	width = 'w-24',
	name = 'A',
}) => {
	return url !== '' ? (
		<div className={`avatar ${chat ? 'chat-image' : ''}`}>
			<div className={`${width} ${rounded}`}>
				<img src={url} />
			</div>
		</div>
	) : (
		<div className={`vatar placeholder ${chat ? 'chat-image' : ''} `}>
			<div className={`bg-base-300 text-base-content ${rounded} ${width}`}>
				<span className='text-3xl'>{name[0]}</span>
			</div>
		</div>
	);
};

export default Avatar;
