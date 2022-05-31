import ConstBoxBorderPropertyModeType
	from "../../editor/panels/container/cssProperty/border/ConstBoxBorderPropertyModeType.js";
import ConstUnitPxPercent from "../const/ConstUnitPxPercent.js";

const DataBorderWidth = function () {
	return {
		mode: ConstBoxBorderPropertyModeType.MERGE,
		[ConstBoxBorderPropertyModeType.MERGE]: {
			borderWidth: 0,
			borderWidthUnit: ConstUnitPxPercent.PX
		},
		[ConstBoxBorderPropertyModeType.SOLO]: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			topUnit: ConstUnitPxPercent.PX,
			rightUnit: ConstUnitPxPercent.PX,
			bottomUnit: ConstUnitPxPercent.PX,
			leftUnit: ConstUnitPxPercent.PX,
		}
	}
}
export default DataBorderWidth