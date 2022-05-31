import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * cmd_dropLayer
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_dropLayer = {
	description: {
		key: 'dropLayer',
		label: 'Drop Layer',
		icon: faExchangeAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const {startGroupIndex, targetGroupIndex, startLayerIndex, targetLayerIndex} = payload
		const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const groupList = layerGroupInfo['groupList']
		const startGroupChildren = groupList[startGroupIndex]['children']
		const targetGroupChildren = groupList[targetGroupIndex]['children']
		const startItem = startGroupChildren[startLayerIndex]
		const targetItem = targetGroupChildren[targetLayerIndex]

		if (startGroupIndex === targetGroupIndex) {
			// startGroupChildren[startLayerIndex] = targetItem
			// targetGroupChildren[targetLayerIndex] = startItem
			const newDropIDX = startGroupChildren.indexOf(targetItem)
			startGroupChildren.splice(startLayerIndex, 1)
			startGroupChildren.splice(newDropIDX, 0, startItem)

		} else {
			startGroupChildren.splice(startLayerIndex, 1)
			targetGroupChildren.splice(targetLayerIndex, 1, startItem, targetItem)
		}

		layerGroupInfo['activeGroupIndex'] = targetGroupIndex
		layerGroupInfo['activeGroupLayerIndex'] = targetLayerIndex
		return pushHistory(action, newData, true)
	}
}
export default cmd_dropLayer