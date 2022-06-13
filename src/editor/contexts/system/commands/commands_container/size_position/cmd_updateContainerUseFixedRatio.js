import {faLink} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA";

/**
 * 컨테이너 사이즈 고정비율 사용 유무 설정
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_updateContainerUseFixedRatio = {
	description: {
		key: 'updateContainerUseFixedRatio',
		label: 'Container Fixed Ratio Change',
		icon: faLink
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, saveHistoryYn, value} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.canvasInfo[viewKey]['containerInfo']['sizeInfo']['useFixedRatio'] = value
		action.label = `${viewKey} Container Fixed Ratio : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateContainerUseFixedRatio