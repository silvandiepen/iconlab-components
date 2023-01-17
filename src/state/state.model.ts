export interface DataFile {
	name: string;
	og_name: string;
	filename: string;
	path: string;
	extension: string;
	data: string;
	size: number;
}

export interface State {
	data: {
		icons: DataFile[];
		styles: DataFile[];
		templates: DataFile[];
	};
	settings: {
		source: {
			icons: string;
			styles: string;
			templates: string;
		};
		destination: {
			icons: string;
		};
		remove: {
			prefix: string;
			old: boolean;
			tags: string | string[];
			attributes: string | string[];
		};
		generate: {
			icons: boolean;
			list: boolean;
			parentFolder: boolean;
		};
	};
}