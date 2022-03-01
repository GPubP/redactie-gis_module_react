export enum GeometryTypes {
	POINT = 'esriGeometryPoint',
}

export interface Layer {
	id: number;
	name: string;
	parentLayerId: number;
	defaultVisibility: boolean;
	subLayerIds: unknown;
	minScale: number;
	maxScale: number;
	geometryType: GeometryTypes.POINT;
}

export interface LayersResponse {
	layers: Layer[];
}

export interface Feature extends FeatureResponse {
	layerId: string;
}

export interface FeatureResponse {
	type: string;
	id: number;
	geometry: {
		x: number;
		y: number;
	};
	attributes: {
		OBJECTID: number;
		GISID: string;
		PLANONID: string;
		ID: string;
		naam: string;
		NAAM: string;
		straat: string;
		huisnr: string;
		postcode: string;
		LINK: string;
		Email: string;
		Telefoon: string;
		DISTRICT: string;
	};
}

export interface LayerFieldResponse {
	name: string;
	type: string;
	alias: string;
	sqlType: string;
	domain: string;
	defaultValue: string;
}

export interface LayerField extends LayerFieldResponse {
	layerId: string;
}

export interface FeaturesResponse {
	features: FeatureResponse[];
	fields: LayerFieldResponse[];
}
