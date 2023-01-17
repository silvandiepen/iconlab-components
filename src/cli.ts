// #!/usr/bin/env node

// import { blockFooter, blockHeader, blockLine } from 'cli-block';
import { setup } from './setup';
// import { load } from './load';
// import { build } from './build';

// Steps
(async () => {
	// blockHeader('Iconlab');
	// blockLine();
	// blockLine(
	// 	'Iconlab is building your icons from SVG and CSS files in the way you want.'
	// );

	await setup();
	// await load();
	// await build();

	// blockFooter();
})();
