import {faFill} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 backgroundColor 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerBackgroundColor = {
	description: {
		key: 'updateContainerBackgroundColor',
		label: 'Container Background Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['containerInfo']['backgroundColor'] = payload.value
		action.label = `${viewKey} Container Background Change`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateContainerBackgroundColor