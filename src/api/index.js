import axios from "axios";
import baseURL, { URLS } from "./URLs";

const appkey = "dx18757127948_1620113636086";

const request = axios.create({
	baseURL,
	params: {
		appkey,
	},
});

request.interceptors.response.use((config) => {
	return config.data;
});

const getSideList = (type) => request.get(URLS.getSide, { params: { type } });

const getGoodsList = (type, page, size, sort) => 
	request.get(URLS.getGoodsList, {
		params: {
			type,
			size,
			sort,
			page,
		},
	});


const likeSearch = (value) => request.get(
	URLS.likeSearch,
	{ params: { likeValue: value } },
  );
  
const search = (type, page, size) => request.get(
	URLS.search,
	{ params: { type, page, size } },
);
const getGoodsByIds = (value) => request.get(
  URLS.getGoodsByIds,
  { params: { value } },
);

export default {
	getSideList,
	getGoodsList,
	search,
	likeSearch,
	getGoodsByIds
};
