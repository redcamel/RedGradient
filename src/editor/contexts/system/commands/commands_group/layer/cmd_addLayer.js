import {faFile} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";
import DataRedGradientLayer from "../../../../../../data/DataRedGradientLayer.js";

/**
 * addLayer
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_addLayer = {
	description: {
		key: 'addLayer',
		label: 'Add Layer',
		icon: faFile
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const groupList = HELPER_GET_DATA.getActiveViewGroupList(newData)
		const targetGroup = groupList[payload.groupIndex]
		const children = targetGroup['children']
		children.reverse()
		children.push(new DataRedGradientLayer())
		children.reverse()
		action.label = `Add Layer at ${targetGroup.label} Group`
		return pushHistory(action, newData, true)
	}
}
export default cmd_addLayer