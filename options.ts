export default {
	nitro: {
		compressPublicAssets: {
			brotli: true,
			gzip: true
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
