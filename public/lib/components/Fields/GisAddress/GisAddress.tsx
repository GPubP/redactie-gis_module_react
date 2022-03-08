import { InputFieldProps } from '@redactie/form-renderer-module';
import React, { useMemo } from 'react';

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

	const [searchStreet, layers] = useMemo(() => {
		let street = false;

		const filteredLayers = (config.allowedLayers || []).reduce(
			(acc: string[], layer: string) => {
				if (
					layer === 'straatnaam' &&
					!(config.allowedLayers || []).find((l: string) => l === 'none')
				) {
					street = true;
				}

				if (layer === 'none') {
					return acc;
				}

				return [...acc, layer];
			},
			[]
		);

		return [street, filteredLayers];
	}, [config.allowedLayers]);

	const trimmedLabel = label.trim();

	const onLocationSelect = (location: GisAddressValue & { isInitialLocation?: true }): void => {
		if (location.isInitialLocation) {
			return;
		}

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
				triggerSearch: false,
			},
			isInitialLocation: true,
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
				locationLayers={layers}
				searchStreetNameForAddress={searchStreet}
			/>
			<formRendererConnector.api.ErrorMessage name={field.name} />
		</>
	);
};

export default GisAddress;
