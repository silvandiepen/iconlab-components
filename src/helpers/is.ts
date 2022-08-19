export const isString = (value: unknown): boolean => {
	if (value == undefined) return false;
	return typeof value == 'string';
};

export const isNumber = (value: unknown): boolean => {
	if (value == undefined) return false;
	return typeof value == 'number';
};

export const isArray = (value: unknown): boolean => {
	if (value == undefined) return false;
	return Array.isArray(value);
};

export const hasLength = (value: unknown): boolean => {
	if (value == undefined) return false;
	if (isString(value)) {
		if (value == '') return false;
		return (value as string).length > 0;
	}
	if (isArray(value)) {
		return (value as string[]).length > 0;
	}
	if (isNumber(value)) {
		return value > 0;
	}
	return false;
};

export const isBoolean = (value: unknown): boolean => {
	return typeof value == 'boolean';
};
export const isTrue = (value: unknown): boolean => {
	return isBoolean(value) && (value as boolean);
};

export const isFalse = (value: unknown): boolean => {
	return isBoolean(value) && !(value as boolean);
};

export const isDefined = (value: unknown): boolean => {
	return !(value == undefined || value == null || value == '');
};

export const isEmpty = (value: unknown): boolean => {
	return value == '' || value == null;
};
