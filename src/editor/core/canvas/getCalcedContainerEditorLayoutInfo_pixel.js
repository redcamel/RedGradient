import ConstCanvasViewKey from "../../../data/const/ConstCanvasViewKey.js";
import ConstUnitPxPercent from "../../../data/const/ConstUnitPxPercent.js";

/**
 * 픽셀 계산된 레이아웃 사이즈를 알려줌
 * @param state
 * @returns {{raw: {top: number, left: number, x: number, width: number, y: number, height: number}, viewScalePixel: {top: string, left: string, x: string, width: string, y: string, height: string}}}
 */
const getCalcedContainerEditorLayoutInfo_pixel = (state, viewScale = 1) => {
	const {canvasInfo, deviceInfo} = state
	const {sizeInfo: deviceSizeInfo} = deviceInfo
	const result = {}
	let rawMain
	{
		const targetView = canvasInfo[ConstCanvasViewKey.MAIN]
		const {containerInfo} = targetView
		const {sizeInfo, positionInfo} = containerInfo
		const {x, y} = positionInfo
		const {width, height} = sizeInfo
		const calcWidth = sizeInfo.widthUnit === ConstUnitPxPercent.PERCENT ? deviceSizeInfo.width * width * 0.01 : width
		const calcHeight = sizeInfo.heightUnit === ConstUnitPxPercent.PERCENT ? deviceSizeInfo.height * height * 0.01 : height
		const calcX = positionInfo.xUnit === ConstUnitPxPercent.PERCENT ? deviceSizeInfo.width * x * 0.01 : x
		const calcY = positionInfo.yUnit === ConstUnitPxPercent.PERCENT ? deviceSizeInfo.height * y * 0.01 : y
		result[ConstCanvasViewKey.MAIN] = {
			parentSizeInfo: deviceSizeInfo,
			sizeInfo,
			positionInfo,
			raw: {
				x: calcX,
				y: calcY,
				left: calcX,
				top: calcY,
				width: calcWidth,
				height: calcHeight
			},
			viewScalePixel: {
				x: calcX * viewScale + 'px',
				y: calcY * viewScale + 'px',
				left: calcX * viewScale + 'px',
				top: calcY * viewScale + 'px',
				width: calcWidth * viewScale + 'px',
				height: calcHeight * viewScale + 'px'
			}
		}
		rawMain = {
			x: calcX,
			y: calcY,
			width: calcWidth,
			height: calcHeight
		}
	}
	[ConstCanvasViewKey.BEFORE, ConstCanvasViewKey.AFTER].forEach(key => {

		const targetView = canvasInfo[key]
		const {containerInfo} = targetView
		const {sizeInfo, positionInfo} = containerInfo
		const {x, y} = positionInfo
		const {width, height} = sizeInfo
		const calcWidth = sizeInfo.widthUnit === ConstUnitPxPercent.PERCENT ? rawMain.width * width * 0.01 : width
		const calcHeight = sizeInfo.heightUnit === ConstUnitPxPercent.PERCENT ? rawMain.height * height * 0.01 : height
		const calcX = (positionInfo.xUnit === ConstUnitPxPercent.PERCENT ? rawMain.width * x * 0.01 : x)
		const calcY = (positionInfo.yUnit === ConstUnitPxPercent.PERCENT ? rawMain.height * y * 0.01 : y)
		result[key] = {
			parentSizeInfo: {
				width: rawMain.width,
				height: rawMain.height
			},
			sizeInfo,
			positionInfo,
			raw: {
				x: calcX,
				y: calcY,
				left: calcX,
				top: calcY,
				width: calcWidth,
				height: calcHeight
			},
			viewScalePixel: {
				x: calcX * viewScale + 'px',
				y: calcY * viewScale + 'px',
				left: calcX * viewScale + 'px',
				top: calcY * viewScale + 'px',
				width: calcWidth * viewScale + 'px',
				height: calcHeight * viewScale + 'px'
			}
		}

	})
	return result
}
export default getCalcedContainerEditorLayoutInfo_pixel