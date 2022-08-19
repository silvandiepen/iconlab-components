import {
	existsSync as fsExistsSync,
	statSync as fsStatSync,
	mkdir as fsMkdir
} from 'fs';
import {
	readdir as fsReaddir,
	readFile as fsReadFile,
	writeFile as fsWriteFile
} from 'fs/promises';
import { dirname } from 'path';
import { isNodeError } from './node';

export const writeFile = async (
	filepath: string,
	data: string
): Promise<void> => {
	try {
		fsMkdir(dirname(filepath), { recursive: true }, async (err) => {
			if (isNodeError(err) && err.code === 'ENOENT') {
				throw new Error(`Couldn't create dir ${dirname(filepath)}`);
			}

			await fsWriteFile(filepath, data);
		});
	} catch (err) {
		if (isNodeError(err) && err.code === 'ENOENT') {
			throw new Error(`Something went wrong creating ${filepath}`);
		}
	}
};

export const fileData = async (path: string): Promise<string> => {
	try {
		return fsReadFile(path).then((file) => {
			return file.toString();
		});
	} catch (err) {
		console.warn(err);
	}
};

export const readDir = async (dir: string): Promise<string[]> => {
	const files = await fsReaddir(dir);
	return files;
};

export const dirExists = (dir: string): boolean => {
	try {
		if (fsExistsSync(dir)) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
};

enum fileSizeOutput {
	bytes,
	kilobytes,
	megabytes
}
export const fileSize = (
	file: string,
	output: fileSizeOutput = fileSizeOutput.bytes
): number => {
	try {
		const stats = fsStatSync(file);
		switch (output) {
			case fileSizeOutput.bytes:
				return stats.size;
			case fileSizeOutput.kilobytes:
				return stats.size / 1024;
			case fileSizeOutput.megabytes:
				return (stats.size / 1024) * 1024;
		}
	} catch (err) {
		return 0;
	}
};
