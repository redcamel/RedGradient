import {faFolder, faFont} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * Group  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateGroupByKey = {
	description: {
		key: 'updateGroupByKey',
		label: 'Group Update',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {key, value, groupIndex, saveHistoryYn} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		const layerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(newData)
		const targetGroup = layerGroupInfo['groupList'][groupIndex === undefined ? layerGroupInfo.activeGroupIndex : groupIndex]
		targetGroup[key] = value
		action.label = `Group Update ${key} : ${value}`
		switch (key) {
			case 'label' :
				action.icon = faFont
				break
			default :
				action.icon = faFolder
		}
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateGroupByKey