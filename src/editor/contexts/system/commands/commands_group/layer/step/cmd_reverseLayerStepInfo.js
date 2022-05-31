import {faFolder} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";
import ConstGradientStepMode from "../../../../../../../data/const/ConstGradientStepMode";
import ConstUnitPxPercent from "../../../../../../../data/const/ConstUnitPxPercent";

/**
 * reverse stepInfo 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_reverseLayerStepInfo = {
	description: {
		key: 'reverseLayerStepInfo',
		label: 'Reverse StepInfo',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const {borderGradientMode} = payload
		const layerGroupInfo = borderGradientMode ? HELPER_GET_DATA.getTargetViewInfo(newData).containerInfo.borderInfo.borderGradientInfo : HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const activeLayerInfo = borderGradientMode ? layerGroupInfo : layerGroupInfo['groupList'][payload.groupIndex]['children'][payload.groupLayerIndex]
		const info = activeLayerInfo['timeline'][payload.time]

		const {stepInfoList} = info
		const {layerSizeW, layerSizeH} = HELPER_GET_DATA.calcLayerPixelSize(newData, activeLayerInfo, 0)
		stepInfoList.reverse();
		stepInfoList.forEach(v => {
			if (v['mode'] === ConstGradientStepMode.RANGE) {
				const temp = v['start']
				v['start'] = v['end']
				v['end'] = temp
			}
			if (v['start']['stopUnit'] === ConstUnitPxPercent.PERCENT) {
				v['start']['stop'] = 100 - v['start']['stop']
			} else {
				v['start']['stop'] = layerSizeW - v['start']['stop']
			}
			if (v['end']['stopUnit'] === ConstUnitPxPercent.PERCENT) {
				v['end']['stop'] = 100 - v['end']['stop']
			} else {
				v['end']['stop'] = layerSizeH - v['end']['stop']
			}

		})
		return pushHistory(action, newData, true)
	}
}
export default cmd_reverseLayerStepInfo