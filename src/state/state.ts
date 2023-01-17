import { DataFile, State } from './state.model';

// State
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

// Getters
export const useState = (): State => Object.freeze(state);
export const useStateData = (): State['data'] => Object.freeze(state.data);
export const useStateSettings = (): State['settings'] =>
	Object.freeze(state.settings);

// Setters

	export const setData = (category: string, data: DataFile[]): void => {
	state.data[category].push(data);
};

export const setIcons = (data: DataFile[]): void => {
	state.data.icons = data;
};

export const setIconData = (data: DataFile, id: number): void => {
	state.data.icons[id] = data;
};

export const setStyles = (data: DataFile[]): void => {
	state.data.styles = data;
};

export const setTemplates = (data: DataFile[]): void => {
	state.data.templates = data;
};

export const setSetting = (setting: string, value) => {
	const settingPath = setting.split('.');
	state.settings[settingPath[0]][settingPath[1]] = value;
};
