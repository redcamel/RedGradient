import {faFolder, faFont} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * Group 업데이트
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
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const targetGroup = layerGroupInfo['groupList'][payload.groupIndex === undefined ? layerGroupInfo.activeGroupIndex : payload.groupIndex]
		targetGroup[payload.key] = payload.value
		action.label = `Group Update ${payload.key} : ${payload.value}`
		switch (payload.key) {
			case 'label' :
				action.icon = faFont
				break
			default :
				action.icon = faFolder
		}
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateGroupByKey