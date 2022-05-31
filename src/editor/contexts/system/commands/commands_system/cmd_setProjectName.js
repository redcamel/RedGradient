import {faTag} from "@fortawesome/free-solid-svg-icons";

/**
 * 프로젝트 이름 수정
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: ((function(*, *, *, *): *)|*)}}
 */
const cmd_setProjectName = {
	description: {
		key: 'setProjectName',
		label: 'Edit Project Name',
		icon: faTag
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...state,
			projectName: payload.value
		}
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_setProjectName