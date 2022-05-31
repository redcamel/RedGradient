/**
 * 픽셀 계산된 레이아웃 사이즈를 알려줌
 * @param state
 * @returns {{raw: {top: number, left: number, x: number, width: number, y: number, height: number}, viewScalePixel: {top: string, left: string, x: string, width: string, y: string, height: string}}}
 */
import ConstUnitPxPercent from "../../../data/const/ConstUnitPxPercent";

const getCalcedGradientEditorLayoutInfo_pixel = (containerInfo, layerData, calcedLayoutInfo, viewScale) => {
	const containerSizeInfo_raw = calcedLayoutInfo['raw']
	const containerSizeInfo_viewScalePixel = calcedLayoutInfo['raw']
	const {sizeInfo, positionInfo} = layerData
	/**
	 * 레이어는컨테이너 내에서 본인의 크기를 뺴고 처리해야함다.
	 * @type {number|*}
	 */
	const calcWidth = sizeInfo['widthUnit'] === ConstUnitPxPercent.PERCENT ? sizeInfo['width'] * containerSizeInfo_raw.width * 0.01 : sizeInfo['width']
	const calcHeight = sizeInfo['heightUnit'] === ConstUnitPxPercent.PERCENT ? sizeInfo['height'] * containerSizeInfo_raw.height * 0.01 : sizeInfo['height']
	const calcWidth2 = (containerSizeInfo_raw.width - calcWidth) * viewScale
	const calcHeight2 = (containerSizeInfo_raw.height - calcHeight) * viewScale
	const calcX = (positionInfo['xUnit'] === ConstUnitPxPercent.PERCENT ? positionInfo['x'] * calcWidth2 * 0.01 / viewScale : positionInfo['x']) + containerSizeInfo_viewScalePixel['x']
	const calcY = (positionInfo['yUnit'] === ConstUnitPxPercent.PERCENT ? positionInfo['y'] * calcHeight2 * 0.01 / viewScale : positionInfo['y']) + containerSizeInfo_viewScalePixel['y']
	const result = {
		parentSizeInfo: containerInfo.sizeInfo,
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
	return result
}
export default getCalcedGradientEditorLayoutInfo_pixel