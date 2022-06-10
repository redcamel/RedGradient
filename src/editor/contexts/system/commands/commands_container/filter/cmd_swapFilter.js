import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * 컨테이너 필터 순서 swap
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_swapFilter = {
	description: {
		key: 'swapFilter',
		label: 'Swap Filter',
		icon: faExchangeAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}

		const targetViewInfo = HELPER_GET_DATA.getTargetViewInfo(newData)
		const {containerInfo} = targetViewInfo
		const {filterInfo} = containerInfo
		const targetItem = filterInfo[payload.target_filterIndex]
		const destinationItem = filterInfo[payload.destination_filterIndex]
		filterInfo[payload.destination_filterIndex] = targetItem
		filterInfo[payload.target_filterIndex] = destinationItem

		action.label = `${targetViewInfo['viewKey']} Swap Filter : ${targetItem.type} <=> ${destinationItem.type}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_swapFilter