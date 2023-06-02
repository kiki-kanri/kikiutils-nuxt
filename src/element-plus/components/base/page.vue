<template>
	<Head>
		<Title>{{ pageTitle }}</Title>
	</Head>
	<div class="m-3 p-3 bg-white rounded-10px">
		<h4 class="text-center">{{ pageTitle }}</h4>
		<div class="m-n1 d-flex justify-content-center">
			<slot name="before-btns"></slot>
			<el-button class="m-1" @click="openDialog(null)" v-if="!hideAddDataBtn">{{ addDataBtnText }}</el-button>
			<el-button class="m-1" :disabled="loadingTable" @click="loadData">{{ reloadDataBtnText }}</el-button>
			<slot name="after-btns"></slot>
		</div>
		<slot name="before-table"></slot>
		<base-table-pagination
			class="mt-3"
			:load-data-function="loadData"
			:loading="loadingTable"
			:params="paginationParams"
			:total="totalCount"
			v-if="!hidePagination"
		/>
		<base-table
			class="mt-3"
			:data="tableData"
			:delete-function="deleteData"
			:hide-action="hideTableAction"
			:hide-delete-btn="hideDeleteBtn"
			:hide-edit-btn="hideEditBtn"
			:max-height="tableMaxHeight"
			:open-dialog-function="openDialog"
			v-loading="loadingTable"
		>
			<slot name="table"></slot>
			<template #before-table-action="{ scope: bsc }">
				<slot
					name="before-table-action"
					:_self="bsc._self"
					:$index="bsc.$index"
					:cell-index="bsc.cellIndex"
					:column="bsc.column"
					:expanded="bsc.expanded"
					:row="bsc.row"
					:store="bsc.store"
				></slot>
			</template>
			<template #after-table-action="{ scope: asc }">
				<slot
					name="after-table-action"
					:_self="asc._self"
					:$index="asc.$index"
					:cell-index="asc.cellIndex"
					:column="asc.column"
					:expanded="asc.expanded"
					:row="asc.row"
					:store="asc.store"
				></slot>
			</template>
		</base-table>
		<base-dialog
			:click-close="!saveState.loading"
			:dialog="dialog"
			:esc-close="!saveState.loading"
			:loading-text="savingText"
			:title-prefix="dialogTitlePrefix"
			:save-state="saveState"
		>
			<base-form :model="formData" :rules="formRules" :save-function="saveData">
				<slot name="form"></slot>
			</base-form>
		</base-dialog>
		<slot></slot>
	</div>
</template>

<script setup>

	import { computed, onMounted, reactive } from 'vue';

	import { propBooleanFalse, propReactiveDict, propString } from '../../../composables/props';
	import { getLoadingStateDict, updateList } from '../../../composables/public';
	import { successMessage } from '../../composables/message';
	import { getPageBaseVariables } from '../../composables/public';

	// Props
	const props = defineProps({
		addDataBtnText: String,
		apiController: Object,
		beforeSave: Function,
		dialog: {
			type: Object,
			default() {
				return reactive({
					isEdit: false,
					show: false
				});
			}
		},
		dialogTitlePrefix: String,
		disableAutoReloadData: propBooleanFalse,
		filterParams: propReactiveDict,
		formData: propReactiveDict,
		formRules: propReactiveDict,
		hideAddDataBtn: propBooleanFalse,
		hideDeleteBtn: propBooleanFalse,
		hideEditBtn: propBooleanFalse,
		hidePagination: propBooleanFalse,
		hideTableAction: propBooleanFalse,
		pageTitle: String,
		savingText: propString('儲存中...'),
		tableMaxHeight: String
	});

	// Variables
	const { loadDataInterval, loadingTable, paginationParams, tableData, timerSec, totalCount } = getPageBaseVariables();
	const defaultFormData = reactive({...props.formData});
	const reloadDataBtnText = computed(() => {
		return '更新資料' + (props.disableAutoReloadData ? '' : `(${timerSec.value})`);
	});

	const saveState = getLoadingStateDict();

	// Mounted
	onMounted(loadData);

	// Functions
	async function deleteData(row) {
		loadingTable.value = true;
		const { status } = await props.apiController.delete(row.id);
		if (status === 200) successMessage('刪除成功！');
		await loadData();
	}

	async function loadData() {
		loadingTable.value = true;
		timerSec.value = 60;
		const { data } = await props.apiController.getList({
			...props.filterParams,
			...paginationParams
		});

		totalCount.value = data.count;
		updateList(data.data, tableData);
		loadingTable.value = false;
		if (loadDataInterval.value || props.disableAutoReloadData) return;
		loadDataInterval.value = setInterval(async () => {
			timerSec.value -= 1;
			if (timerSec.value <= 0) await loadData();
		}, 1000);
	}

	function openDialog(row) {
		Object.assign(props.formData, row || defaultFormData);
		props.dialog.isEdit = row !== null;
		props.dialog.show = true;
	}

	async function saveData(formEl) {
		if (saveState.loading) return;
		await formEl.validate(async (valid, fields) => {
			if (!valid) return;
			if (props.beforeSave && !await props.beforeSave()) return;
			saveState.loading = true;
			const response = await props.apiController.save({...props.formData}, props.saveUseFormData, props.axiosSaveConfig);
			saveState.clear();
			if (response.status !== 200) return saveState.error = true;
			props.dialog.show = false;
			successMessage('儲存成功！');
			await loadData();
		});
	}

	// Expose
	defineExpose({
		deleteData,
		loadData,
		loadingTable,
		openDialog,
		tableData
	});

</script>
