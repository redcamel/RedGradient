import {faFolder} from "@fortawesome/free-solid-svg-icons";

/**
 * updateSnapToContainer
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateSnapToContainer = {
	description: {
		key: 'updateSnapToContainer',
		label: 'snapToContainer',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData['snapToContainer'] = payload.value
		action.label = `Snap To Container ${payload.value.toString()}`

		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateSnapToContainer