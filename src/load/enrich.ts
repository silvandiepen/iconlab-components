import { getTagData } from '../helpers';
import { setIconData, useStateData } from '../state';
import { DataFile } from '../state/state.model';

export const getStyles = (file: DataFile): string => {
	const { styles } = useStateData();

	const globalStyle = styles.find((style) => style.og_name == '*');
	const styleFile = styles.find((style) => style.og_name == file.og_name);
	const styleTag = getTagData(file.data, 'style');

	return `
    ${globalStyle ? globalStyle.data : null}
    ${styleFile ? styleFile.data : null}
    ${styleTag}
    `;
};

export const enrichData = (file: DataFile): DataFile => {
	const enrichedFile = {
		...file,
		style: getStyles(file)
	};

	return enrichedFile;
};

export const enrichAllFiles = async (): Promise<void> => {
	const { icons } = useStateData();
	Promise.all(
		icons.map((icon, key) => {
			const enrichedIcon = enrichData(icon);
			setIconData(enrichedIcon, key);
		})
	);
};
