import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";

/**
 * 데이터 로딩
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_loadData = {
	description: {
		key: 'loadData',
		label: 'open',
		icon: faFolderOpen
	},
	execute: (state, action, payload, historyInfo) => {
		const {resetHistory, pushHistory} = historyInfo
		resetHistory()
		const newData = {
			...payload
		}
		return pushHistory(action, newData, true)
	}
}
export default cmd_loadData