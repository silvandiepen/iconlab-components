const tagsRegex = (tag: string): any =>
	new RegExp(`<[\/]{0,1}(${tag}|${tag})[^><]*>`, 'g');

export const removeTag = (str: string, tag: string): string =>
	str.replace(tagsRegex(tag), '');

    
export const getTagData = (str: string, tag: string): string => {
	const regex = new RegExp(`<${tag}>(.|\n)*?<\/${tag}>`, 'gi');
	const matches = str.match(regex);

	return matches ? removeTag(matches[0], tag) : '';
};
