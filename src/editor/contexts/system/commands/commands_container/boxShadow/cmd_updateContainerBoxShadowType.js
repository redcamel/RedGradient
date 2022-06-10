import {faSun} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 box-shadow Type 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerBoxShadowType = {
	description: {
		key: 'updateContainerBoxShadowType',
		label: 'Container BoxShadow Change',
		icon: faSun
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, value} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[viewKey]['containerInfo']['boxShadowInfo']['type'] = value
		action.label = `${viewKey} Container BoxShadow : ${value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateContainerBoxShadowType