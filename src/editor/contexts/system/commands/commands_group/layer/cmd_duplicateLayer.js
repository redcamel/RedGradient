import {faCopy} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * duplicateLayer
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_duplicateLayer = {
	description: {
		key: 'duplicateLayer',
		label: 'Duplicate Layer',
		icon: faCopy
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {groupIndex, groupLayerIndex} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const children = layerGroupInfo['groupList'][groupIndex]['children']
		const originData = children[groupLayerIndex]
		const duplicateData = JSON.parse(JSON.stringify(originData))
		duplicateData['label'] = `Copy_${duplicateData['label']}`
		children.splice(groupLayerIndex, 0, duplicateData)
		action.label = `Duplicate Layer : ${originData['label']}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_duplicateLayer