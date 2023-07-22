export default {
	compression: {
		viteCompression: {
			algorithm: 'gzip',
			filter: /\.(css|html|js|json|mjs|svg)$/i,
			threshold: 513
		}
	},
	purgecss: {
		safelist: {
			deep: [],
			standard: []
		}
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 1024
		},
		optimizeDeps: {
			include: []
		},
		plugins: []
	}
}
