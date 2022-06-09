import {faVectorSquare} from "@fortawesome/free-solid-svg-icons";

/**
 * 컨테이너 사이즈 변경
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_updateContainerSizePosition = {
	description: {
		key: 'updateContainerSizePosition',
		label: 'Container Size & Position Change',
		icon: faVectorSquare
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const {value, viewKey, saveHistoryYn} = payload
		const checkInfo = {}
		value.forEach(v => {
			const {value, targetInfo, key} = v
			checkInfo[key] = true
			newData.canvasInfo[viewKey]['containerInfo'][targetInfo][key] = typeof v.value === 'number' ? +value.toFixed(2) : value
		})
		// TODO - 정확하게 표현되도록 수정
		const t0 = []
		if (checkInfo['widthUnit']) t0.push('W Uint')
		if (checkInfo['heightUnit']) t0.push('H Unit')
		if (checkInfo['xUnit']) t0.push('X Unit')
		if (checkInfo['yUnit']) t0.push('Y Unit')
		if (checkInfo['width'] && checkInfo['height']) t0.push('Size')
		else {
			if (checkInfo['width']) t0.push('Width')
			if (checkInfo['height']) t0.push('Height')
		}
		if (checkInfo['x'] && checkInfo['y']) t0.push('Position')
		else {
			if (checkInfo['x']) t0.push('X')
			if (checkInfo['y']) t0.push('Y')
		}
		action.label = `${viewKey} Container ${t0.length ? t0.join(' & ') : 'Layout'} Change`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateContainerSizePosition