import ky from 'ky';

export type KyInstance = typeof ky;

// Create ky instance with defaults
const api: KyInstance = ky.create({
	timeout: false,
});

export default api;
