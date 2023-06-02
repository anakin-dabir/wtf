import { useEffect } from 'react';
import { useStore } from './Store';
import { io } from 'socket.io-client';

const Socket = () => {
	const setSocket = useStore((state) => state.setSocket);
	const isLogin = useStore((state) => state.login);
	const user_id = useStore((state) => state.user?._id);
	useEffect(() => {
		const socket = new io(
			import.meta.env.VITE_SERVER || 'http://localhost:8080',
			{
				autoConnect: false,
			}
		);
		if (isLogin) {
			socket.connect();
			setSocket(socket);
			socket.emit('connected', user_id);
		}
		socket.on('getUsers', (users) => {
			console.log(users);
		});
		return () => {
			socket.disconnect();
		};
	}, [isLogin]);
	return <div>Socket</div>;
};

export default Socket;
