import { Select } from '@acpaas-ui/react-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import { SelectOption, useDidMount } from '@redactie/utils';
import { Field } from 'formik';
import { isNil } from 'ramda';
import React, { ChangeEvent, FC, ReactElement, useMemo } from 'react';

import { formRendererConnector } from '../../../connectors';
import { useFeatures, useLayers } from '../../../hooks';

import {
	FEATURE_DEFAULT_OPTION,
	INITIAL_GIS_REF_VALUE,
	LAYER_DEFAULT_OPTIONS,
} from './GisReference.const';
import { GisReferenceValue } from './GisReference.types';

const GisReference: FC<InputFieldProps> = ({ fieldHelperProps, fieldProps, fieldSchema }) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;
	const value = (field.value as unknown) as GisReferenceValue;

	/**
	 * Hooks
	 */
	const [isLoadingLayers, layers] = useLayers();
	const [isLoadingFeatures, features] = useFeatures(value?.layerId);
	const showFeatureSelect = useMemo<boolean>(
		() => !isNil(value?.layerId) && value?.layerId !== '',
		[value]
	);
	const layerOptions = useMemo<SelectOption[]>(() => {
		const defaultOptions = [...LAYER_DEFAULT_OPTIONS];

		const options = (layers ?? []).map(layer => ({
			label: layer.name,
			value: `${layer.id}`,
		}));

		return defaultOptions.concat(options);
	}, [layers]);
	const featureOptions = useMemo<SelectOption[]>(() => {
		const defaultOptions = [FEATURE_DEFAULT_OPTION];

		const options = (features ?? []).map(feature => ({
			label: feature.properties.naam ?? feature.properties.NAAM,
			value: feature.properties.GISID ?? feature.properties.ID,
		}));

		return defaultOptions.concat(options);
	}, [features]);

	useDidMount(() => {
		if (!value) {
			// TODO: check if this causes a form update
			fieldHelperProps.setValue(INITIAL_GIS_REF_VALUE);
		}
	});

	/**
	 * Methods
	 */

	const updateValue = (newPartailValue: Partial<{ layerId: string; gisId: string }>): void => {
		fieldHelperProps.setValue({
			...(value || {}),
			...(newPartailValue?.layerId === 'empty' ? { gisId: '', layerId: '' } : {}),
			...newPartailValue,
		});
	};

	/**
	 * Render
	 */

	const renderFormFields = (): ReactElement => {
		return (
			<>
				{fieldSchema.label && fieldSchema.label !== ' ' && (
					<formRendererConnector.api.FormRendererFieldTitle
						isRequired={!!config.required}
						className="u-margin-bottom"
					>
						{fieldSchema.label}
					</formRendererConnector.api.FormRendererFieldTitle>
				)}
				{config.description && <p className="u-margin-bottom">{config.description}</p>}
				<div className="row">
					<div className="col-xs-6">
						<div className="a-input">
							<Field
								as={Select}
								required={!!config.required}
								label="Laag"
								id={`${field.name}.layerId`}
								loading={isLoadingLayers}
								name={`${field.name}.layerId`}
								onChange={(event: ChangeEvent<HTMLSelectElement>) =>
									updateValue({ layerId: event.target.value })
								}
								options={layerOptions}
							/>
							<small>Selecteer een laag uit GIS.</small>
							<formRendererConnector.api.ErrorMessage
								name={`${field.name}.layerId`}
							/>
						</div>
					</div>
					{showFeatureSelect && (
						<div className="col-xs-6">
							<div className="a-input">
								<Field
									as={Select}
									required={!!config.required}
									label="Punt"
									id={`${field.name}.gisId`}
									loading={isLoadingFeatures}
									name={`${field.name}.gisId`}
									onChange={(event: ChangeEvent<HTMLSelectElement>) =>
										updateValue({ gisId: event.target.value })
									}
									options={featureOptions}
								/>
								<small>Selecteer een punt uit de GIS-laag.</small>
								<formRendererConnector.api.ErrorMessage
									name={`${field.name}.gisId`}
								/>
							</div>
						</div>
					)}
				</div>
				<formRendererConnector.api.ErrorMessage name={fieldSchema.name} />
			</>
		);
	};

	return renderFormFields();
};

export default GisReference;
