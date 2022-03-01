import { Feature, Layer, LayerField } from '../../services/gis';

export interface GisState {
	layers: Layer[];
	loadingLayers: boolean;
	features: Feature[];
	layerFields: LayerField[];
	loadingFeatures: Record<string, boolean>;
	featureLayerIds: string[];
}

export const createInitialState = (): GisState => ({
	layers: [],
	loadingLayers: false,
	features: [],
	layerFields: [],
	loadingFeatures: {},
	featureLayerIds: [],
});
