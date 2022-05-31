import cmd_updateContainerSizePosition from "./size_position/cmd_updateContainerSizePosition.js";
import cmd_updateContainerUseFixedRatio from "./size_position/cmd_updateContainerUseFixedRatio.js";
import cmd_updateContainerBoxSizing from "./cmd_updateContainerBoxSizing.js";
import cmd_updateContainerBoxShadowType from "./boxShadow/cmd_updateContainerBoxShadowType.js";
import cmd_updateContainerBoxShadowColor from "./boxShadow/cmd_updateContainerBoxShadowColor.js";
import cmd_updateContainerBoxShadowByKey from "./boxShadow/cmd_updateContainerBoxShadowByKey.js";
import cmd_updateContainerOutlineByKey from "./outline/cmd_updateContainerOutlineByKey.js";
import cmd_updateContainerBackgroundColor from "./cmd_updateContainerBackgroundColor.js";
import border from "./border/index.js";
import filter from "./filter/index.js";
import cmd_updateBorderGradientStepValueInfoByKey from "./cmd_updateBorderGradientStepValueInfoByKey";
import cmd_updateBorderGradientValueInfoByKey from "./cmd_updateBorderGradientValueInfoByKey";

const index = {
	cmd_updateContainerUseFixedRatio,
	cmd_updateContainerSizePosition,
	//
	cmd_updateContainerBoxSizing,
	cmd_updateContainerBackgroundColor,
	//
	cmd_updateContainerBoxShadowType,
	cmd_updateContainerBoxShadowColor,
	cmd_updateContainerBoxShadowByKey,
	cmd_updateBorderGradientStepValueInfoByKey,
	cmd_updateBorderGradientValueInfoByKey,
	//
	cmd_updateContainerOutlineByKey,
	...border,
	...filter
}
export default index