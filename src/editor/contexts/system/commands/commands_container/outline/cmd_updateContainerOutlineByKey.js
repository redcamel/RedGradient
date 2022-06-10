/**
 * 컨테이너 outline key 베이스로 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import {faBox} from "@fortawesome/free-solid-svg-icons";


const cmd_updateContainerOutlineByKey = {
	description: {
		key: 'updateContainerOutlineByKey',
		label: 'Container Outline Change',
		icon: faBox
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, key, value, saveHistoryYn} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[viewKey]['containerInfo']['outlineInfo'][key] = value
		action.label = `${viewKey} Container Outline ${key} : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateContainerOutlineByKey