import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * removeLayer
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_removeLayer = {
	description: {
		key: 'removeLayer',
		label: 'Remove Layer',
		icon: faTrashAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const layerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(newData)
		const groupList = layerGroupInfo['groupList']
		const targetGroup = groupList[payload.groupIndex]
		const deleteData = targetGroup['children'].splice(payload.groupLayerIndex, 1)[0]
		if (!targetGroup['children'][payload.groupLayerIndex]) {
			layerGroupInfo['activeGroupLayerIndex'] = 0
		}
		action.label = `Remove Layer(${deleteData['label']}) at ${targetGroup.label} Group`

		return pushHistory(action, newData, true)
	}
}
export default cmd_removeLayer