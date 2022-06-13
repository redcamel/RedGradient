import calcGradientGroupLayerList from "./calcGradientGroupLayerList";

const calcGradientGroupList = (targetView, calced_LayoutInfo, time, viewScale) => {
	const groupList = targetView.layerGroupInfo.groupList
	return groupList.map(groupData => {
		return calcGradientGroupLayerList(groupData, calced_LayoutInfo, time, viewScale)
	}).filter(Boolean).join(',') + `, ${targetView.containerInfo['backgroundColor']}`

}
export default calcGradientGroupList