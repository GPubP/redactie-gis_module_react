import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { Feature } from '../../services/gis';

import { GisState } from './gis.model';
import { GisStore, gisStore } from './gis.store';

export class GisQuery extends Query<GisState> {
	constructor(protected store: GisStore) {
		super(store);
	}

	public loadingLayers$ = this.select(state => state.loadingLayers);
	public layers$ = this.select(state => state.layers);

	public hasLayers(): boolean {
		const state = this.getValue();
		return state.layers.length > 0;
	}

	public selectLoadingFeatures(layerId: string): Observable<boolean> {
		return this.select(state => !!state.loadingFeatures[layerId]);
	}

	public hasFeaturesFromLayer(layerId: string): boolean {
		const state = this.getValue();
		return state.featureLayerIds.includes(layerId);
	}

	public selectFeaturesByLayerId(layerId: string): Observable<Feature[]> {
		return this.select(state => state.features.filter(feature => feature.layerId === layerId));
	}
}

export const gisQuery = new GisQuery(gisStore);
