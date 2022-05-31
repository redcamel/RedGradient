import ConstUnitPxPercent from "./const/ConstUnitPxPercent.js";

/**
 * DataRedPositionInfo
 * @param x
 * @param y
 * @param xUnit
 * @param yUnit
 * @returns {{x: number, y: number, yUnit: string, xUnit: string}}
 * @constructor
 */
function DataRedPositionInfo(
	x = 0,
	y = 0,
	xUnit = ConstUnitPxPercent.PX,
	yUnit = ConstUnitPxPercent.PX
) {
	return {
		x,
		y,
		xUnit,
		yUnit
	};
}

export default DataRedPositionInfo;
