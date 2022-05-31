import ConstBoxBorderPropertyModeType
	from "../../editor/panels/container/cssProperty/border/ConstBoxBorderPropertyModeType.js";
import ConstBoxBorderType from "../const/ConstBoxBorderType.js";

const DataBorderStyle = function () {
	return {
		mode: ConstBoxBorderPropertyModeType.MERGE,
		[ConstBoxBorderPropertyModeType.MERGE]: {
			borderStyle: ConstBoxBorderType.SOLID
		},
		[ConstBoxBorderPropertyModeType.SOLO]: {
			topStyle: ConstBoxBorderType.SOLID,
			rightStyle: ConstBoxBorderType.SOLID,
			leftStyle: ConstBoxBorderType.SOLID,
			bottomStyle: ConstBoxBorderType.SOLID,
		}
	}
}
export default DataBorderStyle