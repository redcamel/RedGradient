import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";
import DataRedGradientLayerGroup from "../../../../../../data/DataRedGradientLayerGroup.js";

/**
 * addGroup
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_addGroup = {
	description: {
		key: 'addGroup',
		label: 'Add Group',
		icon: faFolderPlus
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const groupList = HELPER_GET_DATA.getActiveViewGroupList(newData)
		groupList.reverse()
		groupList.push(payload || new DataRedGradientLayerGroup())
		groupList.reverse()
		return pushHistory(action, newData, true)
	}
}
export default cmd_addGroup