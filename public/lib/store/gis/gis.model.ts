import { Feature, Layer } from '../../services/gis';

export interface GisState {
	layers: Layer[];
	loadingLayers: boolean;
	features: Feature[];
	loadingFeatures: Record<string, boolean>;
	featureLayerIds: string[];
}

export const createInitialState = (): GisState => ({
	layers: [],
	loadingLayers: false,
	features: [],
	loadingFeatures: {},
	featureLayerIds: [],
});
