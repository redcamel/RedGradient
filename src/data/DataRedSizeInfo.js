import ConstUnitPxPercent from "./const/ConstUnitPxPercent.js";

/**
 *
 * @param width
 * @param height
 * @param widthUnit
 * @param heightUnit
 * @param useFixedRatio
 * @returns {{widthUnit: string, useFixedRatio: boolean, width: number, heightUnit: string, height: number}}
 * @constructor
 */
function DataRedSizeInfo(
	width = 100,
	height = 100,
	widthUnit = ConstUnitPxPercent.PX,
	heightUnit = ConstUnitPxPercent.PX,
	useFixedRatio = false
) {
	return {
		width,
		height,
		widthUnit,
		heightUnit,
		useFixedRatio
	};
}

export default DataRedSizeInfo;
