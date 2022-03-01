import { api } from '../api';

import { FeaturesResponse, LayersResponse } from './gis.service.types';

export class GisApiService {
	private readonly baseUrl =
		'https://services.arcgis.com/1KSVSmnHT2Lw9ea6/ArcGIS/rest/services/AntwerpenBe/FeatureServer';

	public async getLayers(): Promise<LayersResponse> {
		return await api.get(`${this.baseUrl}?f=pjson`).json();
	}

	public async getFeatures(layerId: string): Promise<FeaturesResponse> {
		return await api
			.get(
				`${this.baseUrl}/${layerId}/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`
			)
			.json();
	}
}

export const gisApiService = new GisApiService();
