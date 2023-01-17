import { kebabCase } from '@sil/case';
import {
	blockLine,
	blockLineError,
	blockMid,
	blockRowLine,
	blue,
	bold,
	dim
} from 'cli-block';
import { basename, extname, join } from 'path';

import {
	asyncForEach,
	readDir,
	fileData,
	fileSize,
	dirExists,
	removeXml
} from '../helpers';
import { useStateSettings, setIcons, setTemplates, setStyles } from '../state';
import { DataFile } from '../state/state.model';
import { enrichAllFiles } from './enrich';

interface GetFilesOptions {
	filter?: string[];
}

const getFiles = async (
	dir: string,
	options: GetFilesOptions = {}
): Promise<DataFile[]> => {
	if (!dirExists(dir)) {
		blockLineError(`${dir} does not exist`);
		return;
	}

	const { remove } = useStateSettings();

	const filenames = await readDir(dir);
	const files = [];

	const ogName = (v: string): string => basename(v).replace(extname(v), '');
	const prettifiedName = (v: string): string =>
		kebabCase(ogName(v)).replace(remove.prefix, '');

	await asyncForEach(
		(filenames as string[]).filter((file) =>
			options.filter ? options.filter.includes(extname(file)) : true
		),
		async (filename: string) => {
			files.push({
				name: prettifiedName(filename),
				og_name: ogName(filename),
				filename: filename,
				path: join(dir, filename),
				extension: extname(filename),
				data: await fileData(join(dir, filename)),
				size: fileSize(join(dir, filename))
			});
		}
	);

	return files;
};

const logLoaded = (title: string, data: DataFile[]) => {
	blockLine(blue(bold(title)));

	data.forEach((item) => {
		blockRowLine([
			`${basename(item.og_name)}${dim(item.extension)}`,
			dim(`${item.size} bytes`)
		]);
	});
	blockLine();
};

export const load = async (): Promise<void> => {
	blockMid('Load');

	const { source } = useStateSettings();

	// Load all Icons
	const iconData = await (
		await getFiles(source.icons, { filter: ['.svg'] })
	).map((f) => ({ ...f, data: removeXml(f.data) }));
	setIcons(iconData);
	logLoaded('icons', iconData);

	// Load all Styles
	const styleData = await getFiles(source.styles, {
		filter: ['.css', '.scss', '.less', '.sass', '.stylus']
	});
	setStyles(styleData);
	logLoaded('Styles', styleData);

	// Load All Templates
	const templateData = await getFiles(source.templates, {
		filter: ['.ejs', '.template']
	});
	setTemplates(templateData);
	logLoaded('Templates', templateData);

	// Enrich Data
	await enrichAllFiles();

};
