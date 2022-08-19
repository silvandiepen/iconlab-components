import {
	blockLine,
	blockLineSuccess,
	blockMid,
	blue,
	bold,
	dim
} from 'cli-block';
import { asyncForEach, formatFile, writeFile } from '../helpers';
import { useStateData, useStateSettings } from '../state';
import { DataFile } from '../state/state.model';

import { kebabCase, PascalCase, upperSnakeCase } from '@sil/case';

import ejs, { render } from 'ejs';
import { extname, join } from 'path';

const fixJSX = (input: string): string => input;

const renderTemplate = async (
	data: DataFile[],
	template: DataFile,
	icon: DataFile | {} = {}
): Promise<string> =>
	await ejs.render(
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

const buildComponent = async (
	icons: DataFile[],
	file: DataFile,
	template: DataFile
): Promise<void> => {
	const { destination } = useStateSettings();

	const renderedFile = await renderTemplate(icons, template, file);
	const componentExtension = extname(template.og_name);
	const outputPath = join(destination.icons, file.name) + componentExtension;

	const prettycode = formatFile(
		renderedFile,
		componentExtension.replace('.', '')
	);

	await writeFile(outputPath, prettycode);

	blockLineSuccess(`${file.name}${dim(componentExtension)}`);
};

const buildList = async (
	files: DataFile[],
	template: DataFile
): Promise<void> => {
	const { destination } = useStateSettings();

	// const componentExtension = extname(template.og_name);
	// const fileName = template.name.replace(`-${componentExtension}`, '');

	const renderedFile = await renderTemplate(files, template);
	const templateExtension = extname(template.og_name.replace('.ejs', ''));
	const templateName = template.name.replace(
		`-${templateExtension.replace('.', '')}`,
		''
	);
	const outputPath = join(destination.icons, templateName) + templateExtension;
	const prettycode = formatFile(
		renderedFile,
		templateExtension.replace('.', '')
	);
	await writeFile(outputPath, prettycode);
	blockLineSuccess(`${templateName}${dim(templateExtension)}`);
};

export const build = async () => {
	blockMid('Build');

	const { icons, templates } = useStateData();

	await asyncForEach(templates, async (template: DataFile) => {
		if (template.og_name.charAt(0) == '_') return;

		if (template.og_name.split('.')[0] == 'component') {
			blockLine(`${blue('components')} ${bold(template.og_name)}`);
			// Rendering Components
			await asyncForEach(icons, async (icon: DataFile) => {
				await buildComponent(icons, icon, template);
			});
		} else {
			blockLine(`${blue('list')} ${bold(template.og_name)}`);
			await buildList(icons, template);
		}
		blockLine();
	});
};
