import { reactComponent } from '@acpaas-ui/embeddable-widgets';
import React from 'react';
import ReactDOM from 'react-dom';

import {
	LOCATION_PICKER_DEFINITION_URL,
	LOCATION_PICKER_OVERRIDES,
} from './LocationPickerWidget.const';
import { LocationPickerWidgetProps } from './LocationPickerWidget.types';

const LocationPickerWidget: React.ComponentClass<LocationPickerWidgetProps> = reactComponent(
	LOCATION_PICKER_DEFINITION_URL,
	{
		React,
		ReactDOM,
	},
	LOCATION_PICKER_OVERRIDES
);

export default LocationPickerWidget;
