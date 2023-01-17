import {
	blockLine,
	blockLineSuccess,
	blockMid,
	blue,
	bold,
	dim
} from 'cli-block';
import { Data, render } from 'ejs';
import { extname, join } from 'path';
import { kebabCase, PascalCase, upperSnakeCase } from '@sil/case';

import { asyncForEach, formatFile, writeFile } from '../helpers';
import { useStateData, useStateSettings } from '../state';
import { DataFile } from '../state/state.model';

const fixJSX = (input: string): string => input;

const renderTemplate = async (
	data: DataFile[],
	template: DataFile,
	icon: DataFile | {} = {}
): Promise<string> =>
	await render(
		template.data,
		{
			icons: data,
			icon,
			kebabCase,
			PascalCase,
			upperSnakeCase,
			fixJSX
		},
		{ async: true }
	);

const getComponentAttributes = (
	template: DataFile,
	file: DataFile
): { extension: string; path: string; name: string } => {
	const { destination } = useStateSettings();
	return {
		extension: extname(template.og_name).replace('.', ''),
		path: `${join(destination.icons, file.name)}${extname(template.og_name)}`,
		name: file.name
	};
};
const getListAttributes = (
	template: DataFile
): { extension: string; path: string; name: string } => {
	const { destination } = useStateSettings();
	const extension = extname(template.og_name.replace('.ejs', '')).replace(
		'.',
		''
	);
	const filename = template.name.replace(`-${extension}`, '');
	return {
		extension: extension,
		path: `${join(destination.icons, filename)}.${extension}`,
		name: filename
	};
};

const buildComponent = async (
	icons: DataFile[],
	file: DataFile,
	template: DataFile
): Promise<void> => {
	const component = getComponentAttributes(template, file);
	const renderedFile = await renderTemplate(icons, template, file);
	const prettycode = formatFile(renderedFile, component.extension);
	await writeFile(component.path, prettycode);
	blockLineSuccess(
		`${file.name} ➞ ${dim(component.path)}`
	);
};

const buildList = async (
	files: DataFile[],
	template: DataFile
): Promise<void> => {
	const list = getListAttributes(template);
	const renderedFile = await renderTemplate(files, template);
	const prettycode = formatFile(renderedFile, list.extension);
	await writeFile(list.path, prettycode);
	blockLineSuccess(
		`${list.name} ➞ ${dim(list.path)}`
	);
};

const getFileType = (template: DataFile): 'component' | 'list' => {
	return  template.og_name.split('.')[0] == 'component' ? 'component': 'list'
};

export const build = async () => {
	blockMid('Build');

	const { icons, templates } = useStateData();

	await asyncForEach(templates, async (template: DataFile) => {
		if (template.og_name.charAt(0) == '_') return;

		const fileType = getFileType(template);

		if (fileType == 'component') {
			blockLine(`${blue('components')} ${bold(template.og_name)}`);
			await asyncForEach(icons, async (icon: DataFile) => {
				await buildComponent(icons, icon, template);
			});
		}

		if (fileType == 'list') {
			blockLine(`${blue('list')} ${bold(template.og_name)}`);
			await buildList(icons, template);
		}

		blockLine();
	});
};
