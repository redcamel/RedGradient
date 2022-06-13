import {faSort} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";
import ConstUnitPxPercent from "../../../../../../../data/const/ConstUnitPxPercent";

/**
 * sort stepInfo  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_sortLayerStepInfo = {
	description: {
		key: 'sortLayerStepInfo',
		label: 'Sort StepInfo',
		icon: faSort
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const {borderGradientMode} = payload
		const layerGroupInfo = borderGradientMode ? HELPER_GET_DATA.getActiveViewInfo(newData).containerInfo.borderInfo.borderGradientInfo : HELPER_GET_DATA.getActiveLayerGroupInfo(newData)
		const activeLayerInfo = borderGradientMode ? layerGroupInfo : layerGroupInfo['groupList'][payload.groupIndex]['children'][payload.groupLayerIndex]
		const info = activeLayerInfo['timeline'][payload.time]
		const {stepInfoList} = info
		const {layerSizeW} = HELPER_GET_DATA.calcLayerPixelSize(newData, activeLayerInfo, 0)
		stepInfoList.sort((a, b) => {
			a = a['start']['stopUnit'] === ConstUnitPxPercent.PERCENT ? a['start']['stop'] : (a['start']['stop'] / layerSizeW * 100)
			b = b['start']['stopUnit'] === ConstUnitPxPercent.PERCENT ? b['start']['stop'] : (b['start']['stop'] / layerSizeW * 100)
			if (a < b) return -1
			if (a > b) return 1
			return 0
		});

		return pushHistory(action, newData, true)
	}
}
export default cmd_sortLayerStepInfo