import {faBorderStyle, faSliders} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";


/**
 * updateBorderGradientValueInfoByKey
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateBorderGradientValueInfoByKey = {
	description: {
		key: 'updateBorderGradientValueInfoByKey',
		label: 'updateBorderGradientValueInfoByKey Update',
		icon: faBorderStyle
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const payloads = payload instanceof Array ? payload : [payload]
		const targetViewInfo = HELPER_GET_DATA.getActiveViewInfo(newData)
		payloads.forEach(payload => {
			const info = targetViewInfo.containerInfo['borderInfo']['borderGradientInfo']['timeline'][payload.time]
			info['valueInfo'][payload.key] = payload.value
			action.label = `${targetViewInfo['viewKey']} Border Gradient ${payload.key} : ${JSON.stringify(payload.value)}`
			switch (payload.key) {
				case 'stop' :
					action.icon = faSliders
					break
				default :
					action.icon = faBorderStyle
			}
			pushHistory(action, newData, payload.saveHistoryYn)
		})

		return newData
	}
}
export default cmd_updateBorderGradientValueInfoByKey