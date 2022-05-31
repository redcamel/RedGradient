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
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const groupList = HELPER_GET_DATA.getActiveViewGroupList(newData)
		const duplicateData = JSON.parse(JSON.stringify(groupList[payload.groupIndex]))
		groupList.splice(payload.groupIndex, 0, duplicateData)
		duplicateData['label'] = `Copy_${duplicateData['label']}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_duplicateGroup