import { Observable } from 'rxjs';

import { Feature, GisApiService, gisApiService, LayerField } from '../../services/gis';

import { gisQuery, GisQuery } from './gis.query';
import { gisStore, GisStore } from './gis.store';

export class GisFacade {
	constructor(
		protected store: GisStore,
		protected query: GisQuery,
		protected service: GisApiService
	) {}

	public loadingLayers$ = this.query.loadingLayers$;
	public layers$ = this.query.layers$;

	public hasLayers(): boolean {
		return this.query.hasLayers();
	}

	public selectLoadingFeatures(layerId: string): Observable<boolean> {
		return this.query.selectLoadingFeatures(layerId);
	}

	public getLayers(): void {
		this.store.setLoadingLayers(true);

		this.service
			.getLayers()
			.then(response => {
				if (Array.isArray(response?.layers)) {
					this.store.update(() => ({
						layers: response.layers,
					}));
				}
			})
			.catch(error => this.store.setError(error))
			.finally(() => this.store.setLoadingLayers(false));
	}

	public getFeatures(layerId: string): void {
		if (this.query.hasFeaturesFromLayer(layerId)) {
			return;
		}

		this.store.setLoadingFeatures(layerId, true);

		this.service
			.getFeatures(layerId)
			.then(response => {
				if (Array.isArray(response?.features)) {
					this.store.update(state => ({
						features: [
							...state.features,
							...response.features.map(feature => ({
								...feature,
								layerId,
							})),
						],
						featureLayerIds: [...state.featureLayerIds, layerId],
						layerFields: [
							...state.layerFields,
							...(response.fields || []).map(field => ({
								...field,
								layerId,
							})),
						],
					}));
				}
			})
			.catch(error => this.store.setError(error))
			.finally(() => this.store.setLoadingFeatures(layerId, false));
	}

	public selectFeaturesByLayerId(layerId: string): Observable<Feature[]> {
		return this.query.selectFeaturesByLayerId(layerId);
	}

	public selectLayerFields(layerId: string): Observable<LayerField[]> {
		return this.query.selectLayerFields(layerId);
	}

	public hasFeaturesFromLayer(layerId: string): boolean {
		return this.query.hasFeaturesFromLayer(layerId);
	}
}

export const gisFacade = new GisFacade(gisStore, gisQuery, gisApiService);
