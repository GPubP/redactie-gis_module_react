import { InputFieldProps } from '@redactie/form-renderer-module';
import React from 'react';

import { formRendererConnector } from '../../../connectors';
import {
	AddressModel,
	CoordinateModel,
	InitialLocationModel,
	LatLngModel,
	LocationModel,
	LocationPickerWidget,
} from '../../LocationPickerWidget';

import { GisAddressValue } from './GisAddress.types';

const GisAddress: React.FC<InputFieldProps> = ({ fieldHelperProps, fieldProps, fieldSchema }) => {
	const { setValue } = fieldHelperProps;
	const { field } = fieldProps;
	const { config = {}, label = '' } = fieldSchema;

	const trimmedLabel = label.trim();

	const onLocationSelect = (location: GisAddressValue): void => {
		setValue(location);
	};

	const getInitialLocation = (): InitialLocationModel | undefined => {
		const fieldValue = field.value as GisAddressValue | undefined;

		if (!fieldValue) {
			// The initialLocation prop expects an object
			return {};
		}

		const { addressPosition } = fieldValue as AddressModel;
		const { actualLocation } = fieldValue as CoordinateModel;
		const { position } = fieldValue as LocationModel;

		return {
			label: fieldValue.label,
			position: (addressPosition?.wgs84 || actualLocation || position?.wgs84) as Required<
				LatLngModel
			>,
			options: {
				triggerSearch: true,
			},
		};
	};

	return (
		<>
			{trimmedLabel && (
				<formRendererConnector.api.FormRendererFieldTitle
					className="u-margin-bottom"
					isRequired={!!config.required}
				>
					{trimmedLabel}
				</formRendererConnector.api.FormRendererFieldTitle>
			)}
			{config.description && <p className="u-margin-bottom">{config.description}</p>}
			<LocationPickerWidget
				initialLocation={getInitialLocation()}
				onLocationSelect={onLocationSelect}
			/>
			<formRendererConnector.api.ErrorMessage name={field.name} />
		</>
	);
};

export default GisAddress;
