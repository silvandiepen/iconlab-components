import { DataFile, State } from './state.model';

const state: State = {
	data: {
		icons: [],
		styles: [],
		templates: []
	},
	settings: {
		source: {
			icons: '',
			styles: '',
			templates: ''
		},
		destination: {
			icons: ''
		},
		remove: {
			prefix: '',
			old: false,
			tags: [],
			attributes: []
		},
		generate: {
			icons: false,
			list: false,
			parentFolder: false
		}
	}
};
export const useState = (): State => Object.freeze(state);
export const useStateData = (): State['data'] => Object.freeze(state.data);
export const useStateSettings = (): State['settings'] =>
	Object.freeze(state.settings);

export const setData = async (
	category: string,
	data: DataFile[]
): Promise<void> => {
	state.data[category].push(data);
};

export const setIcons = async (data: DataFile[]): Promise<void> => {
	state.data.icons = data;
};

export const setIconData = async (data: DataFile, id: number): Promise<void> => {
	// state.data.icons = data;
	state.data.icons[id] = data;
};

export const setStyles = async (data: DataFile[]): Promise<void> => {
	state.data.styles = data;
};

export const setTemplates = async (data: DataFile[]): Promise<void> => {
	state.data.templates = data;
};

export const setSetting = (setting: string, value) => {
	const settingPath = setting.split('.');
	state.settings[settingPath[0]][settingPath[1]] = value;
};
