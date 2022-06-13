import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * 컨테이너 필터 복제
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_duplicateFilter = {
	description: {
		key: 'duplicateFilter',
		label: 'Duplicate Filter',
		icon: faExchangeAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const targetViewInfo = HELPER_GET_DATA.getActiveViewInfo(newData)
		const {containerInfo} = targetViewInfo
		const {filterInfo} = containerInfo
		const duplicateData = JSON.parse(JSON.stringify(filterInfo[payload.target_filterIndex]))
		filterInfo.splice(payload.target_filterIndex, 0, duplicateData)
		action.label = `${targetViewInfo['viewKey']} Remove Duplicate : ${duplicateData.type}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_duplicateFilter