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
		const {groupIndex, groupLayerIndex, key, value, saveHistoryYn} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const layerData = layerGroupInfo['groupList'][groupIndex]['children'][groupLayerIndex]
		layerData[key] = value
		action.label = `Layer (${layerData['label']}) ${key === 'previewBackgroundType' ? 'bgColor of preview' : key} : ${value}`
		switch (key) {
			case 'label' :
				action.icon = faFont
				action.label = `Layer ${key} : ${value}`
				break
			case 'type' :
				action.icon = faGear
				break
			default :
				action.icon = faFolder
		}
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateLayerByKey