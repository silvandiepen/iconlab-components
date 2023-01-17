// import { blockMid, blockSettings, blue, bold } from 'cli-block';
import { getArgs } from '@sil/args';

import { useStateSettings } from '../state';
import { parseSettings, validateSettings } from './settings';

// Steps
export const showSettings = async () => {
	// const options = (title: string) => ({
	// 	marginBottom: false,
	// 	header: blue(bold(title))
	// });

	// const { source, destination, remove } = useStateSettings();

	// await blockSettings(source, {}, options('source'));
	// await blockSettings(destination, {}, options('Output'));
	// await blockSettings(remove, {}, options('Remove'));
};

export const setup = async (): Promise<void> => {
	// blockMid('Setup');

	const args = getArgs();

	parseSettings(args);

	// await showSettings();

	// validateSettings();
};
