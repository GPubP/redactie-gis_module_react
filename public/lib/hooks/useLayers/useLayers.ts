import { useDidMount, useObservable } from '@redactie/utils';

import { Layer } from '../../services/gis';
import { gisFacade } from '../../store/gis';

const useLayers = (): [boolean, Layer[]] => {
	const layers = useObservable(gisFacade.layers$, []);
	const loading = useObservable(gisFacade.loadingLayers$, true);

	useDidMount(() => {
		if (!gisFacade.hasLayers()) {
			gisFacade.getLayers();
		}
	});

	return [loading, layers];
};

export default useLayers;
