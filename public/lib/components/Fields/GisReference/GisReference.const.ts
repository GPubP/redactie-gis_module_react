import { SelectOption } from '@redactie/utils';

import { GisReferenceValue } from './GisReference.types';

export const INITIAL_GIS_REF_VALUE: GisReferenceValue = {
	layerId: '',
	gisId: '',
};

export const LAYER_DEFAULT_OPTIONS: SelectOption[] = [
	{
		label: 'Selecteer een laag',
		value: '',
		disabled: true,
	},
	{
		label: 'Selecteer een lege laag',
		value: '',
	},
];

export const FEATURE_DEFAULT_OPTION: SelectOption = {
	label: 'Selecteer een punt',
	value: '',
	disabled: true,
};
