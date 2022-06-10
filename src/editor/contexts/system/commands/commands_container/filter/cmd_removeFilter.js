import {faTrash} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * 컨테이너 필터 제거
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_removeFilter = {
	description: {
		key: 'removeFilter',
		label: 'Remove Filter',
		icon: faTrash
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const targetViewInfo = HELPER_GET_DATA.getTargetViewInfo(newData)
		const {containerInfo} = targetViewInfo
		const {filterInfo} = containerInfo
		const trash = filterInfo[payload.target_filterIndex]
		filterInfo.splice(payload.target_filterIndex, 1)
		action.label = `${targetViewInfo['viewKey']} Remove Filter : ${trash?.type}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_removeFilter