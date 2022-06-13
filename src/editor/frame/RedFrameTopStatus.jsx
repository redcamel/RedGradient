import {useContext} from "react";
import ContextGradient from "../contexts/system/ContextGradient.js";
import './RedFrameTopStatus.css'
import HELPER_GET_DATA from "../contexts/system/HELPER_GET_DATA";

/**
 * RedFrameTopStatus
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameTopStatus = () => {
	const {state: gradientContext} = useContext(ContextGradient)
	const targetView = HELPER_GET_DATA.getActiveViewInfo(gradientContext)
	if (!targetView['viewKey']) return null
	const activeLayerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(gradientContext)
	const {activeGroupIndex,activeGroupLayerIndex,groupList} = activeLayerGroupInfo
	const activeGroup = groupList[activeGroupIndex]
	if (!activeGroup) return null
	const activeLayer = activeGroup['children'][activeGroupLayerIndex]
	if (!activeLayer) return null
	return (
		<div className={'RedFrameTopStatus_container'}>
			{targetView['viewKey']} > {activeGroup['label']} > {activeLayer['label']}
		</div>
	)
}
export default RedFrameTopStatus