import { useEffect, useState, useTransition } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useApi = (_method = null, _url = null, _input = null) => {
	const [data, setData] = useState();
	const [isLoading, setisLoading] = useState(false);
	const [inLoading, setinLoading] = useState(false);

	const fetchData = (method, url, input = null, inS = false) => {
		inS ? setinLoading(true) : setisLoading(true);
		(async () => {
			try {
				let res;
				if (method.toLowerCase() == 'post') {
					res = await axios[method.toLowerCase()](
						`${import.meta.env.VITE_SERVER || 'http://localhost:8080/'}${url}`,
						input,
						{
							withCredentials: true,
						}
					);
				} else {
					res = await axios[method.toLowerCase()](
						`${import.meta.env.VITE_SERVER || 'http://localhost:8080/'}${url}`,
						{
							withCredentials: true,
						}
					);
				}
				const { body, msg } = res.data;
				if (msg) toast.success(msg);
				if (body) setData(body);
				if (res.data.url) window.location = res.data.url;
				console.log(res);
			} catch (err) {
				if (err.response.data.msg) toast.error(err.response.data.msg);
				console.log(err);
			}
			inS ? setinLoading(false) : setisLoading(false);
		})();
	};

	useEffect(() => {
		if (_url) {
			fetchData(_method, _url, _input);
		}
	}, []);

	return { data, isLoading, inLoading, fetchData };
};
