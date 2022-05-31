import {faBox} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 box-shadow Color 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerBoxShadowByKey = {
	description: {
		key: 'updateContainerBoxShadowColor',
		label: 'Container BoxShadow Color Change',
		icon: faBox
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['containerInfo']['boxShadowInfo']['color'] = payload.value
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateContainerBoxShadowByKey