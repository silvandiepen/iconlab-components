import { ArgType } from '@sil/args';
import { blockErrors, blockFooter, blockMid, bold } from 'cli-block';

import {
	dirExists,
	hasLength,
	isArray,
	isString,
	isTrue,
	isDefined,
	isEmpty
} from '../helpers';
import { useStateSettings, setSetting } from '../state';

interface Args extends ArgType {
	icons?: string;
	src?: string;
	styles?: string;
	templates?: string;
	output?: string;
	dest?: string;
	removePrefix?: string;
	cleanup?: boolean;
}

export const parseSettings = async (args: Args): Promise<void> => {
	// Source
	if (isString(args.icons)) {
		setSetting('source.icons', args.icons);
	} else if (isString(args.src)) {
		setSetting('source.icons', args.icons);
	}

	if (args.styles && args.styles.length > 0) {
		setSetting('source.styles', args.styles);
	} else {
		setSetting('source.styles', args.icons || args.src);
	}

	if (isString(args.templates)) {
		setSetting('source.templates', args.templates);
	}
	// Destinations
	if (isString(args.output)) {
		setSetting('destination.icons', args.output);
	}

	// Remove
	if (isString(args.removePrefix)) {
		setSetting('remove.prefix', args.removePrefix);
	}

	if (isTrue(args.removeOld)) {
		setSetting('remove.old', args.removeOld);
	}

	if (
		(isString(args.removeTags) || isArray(args.removeTags)) &&
		hasLength(args.removeTags)
	) {
		setSetting('remove.tags', args.removeTags);
	}

	if (
		(isString(args.removeAttributes) || isArray(args.removeAttributes)) &&
		hasLength(args.removeAttributes)
	) {
		setSetting('remove.attributes', args.removeAttributes);
	}
};

export const validateSettings = () => {
	const errors = [];

	const { source, destination } = useStateSettings();

	// Check required params

	if (isEmpty(source.icons)) {
		errors.push('No icon source set');
	}

	if (isEmpty(source.templates)) {
		errors.push('No template folder set');
	}

	if (isEmpty(destination.icons)) {
		errors.push('No destination set');
	}

	// Check defined directories
	if (isDefined(source.icons) && !dirExists(source.icons)) {
		errors.push(`Icon source folder: ${bold(source.icons)} does not exist`);
	}

	if (isDefined(source.styles) && !dirExists(source.styles)) {
		errors.push(`Styles source folder: ${bold(source.styles)}  does not exist`);
	}

	if (isDefined(source.templates) && !dirExists(source.templates)) {
		errors.push(
			`Template source folder: ${bold(source.templates)}  does not exist`
		);
	}

	if (errors.length > 0) {
		blockMid('errors');
		blockErrors(errors);
		blockFooter();
		process.exit(1);
	}
};
