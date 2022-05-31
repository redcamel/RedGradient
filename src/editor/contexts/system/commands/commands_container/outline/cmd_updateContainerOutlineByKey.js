import {faBox} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 outline key 베이스로 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerOutlineByKey = {
	description: {
		key: 'updateContainerOutlineByKey',
		label: 'Container Outline Change',
		icon: faBox
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['containerInfo']['outlineInfo'][payload.key] = payload.value
		action.label = `Container Outline ${payload.key} Change`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateContainerOutlineByKey