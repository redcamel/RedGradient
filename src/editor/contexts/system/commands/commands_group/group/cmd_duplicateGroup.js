import {faCopy} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * duplicateGroup
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_duplicateGroup = {
	description: {
		key: 'duplicateGroup',
		label: 'Duplicate Group',
		icon: faCopy
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {groupIndex} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		const groupList = HELPER_GET_DATA.getActiveViewGroupList(newData)
		const originData = groupList[groupIndex]
		const duplicateData = JSON.parse(JSON.stringify(originData))
		groupList.splice(groupIndex, 0, duplicateData)
		duplicateData['label'] = `Copy_${duplicateData['label']}`
		action.label = `Duplicate Group : ${originData['label']}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_duplicateGroup