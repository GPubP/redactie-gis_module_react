export interface LocationPickerWidgetProps {
	branding?: 'antwerp' | 'acpaas' | 'digipolis';
	initialLocation?: InitialLocationModel;
	featureLayers?: FeatureLayerModel[];
	locateUserOnInit?: boolean;
	locationLayers?: string[];
	prioritizeLayers?: string[];
	searchStreetNameForAddress?: boolean;
	onLocationSelect?: (location: AddressModel | CoordinateModel | LocationModel) => void;
}

// Types found here:
// https://github.com/digipolisantwerp/location-picker_widget_angular/tree/master/projects/ngx-location-picker/src/lib/types

export interface InitialLocationModel {
	label?: string;
	position?: {
		lat: number;
		lng: number;
	};
	options?: {
		triggerSearch?: boolean;
	};
}

export interface FeatureLayerModel {
	/* url to the mapServer containing the required features */
	url: string;
	/* icon to visualize the features. */
	icon?: {
		/* font-awesome icon class eg: fa-map-marker */
		iconClass: string;
		/* icon color, default: #0064B */
		color?: string;
		/* icon size in pixels, default: 40px */
		size?: string;
		/* optional icon position */
		position?: {
			top: string;
			left: string;
		};
	};
}

export interface AddressModel {
	id?: number;
	addressRegId?: number;
	crabAddressId?: number;
	crabAddressType?: CrabAddressType;
	formattedAddress?: string;
	label?: string;
	municipalityPost?: {
		nisCode?: string;
		municipality?: string;
		antwerpDistrict?: string;
		antwerpDistrictCode?: string;
		postCode?: number;
	};
	street?: {
		streetNameId?: number;
		streetName?: string;
		homonymAddition?: string;
	};
	houseNumber?: {
		houseNumber?: string;
		busNumber?: string;
	};
	addressPosition?: {
		lambert72?: LambertModel;
		wgs84?: LatLngModel;
		geometryMethod?: string;
	};
	distance?: number;
}

enum CrabAddressType {
	SUB = 'subadres',
	MAIN = 'hoofdadres',
}

export interface LatLngModel {
	lat?: number;
	lng?: number;
}

export interface CoordinateModel {
	id?: string;
	label?: string;
	name?: string;
	/**
	 * Found location (park, poi, ...)
	 */
	location?: LocationModel;
	/**
	 * Found address
	 */
	address?: AddressModel;
	/**
	 * The coordinates used for determining a location or address by reverse lookup.
	 */
	actualLocation?: LatLngModel;
}

export interface LocationModel {
	id?: string;
	name?: string;
	layer?: string;
	streetNameId?: number;
	streetName?: string;
	postCodes?: Array<number>;
	postCode?: number;
	antwerpDistrict?: string;
	municipality?: string;
	label?: string;
	position?: {
		lambert72?: LambertModel;
		wgs84?: LatLngModel;
		geometryMethod?: string;
		geometrySpecification?: string;
		geometryShape?: string;
		geometry?: any;
	};
}

export interface LambertModel {
	x?: number;
	y?: number;
}
