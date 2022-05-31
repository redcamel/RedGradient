import './RedLayerItem.css'
import {faArrowDown, faArrowUp, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import HELPER_GET_DATA from "../../contexts/system/HELPER_GET_DATA.js";
import RedTextField from "../../basicUI/RedTextField.jsx";
import RedToolTipIcon from "../../basicUI/icon/RedToolTipIcon.jsx";
import ConstLayerSizeValue from "../../../data/const/ConstLayerSizeValue.js";
import RedLayerPreviewBackgroundType from "./helper/RedLayerPreviewBackgroundType.jsx";
import calcLayerGradient from "./calcLayerGradient";

/**
 * 레이어
 * @returns {JSX.Element}
 * @constructor
 */
const RedLayerItem = ({
												layerData, groupIdx, layerIdx,
												dummyDropTargetLayerYn,
												dummySameGroupYn,
												dummyYn,
												onDragStart,
												onDragEnter,
												onDragOver,
												onDragLeave,
												onDragEnd,
												onDrop,
											}) => {
	const {state, actions: gradientActions, state: {layerGroupViewSizeInfo}} = useContext(ContextGradient)
	const targetView = HELPER_GET_DATA.getTargetViewInfo(state)
	const {layerGroupInfo} = targetView
	const {activeGroupIndex, activeGroupLayerIndex, groupList} = layerGroupInfo
	const previewSize = ConstLayerSizeValue[layerGroupViewSizeInfo['size']]
	const activeGroupLayerYn = groupList[activeGroupIndex]['children'][activeGroupLayerIndex] === layerData
	const {visibleYn, previewBackgroundType} = layerData
	const targetChildren = groupList[groupIdx]['children']
	const targetChildrenNum = targetChildren.length
	const prevSwapAble = layerIdx > 0
	const nextSwapAble = layerIdx < targetChildrenNum - 1
	const HD_active = (e) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.setActiveGroupAndLayer(
			{activeGroupIndex: groupIdx, activeGroupLayerIndex: layerIdx}
		)
	}
	const HD_setVisibleYn = (e) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.updateLayerByKey(
			{
				key: 'visibleYn',
				groupIndex: groupIdx,
				groupLayerIndex: layerIdx,
				value: !visibleYn
			}
		)
	}
	const HD_changeLayerLabel = (value, saveHistoryYn) => {
		gradientActions.updateLayerByKey({
			value,
			key: 'label',
			groupIndex: groupIdx,
			groupLayerIndex: layerIdx,
			saveHistoryYn
		})
	}
	const HD_swapLayer = (e, targetIndex, destinationIndex) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.swapLayer({
			startGroupIndex: groupIdx,
			targetGroupIndex: groupIdx,
			startLayerIndex: targetIndex,
			targetLayerIndex: destinationIndex
		})
	}
	return (
		<div className={`RedLayerItem_container ${activeGroupLayerYn ? 'active' : ''}`}
				 onClick={HD_active}
		>
			{/*{targetView['viewKey']} {groupIdx} {layerIdx}*/}
			<div
				className={'RedLayerItem_stepItemArea'}
				style={{left: '-40px'}}
				draggable={true}
				onDragStart={onDragStart}
				onDragEnter={onDragEnter}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDragEnd={onDragEnd}
				onDrop={dummyDropTargetLayerYn ? onDrop : () => {
				}}

			>
				<div
					className={'RedLayerItem_stepItemArea'}
					style={{
						left: '40px',
						background: dummyDropTargetLayerYn ? 'rgba(81,25,105,0.5)' : 'rgba(255,0,0,0.0)',
						zIndex: dummyYn ? 100 : ''
					}}
				>
					<div className={'RedLayerItem_stepItemAreaTitle'}
							 style={{
								 opacity: dummyDropTargetLayerYn ? 1 : 0,
								 transform: dummyDropTargetLayerYn ? 'scale(1)' : 'scale(0.8)'
							 }}
					>Drop here
					</div>
				</div>
			</div>
			<div className={'RedLayerItem_arrow_container'}>
				{prevSwapAble ? <RedToolTipIcon icon={faArrowUp} toolTip={'Move Up'} style={{fontSize: '9px'}}
																				onClick={(e) => HD_swapLayer(e, layerIdx, layerIdx - 1)}
				/> : ''}
				{nextSwapAble ? <RedToolTipIcon icon={faArrowDown} toolTip={'Move Down'} style={{fontSize: '9px'}}
																				onClick={(e) => HD_swapLayer(e, layerIdx, layerIdx + 1)}
				/> : ''}
			</div>
			<div className={`RedLayerItem_label ${activeGroupLayerYn ? 'active' : ''}`} style={{pointerEvents: 'none'}}>

				<RedToolTipIcon
					icon={visibleYn ? faEye : faEyeSlash}
					activeYn={visibleYn}
					style={{fontSize: '14px'}}
					onClick={(e) => HD_setVisibleYn(e)}
				/>
				{/*<FontAwesomeIcon icon={faPaintBrush} fixedWidth={true}/>*/}
				<RedTextField
					value={layerData['label']} width={'120px'}
					onInput={HD_changeLayerLabel}
					onKeyDown={HD_changeLayerLabel}
					onBlur={HD_changeLayerLabel}
				/>
			</div>
			<RedLayerPreviewBackgroundType layerData={layerData} groupIdx={groupIdx} layerIdx={layerIdx}/>
			<div className={`RedLayerItem_preview ${previewBackgroundType}`} style={{
				opacity: visibleYn ? 1 : 0.25,
				width: previewSize[0] + 'px',
				height: previewSize[1] + 'px',
				pointerEvents: 'none'
			}}>
				<div
					style={{
						width: '100%',
						height: '100%',
						background: calcLayerGradient(layerData),
					}}
				/>

			</div>
		</div>
	)
}
export default RedLayerItem