import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";
import DataFilterAmountFilter from "../../../../../../data/filter/DataFilterAmountFilter.js";
import ConstFilterType from "../../../../../../data/const/ConstFilterType.js";

/**
 * 컨테이너 필터 swap
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_swapFilter = {
	description: {
		key: 'addFilter',
		label: 'Add Filter',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const {containerInfo} = HELPER_GET_DATA.getTargetViewInfo(newData)
		const {filterInfo} = containerInfo
		const newFilterData = new DataFilterAmountFilter(ConstFilterType.BLUR)
		filterInfo.reverse()
		filterInfo.push(newFilterData)
		filterInfo.reverse()
		action.label = `Add Filter - ${newFilterData.type}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_swapFilter