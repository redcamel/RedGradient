import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * swapGroup
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_swapGroup = {
	description: {
		key: 'swapGroup',
		label: 'Swap Group',
		icon: faExchangeAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const groupList = layerGroupInfo['groupList']
		const targetItem = groupList[payload.target_groupIndex]
		const destinationItem = groupList[payload.destination_groupIndex]
		groupList[payload.destination_groupIndex] = targetItem
		groupList[payload.target_groupIndex] = destinationItem
		layerGroupInfo['activeGroupIndex'] = payload.destination_groupIndex
		layerGroupInfo['activeGroupLayerIndex'] = 0
		return pushHistory(action, newData, true)
	}
}
export default cmd_swapGroup