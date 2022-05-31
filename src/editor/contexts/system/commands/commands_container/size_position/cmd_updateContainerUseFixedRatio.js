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
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['containerInfo']['sizeInfo']['useFixedRatio'] = payload.value
		return pushHistory(action, newData)
	}
}
export default cmd_updateContainerUseFixedRatio