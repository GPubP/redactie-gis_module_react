import { isNil } from 'ramda';
import { useEffect, useState } from 'react';

import { Feature } from '../../services/gis';
import { gisFacade } from '../../store/gis/gis.facade';

const useFeatures = (layerId?: string): [boolean, Feature[]] => {
	const [features, setFeatures] = useState<Feature[]>([]);
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
		const loadingSubscription = gisFacade.selectLoadingFeatures(layerId).subscribe(setLoading);

		return () => {
			subscription.unsubscribe();
			loadingSubscription.unsubscribe();
		};
	}, [layerId]);

	return [loading, features];
};

export default useFeatures;
