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
		const newData = HELPER_GET_DATA.makeNewState(state)
		const groupList = HELPER_GET_DATA.getActiveViewGroupList(newData)
		const targetGroup = groupList[payload.groupIndex]
		const children = targetGroup['children']
		const newLayerData = new DataRedGradientLayer()
		children.reverse()
		children.push(newLayerData)
		children.reverse()
		action.label = `Add Layer(${newLayerData.label}) at ${targetGroup.label} Group`
		return pushHistory(action, newData, true)
	}
}
export default cmd_addLayer