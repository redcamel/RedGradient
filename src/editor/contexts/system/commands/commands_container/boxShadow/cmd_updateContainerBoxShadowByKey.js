import {faSun} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 box-shadow key 베이스로 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerBoxShadowByKey = {
	description: {
		key: 'updateContainerBoxShadowByKey',
		label: 'Container BoxShadow Change',
		icon: faSun
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, key, value, saveHistoryYn} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[viewKey]['containerInfo']['boxShadowInfo'][key] = value
		action.label = `Container BoxShadow ${key} : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateContainerBoxShadowByKey