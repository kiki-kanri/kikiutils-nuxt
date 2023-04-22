import { reactive, ref } from 'vue';

import { copyTextToClipboard }  from '../../composables/text';
import { successMessage }  from './message';

export const copyTextAndShowMessage = (text: string, message: string) => {
	copyTextToClipboard(text);
	successMessage(message);
}

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
