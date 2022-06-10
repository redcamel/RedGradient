import {
	faArrowsUpDownLeftRight,
	faExpand,
	faFolder,
	faLink,
	faLinkSlash,
	faRotate,
	faTag
} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * Layer ValueInfo업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateLayerValueInfoByKey = {
	description: {
		key: 'updateLayerValueInfoByKey',
		label: 'Layer ValueInfo Update',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		// console.log(payload)
		const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const payloads = payload instanceof Array ? payload : [payload]
		payloads.forEach(payload => {
			// console.log(payload)
			const info = layerGroupInfo['groupList'][payload.groupIndex]['children'][payload.groupLayerIndex]['timeline'][payload.time]
			// console.log(info)
			info[payload.targetInfoKey][payload.key] = payload.value
			action.label = `Layer ValueInfo Update ${payload.key} : ${JSON.stringify(payload.value)}`
			switch (payload.key) {
				case 'label' :
					action.icon = faTag
					break
				case 'useFixedRatio' :
					action.icon = payload.value ? faLink : faLinkSlash
					break
				case 'width' :
				case 'height' :
					action.icon = faExpand
					break
				case 'x' :
				case 'y' :
					action.icon = faArrowsUpDownLeftRight
					break
				case 'angle' :
					action.icon = faRotate
					break
				default :
					action.icon = faFolder
			}
			pushHistory(action, newData, payload.saveHistoryYn)
		})
		const needSave = payload.saveHistoryYn
		if (needSave) pushHistory(action, newData, needSave)
		return newData
	}
}
export default cmd_updateLayerValueInfoByKey