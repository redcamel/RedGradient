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
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const {containerInfo} = HELPER_GET_DATA.getTargetViewInfo(newData)
		const {filterInfo} = containerInfo
		const duplicateData = JSON.parse(JSON.stringify(filterInfo[payload.target_filterIndex]))
		filterInfo.splice(payload.target_filterIndex, 0, duplicateData)
		action.label = `Remove Duplicate - ${duplicateData.type}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_duplicateFilter