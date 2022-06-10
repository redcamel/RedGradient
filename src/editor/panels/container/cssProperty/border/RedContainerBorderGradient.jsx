import ContextGradient from "../../../../contexts/system/ContextGradient.js";
import {useContext, useState} from "react";
import RedDivision from "../../../../basicUI/RedDivision.jsx";
import RedGradientStepEditorPreview from "../../../gradient/step/RedGradientStepEditorPreview";
import RedGradientStepEditorItem from "../../../gradient/step/RedGradientStepEditorItem";
import RedGradientType from "../../../gradient/gradientType/RedGradientType";
import ConstGradientType from "../../../../../data/const/ConstGradientType";
import ConstUnitPxPercent from "../../../../../data/const/ConstUnitPxPercent";
import getCalcedContainerEditorLayoutInfo_pixel from "../../../../core/canvas/getCalcedContainerEditorLayoutInfo_pixel";
import RedGradientDegree from "../../../gradient/degree/RedGradientDegree";
import RedGradientEndingShape from "../../../gradient/endingShape/RedGradientEndingShape";
import RedGradientRadialSizeType from "../../../gradient/radialSizeType/RedGradientRadialSizeType";
import RedGradientAt from "../../../gradient/at/RedGradientAt";
import DataRedPositionInfo from "../../../../../data/DataRedPositionInfo";
import DataRedSizeInfo from "../../../../../data/DataRedSizeInfo";
import RedToolTipIcon from "../../../../basicUI/icon/RedToolTipIcon";
import {faDownload, faExchangeAlt, faFileMedical, faSort} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RedItemTitle from "../../../../basicUI/RedItemTitle";
import RedToastSkin from "../../../../core/RedToastSkin";
import {toast} from "react-toastify";

let emptyImage
let dragStartIDX = null
/**
 * 컨테이너 RedContainerBorderGradient 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderGradient = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const [dummyDropTargetIDX, setDummyDropTargetIDX] = useState(null);
	
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {borderInfo} = containerInfo
	const {borderGradientInfo} = borderInfo
	const {type} = borderGradientInfo
	const time = state['timelineInfo']['time']
	const {stepInfoList, valueInfo} = borderGradientInfo['timeline'][time]
	const containerSizeInfo_raw = getCalcedContainerEditorLayoutInfo_pixel(state)[viewKey]['raw']
	const radialTypeYn = type === ConstGradientType.RADIAL || type === ConstGradientType.REPEATING_RADIAL
	const linearTypeYn = type === ConstGradientType.LINEAR || type === ConstGradientType.REPEATING_LINEAR
	const HD_change = (key, value, saveHistoryYn) => {
		if (key === 'type') {
			if (value === ConstGradientType.CONIC || value === ConstGradientType.REPEATING_CONIC) {
				// 코닉으로 변경될경우 px는 퍼센트로 치환한다.
				stepInfoList.forEach(stepInfo => {
					const {start, end} = stepInfo
					if (start['stopUnit'] === ConstUnitPxPercent.PX) {
						start['stop'] = start['stop'] / containerSizeInfo_raw['width'] * 100
						start['stopUnit'] = ConstUnitPxPercent.PERCENT
					}
					if (end['stopUnit'] === ConstUnitPxPercent.PX) {
						end['stop'] = end['stop'] / containerSizeInfo_raw['height'] * 100
						end['stopUnit'] = ConstUnitPxPercent.PERCENT
					}
				})
				console.log('변환체크', containerSizeInfo_raw, stepInfoList)
			}
		}
		gradientActions.update_borderGradientType(
			{
				key,
				value,
				saveHistoryYn
			}
		)
	}
	const HD_changeInfo = (targetInfoKey, key, value, saveHistoryYn) => {
		const updateList = []
		updateList.push(
			{
				key,
				time,
				value,
				saveHistoryYn
			}
		)
		gradientActions.updateBorderGradientValueInfoByKey(
			updateList
		)
	}
	const HD_addStepInfo = () => {
		gradientActions.addLayerStepInfo(
			{
				time,
				borderGradientMode: true
			}
		)
	}
	const HD_reverseStep = () => {
		gradientActions.reverseLayerStepInfo(
			{
				time,
				borderGradientMode: true
			}
		)
	}
	const HD_sortStep = () => {
		gradientActions.sortLayerStepInfo(
			{
				time,
				borderGradientMode: true
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

	const handleDragLeave = (e, idx) => {
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
			console.log('dragStepIDX', dragStartIDX, 'targetStepIDX', idx)
			gradientActions.dropLayerStepInfo({
				time,
				dragStartIDX,
				dropIDX: idx,
				saveHistoryYn: true,
				borderGradientMode: true
			})

		}
		setDummyDropTargetIDX(null)
		dragStartIDX = null
	}
	return (
		<div style={style.container}>
			<RedGradientStepEditorPreview data={borderGradientInfo} time={time} title={'Border Gradient Preview'}/>
			<RedGradientType onChange={HD_change} value={type}/>
			<RedDivision/>
			{
				!radialTypeYn
				&& <>
					<RedGradientDegree onChange={HD_changeInfo} value={valueInfo['angle']}/>
					<RedDivision/>
				</>
			}
			{
				radialTypeYn
				&& <>
					<RedGradientEndingShape onChange={HD_changeInfo} value={valueInfo['endingShape']}/>
					<RedDivision/>
					<RedGradientRadialSizeType onChange={HD_changeInfo} value={valueInfo['sizeType']}/>
					<RedDivision/>
				</>
			}
			{
				!linearTypeYn
				&& <>
					<RedGradientAt
						onChange={(targetInfoKey, key, value, saveHistoryYn) => {
							const newValue = JSON.parse(JSON.stringify(valueInfo['atInfo']))
							newValue[key] = value
							valueInfo['atInfo'] = newValue
							HD_changeInfo('valueInfo', 'atInfo', newValue, saveHistoryYn)
						}}
						unVisibleVisibleEditor={true}
						onChanges={(updateListInfo) => {

						}}
						atInfo={valueInfo['atInfo']}
						containerSizeInfo_raw={containerSizeInfo_raw}
						positionInfo={new DataRedPositionInfo()}
						sizeInfo={new DataRedSizeInfo(100, 100, ConstUnitPxPercent.PERCENT, ConstUnitPxPercent.PERCENT)}
					/>
					<RedDivision/>
				</>
			}
			<RedItemTitle
				label={
					<div style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
						color: 'inherit'
					}}>
						Steps
						<div style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
							<div className={'RedGradientStepEditor_addPreset'} onClick={() => {
								window.dispatchEvent(new CustomEvent('addUserBorderPreset', {
									detail: borderGradientInfo
								}))
								toast().dark(
									<RedToastSkin title={'Add custom gradient to your presets.'} text={borderGradientInfo['label']}/>,
									{
										position: 'bottom-left'
									}
								);
								alert('TODO')
							}}>
								<FontAwesomeIcon icon={faDownload}/>Add Preset
							</div>
							<RedToolTipIcon icon={faSort} style={{fontSize: '16px'}}
															toolTip={'Sort Steps'}
															onClick={HD_sortStep}
							/>
							<RedToolTipIcon icon={faExchangeAlt} style={{fontSize: '16px'}}
															toolTip={'Reverse Steps'}
															onClick={HD_reverseStep}
							/>
							<RedToolTipIcon icon={faFileMedical} style={{fontSize: '16px'}}
															toolTip={'Add Step'}
															onClick={HD_addStepInfo}
							/>
						</div>
					</div>
				}
			/>
			{stepInfoList.map((v, index) => {
				const activeYn = false
				return <div key={index}>
					<RedGradientStepEditorItem
						gradientType={type}
						stepInfoList={stepInfoList}
						groupIndex={0}
						groupLayerIndex={0}
						time={time}
						stepIDX={index}
						data={v}
						borderGradientMode={true}
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
	)
}
export default RedContainerBorderGradient
const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px',
		border: '1px solid #222',
		borderRadius: '8px',
		padding: '10px'
	}
}