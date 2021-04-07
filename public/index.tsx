import { GisReference } from './lib/components';
import { formRendererConnector } from './lib/connectors';

formRendererConnector.api.fieldRegistry.add([
	{
		name: 'gisReference',
		module: 'gis',
		component: GisReference,
	},
]);
