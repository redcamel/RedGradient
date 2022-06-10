import {faSun} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 box-shadow Color 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerBoxShadowColor = {
	description: {
		key: 'updateContainerBoxShadowColor',
		label: 'Container BoxShadow Color Change',
		icon: faSun
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, value, saveHistoryYn} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[viewKey]['containerInfo']['boxShadowInfo']['color'] = value
		action.label = `${viewKey} Container BoxShadow Color : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateContainerBoxShadowColor