import ConstBoxBorderPropertyModeType
	from "../../editor/panels/container/cssProperty/border/ConstBoxBorderPropertyModeType.js";
import ConstUnitPxNumber from "../const/ConstUnitPxNumber.js";

const DataBorderImageOutset = function () {
	return {
		mode: ConstBoxBorderPropertyModeType.MERGE,
		[ConstBoxBorderPropertyModeType.MERGE]: {
			borderImageOutset: 0,
			borderImageOutsetUnit: ConstUnitPxNumber.PX
		},
		[ConstBoxBorderPropertyModeType.SOLO]: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			topUnit: ConstUnitPxNumber.PX,
			rightUnit: ConstUnitPxNumber.PX,
			bottomUnit: ConstUnitPxNumber.PX,
			leftUnit: ConstUnitPxNumber.PX,
		}
	}
}
export default DataBorderImageOutset