import calcGradientLayer from "./calcGradientLayer";

const calcGradientGroupLayerList = (groupData, current_LayoutInfo, time, viewScale, force) => {
	return (groupData['visibleYn'] || force) ? groupData.children.map((layerData) => {
		return layerData['visibleYn'] ? calcGradientLayer(layerData, time, current_LayoutInfo, viewScale) : null
	}).filter(Boolean).join(',') : null


}
export default calcGradientGroupLayerList