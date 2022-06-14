import './RedGradientStepEditor.css'
import RedPanelTitle from "../../../basicUI/panel/RedPanelTitle.jsx";
import {faDownload, faExchangeAlt, faFileMedical, faPalette, faSort} from "@fortawesome/free-solid-svg-icons";
import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedDivision from "../../../basicUI/RedDivision.jsx";
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA.js";
import {useContext, useState} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import RedGradientStepEditorItem from "./RedGradientStepEditorItem.jsx";
import RedGradientStepEditorPreview from "./RedGradientStepEditorPreview.jsx";
import RedToolTipIcon from "../../../basicUI/icon/RedToolTipIcon.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import RedToastSkin from "../../../core/RedToastSkin";
import RedGradientOffset from "../offset/RedGradientOffset";

/**
 * RedGradientStepEditor
 * @returns {JSX.Element}
 * @constructor
 */
let emptyImage
let dragStartIDX = null
const RedGradientStepEditor = () => {
	const {state: gradientState, actions} = useContext(ContextGradient)
	const activeViewLayerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(gradientState)
	const [dummyDropTargetIDX, setDummyDropTargetIDX] = useState(null);
	if (!activeViewLayerGroupInfo) return null
	const {activeGroupIndex, activeGroupLayerIndex} = activeViewLayerGroupInfo
	const activeLayerData = HELPER_GET_DATA.getActiveLayerInfo(gradientState)

	//////
	if (!activeLayerData) return null

	const {type: gradientType} = activeLayerData
	const time = gradientState['timelineInfo']['time']
	const {stepInfoList} = activeLayerData?.['timeline'][time] || {}
	const HD_changeInfo = (targetInfoKey, key, value, saveHistoryYn) => {
		actions.updateLayerValueInfoByKey(
			{
				targetInfoKey,
				key,
				time,
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
				value,
				saveHistoryYn
			}
		)
	}
	const HD_addStepInfo = () => {
		actions.addLayerStepInfo(
			{
				time,
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
			}
		)
	}
	const HD_reverseStep = () => {
		actions.reverseLayerStepInfo(
			{
				time,
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
			}
		)
	}
	const HD_sortStep = () => {
		actions.sortLayerStepInfo(
			{
				time,
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
			}
		)
	}
	const handleDragStart = (e, idx) => {
		if (!emptyImage) emptyImage = new Image();
		e.nativeEvent.dataTransfer.setDragImage(emptyImage, 0, 0);
		dragStartIDX = idx
	}

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
	}

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDummyDropTargetIDX(null)
	}

	const handleDragOver = (e, idx) => {
		e.preventDefault();
		e.stopPropagation();
		if (dragStartIDX !== null) {
			setDummyDropTargetIDX(idx)
		}
	}
	const handleDragEnd = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dragStartIDX = null
		setDummyDropTargetIDX(null)
	}

	const handleDrop = (e, idx) => {
		if (dragStartIDX !== null) {
			actions.dropLayerStepInfo({
				time,
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
				dragStartIDX,
				dropIDX: idx,
				saveHistoryYn: true
			})

		}
		setDummyDropTargetIDX(null)
		dragStartIDX = null
	}
	if (!activeLayerData) return null
	return (
		<div className={'RedGradientStepEditor_container'}>
			<RedPanelTitle label={'Gradient Step Editor'} icon={faPalette}/>
			<div className={'RedGradientStepEditor_middle'}>
				<RedGradientStepEditorPreview data={activeLayerData} time={time}/>
				<RedGradientOffset
					data={activeLayerData}
					time={time}
					groupIndex={activeGroupIndex}
					groupLayerIndex={activeGroupLayerIndex}
				/>
					<RedDivision/>
					<RedItemTitle
						label={
							<div style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
								color: 'inherit'
							}}>
								Step Edit
								<div style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}>
									<div className={'RedGradientStepEditor_addPreset'} onClick={() => {
										window.dispatchEvent(new CustomEvent('addUserPreset', {
											detail: activeLayerData
										}))
										toast.dark(
											<RedToastSkin title={'Add custom gradient to your presets.'} text={activeLayerData['label']}/>,
											{
												position: 'bottom-right'
											}
										);
									}}>
										<FontAwesomeIcon icon={faDownload}/>Add Preset
									</div>
									<RedToolTipIcon icon={faSort} toolTip={'Sort Steps'} onClick={HD_sortStep}/>
									<RedToolTipIcon icon={faExchangeAlt} toolTip={'Reverse Steps'} onClick={HD_reverseStep}/>
									<RedToolTipIcon icon={faFileMedical} toolTip={'Add Step'} onClick={HD_addStepInfo}/>
								</div>
							</div>
						}
					/>
					<div className={'RedGradientStepEditor_stepList_container'}>
						<div className={'RedGradientStepEditor_stepList'}>
							{stepInfoList.map((v, index) => {
								const activeYn = false
								return <div key={index}>
									<RedGradientStepEditorItem
										gradientType={gradientType}
										stepInfoList={stepInfoList}
										groupIndex={activeGroupIndex}
										groupLayerIndex={activeGroupLayerIndex}
										time={time}
										stepIDX={index}
										data={v}
										activeYn={activeYn}
										//
										dummyYn={dummyDropTargetIDX !== null}
										dummyDropTargetYn={dummyDropTargetIDX === index}
										onDragStart={e => handleDragStart(e, index)}
										onDrop={e => handleDrop(e, index)}
										onDragOver={e => handleDragOver(e, index)}
										onDragEnter={handleDragEnter}
										onDragLeave={e => handleDragLeave(e, index)}
										onDragEnd={handleDragEnd}
									/>
									<RedDivision/>
								</div>
							})}
						</div>
					</div>
			</div>
			<div className={'RedGradientStepEditor_bottom'}>
				{/*dragStartIDX : {dragStartIDX} / dummyDropTargetIDX : {dummyDropTargetIDX}*/}
			</div>
		</div>
)
}
export default RedGradientStepEditor