import {faFolder, faSliders} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";


/**
 * updateBorderGradientValueInfoByKey
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateBorderGradientValueInfoByKey = {
	description: {
		key: 'updateBorderGradientValueInfoByKey',
		label: 'updateBorderGradientValueInfoByKey Update',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const payloads = payload instanceof Array ? payload : [payload]
		payloads.forEach(payload => {
			const info = HELPER_GET_DATA.getTargetViewInfo(newData).containerInfo['borderInfo']['borderGradientInfo']['timeline'][payload.time]
			info['valueInfo'][payload.key] = payload.value
			action.label = `Border Gradient Update ${payload.targetInfo} ${payload.key} : ${payload.value}`
			switch (payload.key) {
				case 'stop' :
					action.icon = faSliders
					break
				default :
					action.icon = faFolder
			}
			pushHistory(action, newData, payload.saveHistoryYn)
		})

		return newData
	}
}
export default cmd_updateBorderGradientValueInfoByKey