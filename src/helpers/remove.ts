export const removeStyleTags = (data: string): string => {
	return data;
};

export const removeXml = (data: string): string => {
	return data.indexOf('<?xml') > -1
		? data.substring(data.indexOf('?>') + 2, data.length)
		: data;
};
