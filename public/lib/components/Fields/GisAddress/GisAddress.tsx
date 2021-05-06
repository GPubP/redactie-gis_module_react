import { InputFieldProps } from '@redactie/form-renderer-module';
import React from 'react';

import { formRendererConnector } from '../../../connectors';
import { LocationPickerWidget } from '../../LocationPickerWidget';

import { GisAddressValue } from './GisAddress.types';

const GisAddress: React.FC<InputFieldProps> = ({ fieldHelperProps, fieldProps, fieldSchema }) => {
	const { setValue } = fieldHelperProps;
	const { field } = fieldProps;
	const { config = {}, label = '' } = fieldSchema;

	const trimmedLabel = label.trim();

	const onLocationSelect = (location: GisAddressValue): void => {
		setValue(location);
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
			<LocationPickerWidget onLocationSelect={onLocationSelect} />
			<formRendererConnector.api.ErrorMessage name={field.name} />
		</>
	);
};

export default GisAddress;
