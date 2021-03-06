export const LOCATION_PICKER_DEFINITION_URL =
	'https://widgets.antwerpen.be/definitions/location-picker-v2.json';

export const LOCATION_PICKER_OVERRIDES = {
	attributes: {
		iframe: {
			allow: 'geolocation',
		},
	},
	dimensions: {
		width: '100%',
		height: '400px',
	},
};
