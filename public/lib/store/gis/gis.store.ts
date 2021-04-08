import { Store, StoreConfig } from '@datorama/akita';

import { createInitialState, GisState } from './gis.model';

@StoreConfig({ name: 'gis' })
export class GisStore extends Store<GisState> {
	constructor() {
		super(createInitialState());
	}

	public setLoadingLayers(loading: boolean): void {
		this.update(() => ({
			loadingLayers: loading,
		}));
	}

	public setLoadingFeatures(layerId: string, loading: boolean): void {
		this.update(state => ({
			loadingFeatures: {
				...(state.loadingFeatures || {}),
				[layerId]: loading,
			},
		}));
	}
}

export const gisStore = new GisStore();
