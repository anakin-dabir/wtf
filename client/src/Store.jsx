import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useStore = create((set) => ({
	user: { _id: 123, name: 'Talha' },
	login: Cookies.get('auth') ? true : false,
	socket: null,
	theme: 'dark',
	setUser: (user) => set((state) => ({ user })),
	setLogin: () => set((state) => ({ login: !state.login })),
	setSocket: (socket) => set(() => ({ socket })),
}));
