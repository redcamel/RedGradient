import {faBox} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

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
		const {viewKey, value} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.canvasInfo[viewKey]['containerInfo']['boxSizing'] = value
		action.label = `${viewKey} Container BoxSizing : ${value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateContainerBoxSizing