import {faFolder, faFont, faGear} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * Layer 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateLayerByKey = {
	description: {
		key: 'updateLayerByKey',
		label: 'Layer Update',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		layerGroupInfo['groupList'][payload.groupIndex]['children'][payload.groupLayerIndex][payload.key] = payload.value
		action.label = `Layer Update ${payload.key} : ${payload.value}`
		switch (payload.key) {
			case 'label' :
				action.icon = faFont
				break
			case 'type' :
				action.icon = faGear
				break
			default :
				action.icon = faFolder
		}
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateLayerByKey