import DataBorderRadius from "./DataBorderRadius.js";
import ConstBoxBorderModeType from "../../editor/panels/container/cssProperty/border/ConstBoxBorderModeType.js";
import DataBorderWidth from "./DataBorderWidth.js";
import DataBorderStyle from "./DataBorderStyle.js";
import DataBorderColor from "./DataBorderColor.js";
import DataBorderImageOutset from "./DataBorderImageOutset.js";
import DataBorderImageSlice from "./DataBorderImageSlice.js";
import DataBorderImageRepeat from "./DataBorderImageRepeat.js";
import DataRedGradientLayer from "../DataRedGradientLayer";

const DataBorder = function () {
	return {
		mode: ConstBoxBorderModeType.BASIC,
		//
		borderRadiusInfo: new DataBorderRadius(),
		borderWidthInfo: new DataBorderWidth(),
		borderStyleInfo: new DataBorderStyle(),
		borderColorInfo: new DataBorderColor(),
		//
		borderImageOutsetInfo: new DataBorderImageOutset(),
		borderImageSliceInfo: new DataBorderImageSlice(),
		borderImageRepeatInfo: new DataBorderImageRepeat(),
		borderGradientInfo: new DataRedGradientLayer()
	}
}
export default DataBorder