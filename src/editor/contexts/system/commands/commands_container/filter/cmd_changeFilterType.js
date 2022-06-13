import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";
import ConstFilterType from "../../../../../../data/const/ConstFilterType.js";
import DataFilterAmountFilter from "../../../../../../data/filter/DataFilterAmountFilter.js";
import DataFilterDropShadow from "../../../../../../data/filter/DataFilterDropShadow.js";

/**
 * 컨테이너 필터 타입 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_changeFilterType = {
	description: {
		key: 'changeFilterType',
		label: 'Change Filter Type',
		icon: faExchangeAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const {type} = payload
		const targetViewInfo = HELPER_GET_DATA.getActiveViewInfo(newData)
		const {containerInfo} = targetViewInfo
		const {filterInfo} = containerInfo
		let newFilterData
		switch (type) {
			case ConstFilterType.BLUR:
			case ConstFilterType.GRAYSCALE:
			case ConstFilterType.BRIGHTNESS:
			case ConstFilterType.INVERT:
			case ConstFilterType.SEPIA:
				newFilterData = new DataFilterAmountFilter(type)
				break
			case ConstFilterType.CONTRAST:
			case ConstFilterType.OPACITY:
			case ConstFilterType.SATURATE:
				newFilterData = new DataFilterAmountFilter(type, 1)
				break
			case ConstFilterType.HUE_ROTATE:
				newFilterData = new DataFilterAmountFilter(type, 0, 'deg')
				break
			case ConstFilterType.DROP_SHADOW:
				newFilterData = new DataFilterDropShadow()
				break
			default :
				break
		}
		if (newFilterData) filterInfo[payload.target_filterIndex] = newFilterData
		action.label = `${targetViewInfo['viewKey']} Change Filter Type : ${filterInfo[payload.target_filterIndex]?.type}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_changeFilterType