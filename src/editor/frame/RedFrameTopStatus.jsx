import {useContext} from "react";
import ContextGradient from "../contexts/system/ContextGradient.js";
import './RedFrameTopStatus.css'
import HELPER_GET_DATA from "../contexts/system/HELPER_GET_DATA";

/**
 * 상단프레임
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameTopStatus = () => {
	const {state: gradientContext} = useContext(ContextGradient)
	const targetView = HELPER_GET_DATA.getTargetViewInfo(gradientContext)
	if (!targetView['viewKey']) return null
	const activeLayerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(gradientContext)
	const activeGroup = activeLayerGroupInfo.groupList[activeLayerGroupInfo.activeGroupIndex]
	if (!activeGroup) return null
	const activeLayer = activeGroup['children'][activeLayerGroupInfo.activeGroupLayerIndex]
	if (!activeLayer) return null
	console.log('activeGroup', activeLayerGroupInfo)
	return (
		<div className={'RedFrameTopStatus_container'}>
			{targetView['viewKey']} > {activeGroup['label']} > {activeLayer['label']}
		</div>
	)
}
export default RedFrameTopStatus