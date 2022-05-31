import ConstLayerPreviewBackgroundType from "./const/ConstLayerPreviewBackgroundType.js";
import ConstGradientType from "./const/ConstGradientType.js";
import DataRedPositionInfo from "./DataRedPositionInfo.js";
import DataRedSizeInfo from "./DataRedSizeInfo.js";
import ConstGradientRepeatType from "./const/ConstGradientRepeatType.js";
import ConstBlendModeType from "./const/ConstBlendModeType.js";
import ConstUnitPxPercent from "./const/ConstUnitPxPercent";
import DataRedGradientStepInfo from "./DataRedGradientStepInfo.js";
import ConstEndingShape from "./const/ConstEndingShape.js";
import ConstGradientRadialSizeType from "./const/ConstGradientRadialSizeType.js";

let uuid = 0

function DataRedGradientLayer() {
	return {
		label: 'Layer' + uuid++,
		visibleYn: true,
		previewBackgroundType: ConstLayerPreviewBackgroundType.TRANSPARENT,
		//
		type: ConstGradientType.LINEAR,
		repeatType: ConstGradientRepeatType.REPEAT,
		blendMode: ConstBlendModeType.NORMAL,
		// 초단위로 구성
		timeline: {
			0: {
				positionInfo: new DataRedPositionInfo(),
				sizeInfo: new DataRedSizeInfo(100, 100, ConstUnitPxPercent.PX, ConstUnitPxPercent.PX),
				stepInfoList: [
					new DataRedGradientStepInfo({
						startStop: 0,
						startColorHint: 'transparent'
					})
				],
				valueInfo: {
					// LINEAR
					angle: 180,
					// RADIAL
					atInfo: new DataRedPositionInfo(50, 50, ConstUnitPxPercent.PERCENT, ConstUnitPxPercent.PERCENT), // default center
					endingShape: ConstEndingShape.ELLIPSE, // default ellipse
					sizeType: ConstGradientRadialSizeType.FARTHEST_CORNER, // default farthest-corner
				},
			}
		}
	};
}

export default DataRedGradientLayer;
