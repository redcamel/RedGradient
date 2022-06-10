import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './RedLayerGroupItem.css'
import {
	faArrowDown,
	faArrowUp,
	faCopy,
	faDownload,
	faEye,
	faEyeSlash,
	faFileMedical,
	faFolder,
	faFolderOpen,
	faFolderPlus,
	faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import HELPER_GET_DATA from "../../contexts/system/HELPER_GET_DATA.js";
import RedLayerItem from "./RedLayerItem.jsx";
import RedTextField from "../../basicUI/RedTextField.jsx";
import RedToolTipIcon from "../../basicUI/icon/RedToolTipIcon.jsx";
import ConstLayerSizeValue from "../../../data/const/ConstLayerSizeValue.js";
import RedDivision from "../../basicUI/RedDivision.jsx";
import calcLayerGradient from "./calcLayerGradient.js";
import calcLayerGradientBlendMode from "./calcLayerGradientBlendMode";
import {toast} from "react-toastify";
import RedToastSkin from "../../core/RedToastSkin";

/**
 * 히스토리 창
 * @returns {JSX.Element}
 * @constructor
 */
let emptyImage
let dragStartLayerIDX = null
let dragStartGroupIDX = null
let dragStartGroupRootIDX = null
const RedLayerGroupItem = () => {
	const {state, actions: gradientActions, state: {layerGroupViewSizeInfo}} = useContext(ContextGradient)
	const [dummyDropTargetLayerIDX, setDummyDropTargetLayerIDX] = useState(null);
	const [dummyDropTargetGroupIDX, setDummyDropTargetGroupIDX] = useState(null);
	const [dummyDropTargetGroupRootIDX, setDummyDropTargetGroupRootIDX] = useState(null);
	const layerGroupInfo = HELPER_GET_DATA.getActiveViewLayerGroupInfo(state)
	const {groupList, activeGroupIndex} = layerGroupInfo
	const previewSize = ConstLayerSizeValue[layerGroupViewSizeInfo['size']]
	const {previewBackgroundType} = layerGroupViewSizeInfo
	const groupLength = groupList.length
	const HD_active = (groupIdx) => {
		gradientActions.setActiveGroupAndLayer(
			{activeGroupIndex: groupIdx, activeGroupLayerIndex: 0}
		)
	}
	console.log('layerGroupInfo', layerGroupInfo)
	const HD_setOpenYn = (e, index) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.updateGroupByKey(
			{
				groupIndex: index,
				key: 'openYn',
				value: !groupList[index]['openYn'],
				saveHistoryYn: true
			}
		)
	}
	const HD_setVisibleYn = (e, index) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.updateGroupByKey(
			{
				key: 'visibleYn',
				groupIndex: index,
				value: !groupList[index]['visibleYn'],
				saveHistoryYn: true
			}
		)
	}
	const HD_addGroup = (e) => {
		gradientActions.addGroup()
	}
	const HD_duplicateGroup = (e, index) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.duplicateGroup({
			groupIndex: index
		})
	}
	const HD_removeGroup = (e, index) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.removeGroup({
			groupIndex: index
		})
	}
	const HD_addLayer = (e, index) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.addLayer({
			groupIndex: index
		})
	}
	const HD_changeGroupLabel = (value, saveHistoryYn) => {
		gradientActions.updateGroupByKey({
			value,
			key: 'label',
			saveHistoryYn
		})
	}
	const HD_swapGroup = (e, targetIndex, destinationIndex) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.swapGroup({
			target_groupIndex: targetIndex,
			destination_groupIndex: destinationIndex
		})
	}
	//////////////////
	const handleDragStartGroup = (e, groupIndex) => {
		if (!emptyImage) emptyImage = new Image();
		e.nativeEvent.dataTransfer.setDragImage(emptyImage, 0, 0);
		dragStartGroupRootIDX = groupIndex
	}

	const handleDragEnterGroup = (e) => {
		e.preventDefault();
		e.stopPropagation();
	}

	const handleDragLeaveGroup = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDummyDropTargetGroupRootIDX(null)
	}

	const handleDragOverGroup = (e, groupIndex, layerIndex) => {
		e.preventDefault();
		e.stopPropagation();
		if (dragStartGroupRootIDX !== null) {
			setDummyDropTargetGroupRootIDX(groupIndex)
		}

	}
	const handleDragEndGroup = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dragStartGroupRootIDX = null
		setDummyDropTargetGroupRootIDX(null)
	}
	const handleDropGroup = (e, groupIndex) => {
		if (dragStartGroupRootIDX !== null) {
			console.log('dragStartGroupRootIDX', dragStartGroupRootIDX)
			gradientActions.swapGroup({
				target_groupIndex: dragStartGroupRootIDX,
				destination_groupIndex: groupIndex
			})

		}
		dragStartGroupRootIDX = null
		setDummyDropTargetGroupRootIDX(null)
	}
	//////////////////
	const handleDragStart = (e, groupIndex, layerIndex) => {
		if (!emptyImage) emptyImage = new Image();
		e.nativeEvent.dataTransfer.setDragImage(emptyImage, 0, 0);
		dragStartLayerIDX = layerIndex
		dragStartGroupIDX = groupIndex
	}

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
	}

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDummyDropTargetLayerIDX(null)
		setDummyDropTargetGroupIDX(null)
	}

	const handleDragOver = (e, groupIndex, layerIndex) => {
		e.preventDefault();
		e.stopPropagation();
		if (dragStartGroupIDX !== null) {
			setDummyDropTargetLayerIDX(layerIndex)
			setDummyDropTargetGroupIDX(groupIndex)
		}

	}
	const handleDragEnd = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dragStartLayerIDX = null
		dragStartGroupIDX = null
		setDummyDropTargetLayerIDX(null)
		setDummyDropTargetGroupIDX(null)
	}

	const handleDrop = (e, groupIndex, layerIndex) => {
		if (dragStartGroupIDX !== null) {
			console.log('dragStartGroupIDX', dragStartGroupIDX, 'dragStartLayerIDX', dragStartLayerIDX)
			console.log('targetGroupIDX', groupIndex, 'targetLayerIDX', layerIndex)
			gradientActions.dropLayer({
				startGroupIndex: dragStartGroupIDX,
				targetGroupIndex: groupIndex,
				startLayerIndex: dragStartLayerIDX,
				targetLayerIndex: layerIndex
			})

		}
		dragStartLayerIDX = null
		dragStartGroupIDX = null
		setDummyDropTargetLayerIDX(null)
		setDummyDropTargetGroupIDX(null)
	}
	if (!groupList.length) {
		return <div
			className={'RedLayerGroupItem_container_add_group'}
			onClick={HD_addGroup}
		>
			<FontAwesomeIcon icon={faFolderPlus} size={'1x'}/>Add Group
		</div>
	}
	return groupList.map((groupData, index) => {
		const activeGroupYn = activeGroupIndex === index
		const {openYn, visibleYn} = groupData
		const layerList = groupData['children']
		const prevSwapAble = index > 0
		const nextSwapAble = index < groupLength - 1
		return <div
			key={index}
			className={`RedLayerGroupItem_container ${activeGroupYn ? 'active' : ''}`}
			onClick={() => HD_active(index)}
		>
			{/*openYn : {openYn.toString()}*/}
			<div className={`RedLayerGroupItem_label ${activeGroupYn ? 'active' : ''}`}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<div className={`RedLayerGroupItem_label_container`}>
						<RedToolTipIcon
							icon={visibleYn ? faEye : faEyeSlash}
							activeYn={visibleYn}
							size={'sm'}
							toolTip={'Group Visible'}
							align={'left'}
							onClick={(e) => HD_setVisibleYn(e, index)}
						/>
						<RedToolTipIcon
							icon={openYn ? faFolderOpen : faFolder}
							activeYn={openYn}
							size={'sm'}
							toolTip={'Group Open'}
							align={'left'}
							onClick={(e) => HD_setOpenYn(e, index)}
						/>
						<RedTextField
							value={groupData['label']}
							width={'100%'}
							onInput={HD_changeGroupLabel}
							onKeyDown={HD_changeGroupLabel}
							onBlur={HD_changeGroupLabel}
						/>
					</div>
					<RedDivision/>
					<div className={`RedLayerGroupItem_label_container`} style={{flexGrow: ''}}>
						{prevSwapAble ? <RedToolTipIcon icon={faArrowUp} toolTip={'Move Up'}
																						onClick={(e) => HD_swapGroup(e, index, index - 1)}
						/> : ''}
						{nextSwapAble ?
							<RedToolTipIcon icon={faArrowDown} toolTip={'Move Down'}
															onClick={(e) => HD_swapGroup(e, index, index + 1)}
							/> : ''}
						<RedToolTipIcon
							icon={faFileMedical} toolTip={'Add Layer'}
							align={'left'}
							onClick={(e) => HD_addLayer(e, index)}
						/>
						<RedToolTipIcon
							icon={faCopy} toolTip={'Duplicate Group'}
							onClick={(e) => HD_duplicateGroup(e, index)}
						/>
						<RedToolTipIcon
							icon={faTrashAlt} toolTip={'Remove Group'}
							onClick={(e) => HD_removeGroup(e, index)}
						/>
						<div className={'RedGradientStepEditor_addPreset'} onClick={() => {
							window.dispatchEvent(new CustomEvent('addUserGroupPreset', {
								detail: groupData
							}))
							toast.dark(
								<RedToastSkin title={'Add custom Group to your presets.'} text={groupData['label']}/>,
								{
									position: 'bottom-right'
								}
							);
						}}>
							<FontAwesomeIcon icon={faDownload}/>Add Preset
						</div>
					</div>
				</div>
			</div>

			<div className={`RedLayerGroupItem_preview ${previewBackgroundType}`}
					 style={{
						 height: previewSize[1] + 'px',
						 marginBottom: openYn ? 4 : 0 + 'px',
						 opacity: visibleYn ? 1 : 0.25,
						 cursor: 'grab'
					 }}
					 onClick={() => HD_active(index)}
					 draggable={true}
					 onDragStart={e => handleDragStartGroup(e, index)}
					 onDrop={e => handleDropGroup(e, index)}
					 onDragOver={e => handleDragOverGroup(e, index)}
					 onDragEnter={handleDragEnterGroup}
					 onDragLeave={handleDragLeaveGroup}
					 onDragEnd={handleDragEndGroup}
			>
				<div
					key={Math.random()}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: layerList.map((v2, layerIndex) => {
							return v2['visibleYn'] ? calcLayerGradient(v2) : null
						}).filter(Boolean).join(','),
						backgroundBlendMode: calcLayerGradientBlendMode(groupList)
					}}>

				</div>

				{/*{*/}
				{/*	layerList.map((v, layerIndex) => {*/}
				{/*		return v['visibleYn'] ? <div*/}
				{/*			style={{*/}
				{/*				position: 'absolute',*/}
				{/*				top: 0,*/}
				{/*				left: 0,*/}
				{/*				width: '100%',*/}
				{/*				height: '100%',*/}
				{/*				background: calcLayerGradient(v),*/}
				{/*			}}*/}
				{/*		/> : null*/}
				{/*	}).reverse()*/}
				{/*}*/}
				<div
					className={'RedLayerItem_stepItemArea'}
					style={{
						background: dummyDropTargetGroupRootIDX === index ? 'rgba(81,25,105,0.5)' : 'rgba(255,0,0,0.0)',
						zIndex: dummyDropTargetGroupRootIDX === index ? 100 : ''
					}}
				>
					<div className={'RedLayerItem_stepItemAreaTitle'}
							 style={{
								 opacity: dummyDropTargetGroupRootIDX === index ? 1 : 0,
								 transform: dummyDropTargetGroupRootIDX === index ? 'scale(1)' : 'scale(0.8)'
							 }}
					>{'Swap Group'}
					</div>
				</div>
			</div>

			<div className={'RedLayerGroupItem_layer_container'} style={{opacity: visibleYn ? 1 : 0.25}}>
				{openYn && layerList.map((v, layerIndex) => <RedLayerItem
					key={layerIndex}
					layerData={v} groupIdx={index}
					layerIdx={layerIndex}
					dummyYn={dummyDropTargetLayerIDX !== null}
					dummySameGroupYn={dummyDropTargetGroupIDX === dragStartGroupIDX}
					dummyDropTargetLayerYn={dummyDropTargetGroupIDX === index && dummyDropTargetLayerIDX === layerIndex}
					onDragStart={e => handleDragStart(e, index, layerIndex)}
					onDrop={e => handleDrop(e, index, layerIndex)}
					onDragOver={e => handleDragOver(e, index, layerIndex)}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragEnd={handleDragEnd}
				/>)}
			</div>
			{
				!layerList.length && <div
					className={'RedLayerGroupItem_add_layer'}
					onClick={() => {
						gradientActions.addLayer({
							groupIndex: index
						})
					}}

				>
					<FontAwesomeIcon icon={faFileMedical} style={{fontSize: '16px'}}/>Add Layer
				</div>
			}
			{/*dummyDropTargetGroupRootIDX : {dummyDropTargetGroupRootIDX}*/}
		</div>
	})
}
export default RedLayerGroupItem