import ConstBoxBorderPropertyModeType
	from "../../editor/panels/container/cssProperty/border/ConstBoxBorderPropertyModeType.js";
import ConstUnitPxPercent from "../const/ConstUnitPxPercent.js";

const DataBorderRadius = function () {
	return {
		mode: ConstBoxBorderPropertyModeType.MERGE,
		[ConstBoxBorderPropertyModeType.MERGE]: {
			borderRadius: 0,
			borderRadiusUnit: ConstUnitPxPercent.PX
		},
		[ConstBoxBorderPropertyModeType.SOLO]: {
			tl: 0,
			tr: 0,
			br: 0,
			bl: 0,
			tlUnit: ConstUnitPxPercent.PX,
			trUnit: ConstUnitPxPercent.PX,
			blUnit: ConstUnitPxPercent.PX,
			brUnit: ConstUnitPxPercent.PX,
		}
	}
}
export default DataBorderRadius