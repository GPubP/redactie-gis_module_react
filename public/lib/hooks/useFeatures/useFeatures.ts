import { isNil } from 'ramda';
import { useEffect, useState } from 'react';

import { Feature, LayerField } from '../../services/gis';
import { gisFacade } from '../../store/gis/gis.facade';

const useFeatures = (layerId?: string): [boolean, Feature[], LayerField[]] => {
	const [features, setFeatures] = useState<Feature[]>([]);
	const [layerFields, setLayerFields] = useState<LayerField[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (isNil(layerId) || layerId === '') {
			return;
		}

		const hasFeaturesFromLayer = gisFacade.hasFeaturesFromLayer(layerId);

		if (!hasFeaturesFromLayer) {
			gisFacade.getFeatures(layerId);
		}

		const subscription = gisFacade.selectFeaturesByLayerId(layerId).subscribe(setFeatures);
		const layerFieldsSubscription = gisFacade
			.selectLayerFields(layerId)
			.subscribe(setLayerFields);
		const loadingSubscription = gisFacade.selectLoadingFeatures(layerId).subscribe(setLoading);

		return () => {
			subscription.unsubscribe();
			loadingSubscription.unsubscribe();
			layerFieldsSubscription.unsubscribe();
		};
	}, [layerId]);

	return [loading, features, layerFields];
};

export default useFeatures;
