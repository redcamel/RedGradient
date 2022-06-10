import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * 컨테이너 필터 visible 세팅
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_setFilterVisible = {
	description: {
		key: 'setFilterVisible',
		label: 'Filter Visible',
		icon: faEye
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const targetViewInfo = HELPER_GET_DATA.getTargetViewInfo(newData)
		const {containerInfo} = targetViewInfo
		const {filterInfo} = containerInfo
		const filterData = filterInfo[payload.target_filterIndex]
		filterData['visibleYn'] = payload.value
		action.label = `${targetViewInfo['viewKey']}  ${filterData.type} Filter Visible : ${payload.value ? 'On' : 'Off'}`
		action.icon = payload.value ? faEye : faEyeSlash
		return pushHistory(action, newData, true)
	}
}
export default cmd_setFilterVisible