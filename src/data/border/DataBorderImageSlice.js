import ConstBoxBorderPropertyModeType
	from "../../editor/panels/container/cssProperty/border/ConstBoxBorderPropertyModeType.js";
import ConstUnitNumberPercent from "../const/ConstUnitNumberPercent.js";

const DataBorderImageSlice = function () {
	return {
		mode: ConstBoxBorderPropertyModeType.MERGE,
		[ConstBoxBorderPropertyModeType.MERGE]: {
			borderImageSliceFill: false,
			borderImageSlice: 1,
			borderImageSliceUnit: ConstUnitNumberPercent.NUMBER
		},
		[ConstBoxBorderPropertyModeType.SOLO]: {
			borderImageSliceFill: false,
			top: 1,
			right: 1,
			bottom: 1,
			left: 1,
			topUnit: ConstUnitNumberPercent.NUMBER,
			rightUnit: ConstUnitNumberPercent.NUMBER,
			bottomUnit: ConstUnitNumberPercent.NUMBER,
			leftUnit: ConstUnitNumberPercent.NUMBER,
		}
	}
}
export default DataBorderImageSlice