import axios, { AxiosRequestConfig, Method } from 'axios';

export type AxiosRequestData = FormData | AxiosRequestParams;
export type AxiosRequestParams = Record<number | string, any>;

export const axiosInstance = axios.create({});

export const axiosRequest = async (
	url: string,
	method: Method,
	params?: AxiosRequestData,
	data?: AxiosRequestData,
	config?: AxiosRequestConfig
) => {
	return await axiosInstance.request({
		...config,
		data,
		method,
		params,
		url
	});
}

/**
 * 使用Delete請求
 */
export const useDelete = async (url: string, params?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return await axiosRequest(url, 'delete', params, {}, config);
}

export const $useDelete = async (url: string, params?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return (await useDelete(url, params, config)).data;
}

/**
 * 使用Get請求
 */
export const useGet = async (url: string, params?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return await axiosRequest(url, 'get', params, {}, config);
}

export const $useGet = async (url: string, params?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return (await useGet(url, params, config)).data;
}

/**
 * 使用Patch請求
 */
export const usePatch = async (url: string, data?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return await axiosRequest(url, 'patch', {}, data, config);
}

export const $usePatch = async (url: string, data?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return (await usePatch(url, data, config)).data;
}

/**
 * 使用Post請求
 */
export const usePost = async (url: string, data?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return await axiosRequest(url, 'post', {}, data, config);
}

export const $usePost = async (url: string, data?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return (await usePost(url, data, config)).data;
}

/**
 * 使用Put請求
 */
export const usePut = async (url: string, data?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return await axiosRequest(url, 'put', {}, data, config);
}

export const $usePut = async (url: string, data?: AxiosRequestData, config?: AxiosRequestConfig) => {
	return (await usePut(url, data, config)).data;
}
