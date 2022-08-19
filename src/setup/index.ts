import { blockMid, blockSettings, blue, bold, SettingsConfig } from 'cli-block';
import { getArgs } from '@sil/args';

import { useStateSettings } from '../state';
import { parseSettings, checkSettings } from './settings';

// Steps
export const showSettings = async () => {
	const { source, destination, remove, generate } = useStateSettings();

	const options = (title: string) => ({
		marginBottom: false,
		header: blue(bold(title))
	});

	await blockSettings(source, {}, options('source'));
	await blockSettings(destination, {}, options('Output'));
	await blockSettings(remove, {}, options('Remove'));
	// await blockSettings(generate, {}, options('Remove'));
};

export const setup = async (): Promise<void> => {
	blockMid('Setup');
	const args = getArgs();
	
	parseSettings(args);
	await showSettings();
	checkSettings();
};
