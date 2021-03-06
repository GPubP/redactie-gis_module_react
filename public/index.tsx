import { GisAddress, GisAddressView, GisReference } from './lib/components';
import { formRendererConnector } from './lib/connectors';

formRendererConnector.api.fieldRegistry.add([
	{
		name: 'gisReference',
		module: 'gis',
		component: GisReference,
	},
	{
		name: 'gisAddress',
		module: 'gis',
		component: GisAddress,
		viewComponent: GisAddressView,
	},
]);
