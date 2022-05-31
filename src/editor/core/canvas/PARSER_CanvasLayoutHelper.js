import ConstCanvasViewKey from "../../../data/const/ConstCanvasViewKey.js";

const calcMain = (canvasInfo) => {
	const targetView = canvasInfo[ConstCanvasViewKey.MAIN]
	const {containerInfo} = targetView
	const {positionInfo} = containerInfo
	// 계산된 사이즈
	const x = positionInfo.x
	const y = positionInfo.y
	return {
		x,
		y
	}
}
const calcEtc = (canvasInfo, viewKey) => {
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {positionInfo} = containerInfo
	// 계산된 메인 사이트
	const {x: mainX, y: mainY} = calcMain(canvasInfo)
	// 계산된 사이즈
	const x = positionInfo.x + mainX
	const y = positionInfo.y + mainY
	return {
		x,
		y
	}
}
const PARSER_CanvasLayoutHelper = {
	calcCanvasContainerPixelPosition: (canvasInfo, viewKey) => {
		switch (viewKey) {
			case ConstCanvasViewKey.MAIN:
				return calcMain(canvasInfo)

			case ConstCanvasViewKey.BEFORE:
			case ConstCanvasViewKey.AFTER:
				return calcEtc(canvasInfo, viewKey)
			default :
				break
		}
	},
}
export default PARSER_CanvasLayoutHelper