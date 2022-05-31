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
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const filterData = newData.canvasInfo[payload.viewKey]['containerInfo']['filterInfo'][payload.idx]
		filterData['setting'][payload.key] = payload.value
		action.label = `Filter ${filterData.type} - ${payload.key} Update : ${payload.value}`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateContainerFilterSettingByKey