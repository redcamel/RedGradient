import {faTrash} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * removeGroup
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_removeGroup = {
	description: {
		key: 'removeGroup',
		label: 'Remove Group',
		icon: faTrash
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const groupList = layerGroupInfo['groupList']
		if (groupList.length) {
			const deleteData = groupList.splice(payload.groupIndex, 1)[0]
			if (!groupList[layerGroupInfo['activeGroupIndex']]) {
				layerGroupInfo['activeGroupIndex'] = 0
				layerGroupInfo['activeGroupLayerIndex'] = 0
			}
			action.label = `Remove Group : ${deleteData['label']}`
			return pushHistory(action, newData, true)
		} else {
			return state
		}
	}
}
export default cmd_removeGroup