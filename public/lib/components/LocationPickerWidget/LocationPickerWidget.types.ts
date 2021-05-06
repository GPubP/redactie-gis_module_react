export interface LocationPickerWidgetProps {
	branding?: 'antwerp' | 'acpaas' | 'digipolis';
	initialLocation?: LocationPickerInitialLocation;
	featureLayers?: LocationPickerFeatureLayer[];
	locateUserOnInit?: boolean;
	locationLayers?: [];
	prioritizeLayers?: string[];
	onLocationSelect?: (location: LocationPickerLocation) => void;
}

// Types found here:
// https://github.com/digipolisantwerp/location-picker_widget_angular/tree/master/projects/ngx-location-picker/src/lib/types

export interface LocationPickerInitialLocation {
	label?: string;
	position?: {
		lat: number;
		lng: number;
	};
	options?: {
		triggerSearch?: boolean;
	};
}

export interface LocationPickerFeatureLayer {
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
export interface LocationPickerLocation {
	loaction: any;
}
