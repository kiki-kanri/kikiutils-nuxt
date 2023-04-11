<template>
	<div class="m-3 p-3 bg-white rounded-10px">
		<h4 class="text-center">{{ pageTitle }}</h4>
		<div class="m-n1 d-flex justify-content-center">
			<slot name="btns-before"></slot>
			<el-button class="m-1" @click="openDialog(null)" v-if="!hideAddDataBtn">
				{{ addBtnText }}
			</el-button>
			<el-button class="m-1" :disabled="loadingTable" @click="loadData">
				{{ reloadDataBtnText }}
			</el-button>
			<slot name="btns-after"></slot>
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
			:open-dialog="openDialog"
			v-loading="loadingTable"
		>
			<slot name="table"></slot>
			<template #table-action>
				<slot name="table-action"></slot>
			</template>
			<template #table-action-area="{ scope: s }">
				<slot
					name="table-action-area"
					:$index="s.$index"
					:cell-index="s.cellIndex"
					:column="s.column"
					:expanded="s.expanded"
					:row="s.row"
					:store="s.store"
					:_self="s._self"
				></slot>
			</template>
		</base-table>
		<base-dialog
			:click-close="!saveState.loading"
			:dialog="dialog"
			:esc-close="!saveState.loading"
			:loading-text="savingText"
			:save-state="saveState"
		>
			<base-form
				:dialog="dialog"
				:form-data="formData"
				:model="formData"
				:rules="formRules"
				:save-function="saveData"
			>
				<slot name="form"></slot>
			</base-form>
		</base-dialog>
		<slot></slot>
	</div>
</template>

<script setup>

	import { computed, onMounted, reactive, ref } from 'vue';
	import { propBooleanFalse, propReactiveDict, propString } from '../../../composables/props';
	import { getLoadingStateDict, updateList } from '../../../composables/public';
	import { successMessage } from '../../composables/message';
	import { getPageBaseVariables } from '../../composables/public';

	// Props and emits
	const props = defineProps({
		addBtnText: String,
		apiController: Object,
		axiosSaveConfig: propReactiveDict,
		beforeSave: Function,
		dialog: {
			type: Object,
			default() {
				return reactive({
					edit: false,
					show: false
				});
			}
		},
		dialogTitle: String,
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
		saveUseFormData: propBooleanFalse,
		tableMaxHeight: String
	});

	// Variables
	const {
		loadDataInterval,
		loadingTable,
		paginationParams,
		tableData,
		timerSec,
		totalCount
	} = getPageBaseVariables();

	props.dialog.title = props.dialogTitle;
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
		let { status } = await props.apiController.delete(row.id);
		if (status === 200) successMessage('刪除成功！');
		await loadData();
	}

	async function loadData() {
		loadingTable.value = true;
		timerSec.value = 60;
		let { data } = await props.apiController.getList({
			...props.filterParams,
			...paginationParams
		});

		totalCount.value = data.count;
		updateList(data.data, tableData);
		loadingTable.value = false;
		if (loadDataInterval.value) return;
		loadDataInterval.value = setInterval(async () => {
			timerSec.value -= 1;
			if (timerSec.value <= 0) await loadData();
		}, 1000);
	}

	function openDialog(row) {
		Object.assign(props.formData, row || defaultFormData);
		props.dialog.edit = row !== null;
		props.dialog.show = true;
	}

	async function saveData(formEl) {
		if (props.beforeSave && !props.beforeSave()) return;
		if (saveState.loading) return;
		await formEl.validate(async (valid, fields) => {
			if (!valid) return;
			saveState.loading = true;
			let response = await props.apiController.save({...props.formData}, props.saveUseFormData, props.axiosSaveConfig);
			saveState.clear();
			if (response.status !== 200) return saveState.error = true;
			successMessage('儲存成功！');
			props.dialog.show = saveState.loading = false;
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
