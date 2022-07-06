import ConstUnitPxPercent from "../../../data/const/ConstUnitPxPercent";

/**
 * 현재 활성화된 뷰 정보를 가져온다.
 * @param gradientState
 */
const HELPER_GET_DATA = {
	/**
	 * 현재 활성화된 view 정보를 가져옴
	 * @param gradientState
	 * @returns {*}
	 */
	getActiveViewInfo: (gradientState) => {
		const {systemFrameLayoutInfo, canvasInfo} = gradientState
		const {activeLayoutKey} = systemFrameLayoutInfo
		const activeWindowIndex = systemFrameLayoutInfo[activeLayoutKey]['activeWindowIndex']
		const viewKey = systemFrameLayoutInfo[activeLayoutKey]['viewList'][activeWindowIndex]
		return canvasInfo[viewKey]
	},
	/**
	 * 현재 활성화된 view LayerGroupInfo 를 가져옴
	 * @param gradientState
	 * @returns {*}
	 */
	getActiveLayerGroupInfo: (gradientState) => {
		const targetViewInfo = HELPER_GET_DATA.getActiveViewInfo(gradientState)
		return targetViewInfo.layerGroupInfo
	},
	/**
	 * 현재 활성화된 view LayerGroupInfo 의 groupList 를 가져옴
	 * @param gradientState
	 * @returns {DataRedGradientLayerGroup[]|[DataRedGradientLayerGroup,DataRedGradientLayerGroup,DataRedGradientLayerGroup]|*}
	 */
	getActiveViewGroupList: (gradientState) => {
		const layerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(gradientState)
		return layerGroupInfo.groupList
	},
	/**
	 * 현재 활성화된 layerInfo 를 가져옴
	 * @param gradientState
	 * @returns {*}
	 */
	getActiveLayerInfo: (gradientState) => {
		const t0 = HELPER_GET_DATA.getActiveLayerGroupInfo(gradientState)
		return t0['groupList'][t0.activeGroupIndex]?.['children'][t0.activeGroupLayerIndex]
	},

	calcLayerPixelSize: (state, activeLayer, time = 0) => {
		const {sizeInfo} = activeLayer['timeline'][time]
		const deviceSizeInfo = state['deviceInfo']
		const canvasSizeInfo = HELPER_GET_DATA.getActiveViewInfo(state)['containerInfo']['sizeInfo']
		const canvasSizeW = canvasSizeInfo['widthUnit'] === ConstUnitPxPercent.PX ? canvasSizeInfo['width'] : (canvasSizeInfo['width'] * deviceSizeInfo['width'] * 0.01)
		const canvasSizeH = canvasSizeInfo['heightUnit'] === ConstUnitPxPercent.PX ? canvasSizeInfo['height'] : (canvasSizeInfo['height'] * deviceSizeInfo['height'] * 0.01)
		const layerSizeW = sizeInfo['widthUnit'] === ConstUnitPxPercent.PX ? sizeInfo['width'] : (sizeInfo['width'] * canvasSizeW * 0.01)
		const layerSizeH = sizeInfo['heightUnit'] === ConstUnitPxPercent.PX ? sizeInfo['height'] : (sizeInfo['height'] * canvasSizeH * 0.01)
		return {
			layerSizeW,
			layerSizeH,
			containerW : canvasSizeW,
			containerH : canvasSizeH
		}
	},
	makeNewState: (state) => ({...JSON.parse(JSON.stringify(state))})
}
export default HELPER_GET_DATA