import {faBox} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 box-shadow key 베이스로 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerBoxShadowByKey = {
	description: {
		key: 'updateContainerBoxShadowByKey',
		label: 'Container BoxShadow Change',
		icon: faBox
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['containerInfo']['boxShadowInfo'][payload.key] = payload.value
		action.label = `Container BoxShadow ${payload.key} Change`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateContainerBoxShadowByKey