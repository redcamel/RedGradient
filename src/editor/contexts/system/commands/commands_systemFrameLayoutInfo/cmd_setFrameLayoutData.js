/**
 * 대상프레임의 해당뷰를 설정한다.
 * @type {{description: {key: string}, execute: (function(*, *, *): *)}}
 */
import {faWindowMaximize} from "@fortawesome/free-solid-svg-icons";

const cmd_setFrameLayoutData = {
	description: {
		key: 'setFrameLayoutData',
		icon: faWindowMaximize
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, index, layoutKey, value} = payload
		const newData = {
			...state
		}
		newData.systemFrameLayoutInfo[layoutKey].viewList[index] = value
		action.label = `${layoutKey} Layout[${index}] - target Container : ${value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_setFrameLayoutData