import { reactive, ref } from 'vue';

export const getPageBaseVariables = () => {
	return {
		loadDataInterval: ref(null),
		loadingTable: ref(true),
		paginationParams: reactive({
			limit: 10,
			page: 1
		}),
		tableData: reactive([]),
		timerSec: ref(60),
		totalCount: ref(0)
	}
}
