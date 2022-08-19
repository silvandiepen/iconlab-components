
import { format } from 'prettier';

export const formatFile = (str: string, ext: string):string => {
	let parserFormat: string = '';

	const allowed = [
		'scss',
		'css',
		'less',
		'graphql',
		'html',
		'vue',
		'yaml',
		'mdx'
	];

	if (allowed.includes(ext)) {
		parserFormat = ext;
	} else {
		switch (ext) {
			case 'js':
				parserFormat = 'babel';
				break;
			case 'ts':
				parserFormat = 'typescript';
				break;
			case 'json':
				parserFormat = 'json5';
				break;
			case 'md':
				parserFormat = 'markdown';
				break;
		}
	}

	return parserFormat ? format(str, { parser: parserFormat }) : str;
};
