#!/usr/bin/env node
// import { hello } from '@sil/tools';

import { blockFooter, blockFull, blockHeader, blockLine } from 'cli-block';
import { setup } from './setup';
import { load } from './load';
import { build } from './build';

// Flow

export const hello = async (args: unknown = {}): Promise<unknown> => {
	return args;
};

(async () => {
	blockHeader('Iconlab');
	blockLine();
	blockLine(
		'Iconlab is building your icons from SVG and CSS files in the way you want.'
	);

	await setup();
	await load();
	await build();
	blockFooter();
})();
