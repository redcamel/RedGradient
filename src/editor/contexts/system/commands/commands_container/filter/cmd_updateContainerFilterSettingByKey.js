import {faFill} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 AmountFilter 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerFilterSettingByKey = {
	description: {
		key: 'updateContainerFilterSettingByKey',
		label: 'Filter Update',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {value, viewKey, key, idx, saveHistoryYn} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const filterData = newData.canvasInfo[viewKey]['containerInfo']['filterInfo'][idx]
		filterData['setting'][key] = value
		action.label = `${viewKey} ${filterData.type}Filter ${key} : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateContainerFilterSettingByKey