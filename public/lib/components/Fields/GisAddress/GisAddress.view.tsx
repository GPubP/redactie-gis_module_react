import { Icon } from '@acpaas-ui/react-components';
import { ViewFieldProps } from '@redactie/form-renderer-module';
import React from 'react';

import { AddressModel, CoordinateModel, LocationModel } from '../../LocationPickerWidget';

import { GisAddressValue } from './GisAddress.types';

const GisAddressView: React.FC<ViewFieldProps> = ({ value }) => {
	const fieldValue = value as GisAddressValue | undefined;

	if (!fieldValue) {
		return null;
	}

	const getAddress = (): string => {
		const { formattedAddress } = fieldValue as AddressModel;
		const { address, location, name } = fieldValue as CoordinateModel;
		const { name: locationName } = fieldValue as LocationModel;

		if (formattedAddress || address?.formattedAddress) {
			return (formattedAddress || address?.formattedAddress) as string;
		}
		if (location?.name || locationName || name) {
			return (location?.name || locationName || name) as string;
		}

		return fieldValue.label as string;
	};

	return (
		<>
			<Icon className="u-margin-right-xs" name="map-marker" />
			<span>{getAddress()}</span>
		</>
	);
};

export default GisAddressView;
