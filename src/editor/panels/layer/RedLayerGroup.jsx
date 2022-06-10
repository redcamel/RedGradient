import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './RedLayerGroup.css'
import {faCopy, faFileMedical, faFolderPlus, faLayerGroup, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import HELPER_GET_DATA from "../../contexts/system/HELPER_GET_DATA.js";
import RedLayerPreviewSize from "./helper/RedLayerPreviewSize.jsx";
import RedLayerGroupItem from "./RedLayerGroupItem.jsx";
import RedLayerGroupPreviewBackgroundType from "./helper/RedLayerGroupPreviewBackgroundType.jsx";
import RedPanelTitle from "../../basicUI/panel/RedPanelTitle.jsx";
import ContextWindows from "../../contexts/window/ContextWindows";
import RedTemplateLayer from "../templateLayer/RedTemplateLayer";
import RedToolTipIcon from "../../basicUI/icon/RedToolTipIcon";

/**
 * 히스토리 창
 * @returns {JSX.Element}
 * @constructor
 */
const RedLayerGroup = () => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const {actions: windowActions} = useContext(ContextWindows)
	const targetView = HELPER_GET_DATA.getTargetViewInfo(state)
	const {layerGroupInfo} = targetView
	const {groupList, activeGroupIndex, activeGroupLayerIndex} = layerGroupInfo
	const activeGroupChildren = groupList[activeGroupIndex]?.['children'] || []
	const hasGroup = groupList.length
	const hasGroupChildren = activeGroupChildren.length
	const hasGroupOpacity = hasGroup ? 1 : 0.25
	const hasGroupChildrenOpacity = hasGroupChildren ? 1 : 0.25
	const HD_removeLayer = () => {
		if (!hasGroup || !hasGroupChildren) return
		gradientActions.removeLayer({
			groupIndex: activeGroupIndex,
			groupLayerIndex: activeGroupLayerIndex
		})
	}
	const HD_addLayer = () => {
		gradientActions.addLayer({
			groupIndex: activeGroupIndex
		})
	}
	const HD_duplicateLayer = (e) => {
		if (!hasGroup || !hasGroupChildren) return
		e.preventDefault()
		e.stopPropagation()
		gradientActions.duplicateLayer({
			groupIndex: activeGroupIndex,
			groupLayerIndex: activeGroupLayerIndex
		})
	}
	const HD_addGroup = (e) => {
		gradientActions.addGroup()
	}
	const HD_addTemplate = () => {
		windowActions.addWindow({
			contents: <RedTemplateLayer/>,
			backgroundColor: 'rgba(0,0,0, 0.5)'
		})
	}
	return (
		<>
			<div className={'RedLayerGroup_container'}>
				<RedPanelTitle label={'Layer Edit'} icon={faLayerGroup}/>
				<RedLayerPreviewSize/>
				<RedLayerGroupPreviewBackgroundType/>
				<div className={'RedLayerGroup_middle'}>
					<RedLayerGroupItem/>
				</div>
				<div className={'RedLayerGroup_bottom'}>
					{/*<div className={'RedLayerGroup_addTemplate'} onClick={HD_addTemplate}>*/}
					{/*	<FontAwesomeIcon*/}
					{/*		icon={faFileMedical}*/}
					{/*		style={{cursor: 'pointer', opacity: hasGroupOpacity}}*/}
					{/*		size={'1x'}*/}
					{/*		fixedWidth={true}*/}
					{/*	/>*/}
					{/*	<span>Add Template</span>*/}
					{/*</div>*/}
					<RedToolTipIcon
						icon={faFolderPlus}
						style={{cursor: 'pointer'}}
						size={'1x'}
						fixedWidth={true}
						toolTip={'add group'}
						align={'top'}
						onClick={HD_addGroup}
					/>
					{
						groupList.length
							? <>
								<RedToolTipIcon
									icon={faFileMedical}
									style={{cursor: 'pointer', opacity: hasGroupOpacity}}
									size={'1x'}
									fixedWidth={true}
									toolTip={'add layer'}
									align={'top'}
									onClick={HD_addLayer}
								/>
								<RedToolTipIcon
									icon={faCopy}
									style={{cursor: 'pointer', opacity: hasGroupChildrenOpacity}}
									size={'1x'}
									toolTip={'duplicate layer'}
									align={'top'}
									fixedWidth={true}
									onClick={HD_duplicateLayer}
								/>
								<RedToolTipIcon
									icon={faTrashAlt}
									toolTip={'remove layer'}
									style={{cursor: 'pointer', opacity: hasGroupChildrenOpacity}}
									size={'1x'}
									align={'topRight'}
									fixedWidth={true}
									onClick={HD_removeLayer}
								/>
							</>
							: ''
					}
				</div>
			</div>
		</>
	)
}
export default RedLayerGroup