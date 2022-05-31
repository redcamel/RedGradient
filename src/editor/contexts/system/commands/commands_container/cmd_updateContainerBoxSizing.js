import {faBox} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 박스사이징 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateContainerBoxSizing = {
	description: {
		key: 'updateContainerBoxSizing',
		label: 'Container BoxSizing Change',
		icon: faBox
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['containerInfo']['boxSizing'] = payload.value
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateContainerBoxSizing