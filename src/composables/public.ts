// Data process
export const updateList = (data: any[], dataList: any[]) => {
	dataList.splice(0, dataList.length);
	dataList.push(...data);
}

// State dict
export const getLoadingStateDict = () => {
	return reactive({
		error: false,
		loading: false,
		success: false,
		clear() {
			setTimeout(() => {
				this.error = this.loading = this.success = false;
			}, 1000);
		}
	});
}
