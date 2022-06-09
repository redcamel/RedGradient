import {faLink} from "@fortawesome/free-solid-svg-icons";

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
		const {viewKey, saveHistoryYn} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['containerInfo']['sizeInfo']['useFixedRatio'] = payload.value
		action.label = `${viewKey} Container Fixed Ratio Change`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateContainerUseFixedRatio