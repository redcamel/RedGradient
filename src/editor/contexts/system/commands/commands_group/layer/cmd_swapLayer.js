import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * swapLayer
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_swapLayer = {
	description: {
		key: 'swapLayer',
		label: 'Swap Layer',
		icon: faExchangeAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const {startGroupIndex, targetGroupIndex, startLayerIndex, targetLayerIndex} = payload
		const layerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(newData)
		const groupList = layerGroupInfo['groupList']
		const startGroupChildren = groupList[startGroupIndex]['children']
		const targetGroupChildren = groupList[targetGroupIndex]['children']
		const startItem = startGroupChildren[startLayerIndex]
		const targetItem = targetGroupChildren[targetLayerIndex]
		if (startGroupIndex === targetGroupIndex) {
			startGroupChildren[startLayerIndex] = targetItem
			targetGroupChildren[targetLayerIndex] = startItem
		} else {
			startGroupChildren.splice(startLayerIndex, 1)
			targetGroupChildren.splice(targetLayerIndex, 1, startItem, targetItem)
		}

		layerGroupInfo['activeGroupIndex'] = targetGroupIndex
		layerGroupInfo['activeGroupLayerIndex'] = targetLayerIndex
		return pushHistory(action, newData, true)
	}
}
export default cmd_swapLayer