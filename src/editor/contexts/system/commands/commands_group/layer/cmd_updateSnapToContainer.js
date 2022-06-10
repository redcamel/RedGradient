import {faMagnet} from "@fortawesome/free-solid-svg-icons";

/**
 * updateSnapToContainer
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateSnapToContainer = {
	description: {
		key: 'updateSnapToContainer',
		label: 'snapToContainer',
		icon: faMagnet
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, value} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData['snapToContainer'] = value
		action.label = `${viewKey} Snap To Container : ${value.toString()}`

		return pushHistory(action, newData, true)
	}
}
export default cmd_updateSnapToContainer