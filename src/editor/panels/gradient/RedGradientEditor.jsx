import './RedGradientEditor.css'
import RedPanelTitle from "../../basicUI/panel/RedPanelTitle.jsx";
import {faCopy, faPalette} from "@fortawesome/free-solid-svg-icons";
import RedDivision from "../../basicUI/RedDivision.jsx";
import HELPER_GET_DATA from "../../contexts/system/HELPER_GET_DATA.js";
import {useContext} from "react";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import calcGradientLayer from "../layer/js/calcGradientLayer.js";
import RedCssPreview from "../css/RedCssPreview.jsx";
import RedGradientDegree from "./degree/RedGradientDegree.jsx";
import RedGradientSize from "./size/RedGradientSize.jsx";
import RedGradientPosition from "./position/RedGradientPosition.jsx";
import RedGradientRepeat from "./repeat/RedGradientRepeat.jsx";
import RedGradientBlendMode from "./blendMode/RedGradientBlendMode.jsx";
import RedGradientType from "./gradientType/RedGradientType.jsx";
import RedGradientLabel from "./label/RedGradientLabel.jsx";
import ConstGradientType from "../../../data/const/ConstGradientType";
import getCalcedContainerEditorLayoutInfo_pixel from "../../core/canvas/getCalcedContainerEditorLayoutInfo_pixel";
import ConstUnitPxPercent from "../../../data/const/ConstUnitPxPercent";
import RedGradientEndingShape from "./endingShape/RedGradientEndingShape.jsx";
import RedGradientAt from "./at/RedGradientAt.jsx";
import RedGradientRadialSizeType from "./radialSizeType/RedGradientRadialSizeType.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import RedToastSkin from "../../core/RedToastSkin";

/**
 * RedGradientEditor
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientEditor = () => {
	const {state: gradientState, actions} = useContext(ContextGradient)
	const activeViewLayerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(gradientState)
	if (!activeViewLayerGroupInfo) return null
	const {activeGroupIndex, activeGroupLayerIndex} = activeViewLayerGroupInfo
	const activeLayerData = HELPER_GET_DATA.getActiveLayerInfo(gradientState)
	if (!activeLayerData) return null
	const {type: gradientType} = activeLayerData
	//////

	const time = gradientState['timelineInfo']['time']
	const {valueInfo, positionInfo, sizeInfo, stepInfoList} = activeLayerData['timeline'][time]
	const activeViewkey = HELPER_GET_DATA.getActiveViewInfo(gradientState)['viewKey']
	const containerSizeInfo_raw = getCalcedContainerEditorLayoutInfo_pixel(gradientState)[activeViewkey]['raw']
	const calcLayerPixelSize = HELPER_GET_DATA.calcLayerPixelSize(gradientState, activeLayerData, time)
	//////
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
			}
		}
		actions.updateLayerByKey(
			{
				key,
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
				value,
				saveHistoryYn
			}
		)
	}
	const HD_changeInfos = (updateListInfo, label) => {
		const updateList = []
		updateListInfo.forEach(v => {
			const {targetInfoKey, key, value, saveHistoryYn} = v
			updateList.push(
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
		})
		updateList.saveHistoryYn = true
		updateList.label = label
		actions.updateLayerValueInfoByKey(
			updateList
		)
	}
	const HD_changeInfo = (targetInfoKey, key, value, saveHistoryYn, label) => {
		const updateList = []
		if (key === 'widthUnit' || key === 'heightUnit') {

			const {containerW,containerH,layerSizeW, layerSizeH} = calcLayerPixelSize
			console.log('layerSizeW, layerSizeH',layerSizeW, layerSizeH)
			if(key==='widthUnit' && sizeInfo['widthUnit'] !== value){
				switch (value){
					case ConstUnitPxPercent.PX :
						updateList.push(
							{
								targetInfoKey,
								key: 'width',
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
								value: containerW * sizeInfo['width'] * 0.01,
								saveHistoryYn : false
							}
						)
						break
					case ConstUnitPxPercent.PERCENT :
						updateList.push(
							{
								targetInfoKey,
								key: 'width',
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
								value: layerSizeW/containerW * 100,
								saveHistoryYn : false
							}
						)
						break
				}
			}
			if(key==='heightUnit' && sizeInfo['heightUnit'] !== value){
				switch (value){
					case ConstUnitPxPercent.PX :
						updateList.push(
							{
								targetInfoKey,
								key: 'height',
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
								value: containerH * sizeInfo['height'] * 0.01,
								saveHistoryYn : false
							}
						)
						break
					case ConstUnitPxPercent.PERCENT :
						updateList.push(
							{
								targetInfoKey,
								key: 'height',
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
								value: layerSizeH/containerH * 100,
								saveHistoryYn : false
							}
						)
						break
				}
			}

		}
		if ((key === 'width' || key === 'height') && sizeInfo['useFixedRatio']) {
			const ratio = value / sizeInfo[key]
			if (key === 'width') {
				updateList.push(
					{
						targetInfoKey,
						key: 'height',
						time,
						groupIndex: activeGroupIndex,
						groupLayerIndex: activeGroupLayerIndex,
						value: sizeInfo['height'] * ratio,
						saveHistoryYn
					}
				)
			} else {
				updateList.push(
					{
						targetInfoKey,
						key: 'width',
						time,
						groupIndex: activeGroupIndex,
						groupLayerIndex: activeGroupLayerIndex,
						value: sizeInfo['width'] * ratio,
						saveHistoryYn
					}
				)
			}
		}
		updateList.push(
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
		updateList.label = label
		actions.updateLayerValueInfoByKey(
			updateList
		)
	}
	const radialTypeYn = gradientType === ConstGradientType.RADIAL || gradientType === ConstGradientType.REPEATING_RADIAL
	const linearTypeYn = gradientType === ConstGradientType.LINEAR || gradientType === ConstGradientType.REPEATING_LINEAR
	return (
		<div className={'RedGradientEditor_container'}>
			<RedPanelTitle label={'Gradient Editor'} icon={faPalette}/>
			<div className={'RedGradientEditor_middle'}>
				<RedGradientLabel onChange={HD_change} value={activeLayerData['label']}/>
				<RedDivision/>
				<RedGradientType onChange={HD_change} value={activeLayerData['type']}/>
				<RedDivision/>
				<RedGradientRepeat onChange={HD_change} value={activeLayerData['repeatType']}/>
				<RedDivision/>
				<RedGradientBlendMode onChange={HD_change} value={activeLayerData['blendMode']}/>
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
							onChange={(targetInfoKey, key, value, saveHistoryYn, label) => {
								const newValue = JSON.parse(JSON.stringify(valueInfo['atInfo']))
								newValue[key] = value
								valueInfo['atInfo'] = newValue
								HD_changeInfo('valueInfo', 'atInfo', newValue, saveHistoryYn, label)
							}}
							onChanges={(updateListInfo, label) => {
								const updateList = []
								updateList.saveHistoryYn = true
								updateList.label = label
								const newValue = JSON.parse(JSON.stringify(valueInfo['atInfo']))
								updateListInfo.forEach(v => {
									const {key, value} = v
									newValue[key] = value
									valueInfo['atInfo'] = newValue
								})
								updateList.push(
									{
										targetInfoKey: 'valueInfo',
										key: 'atInfo',
										time,
										groupIndex: activeGroupIndex,
										groupLayerIndex: activeGroupLayerIndex,
										value: newValue
									}
								)
								actions.updateLayerValueInfoByKey(
									updateList
								)
							}}
							atInfo={valueInfo['atInfo']}
							containerSizeInfo_raw={containerSizeInfo_raw}
							positionInfo={positionInfo}
							sizeInfo={sizeInfo}
						/>
						<RedDivision/>
					</>
				}

				<RedGradientSize onChange={HD_changeInfo} onChanges={HD_changeInfos} sizeInfo={sizeInfo}
												 containerSizeInfo_raw={containerSizeInfo_raw}/>
				<RedDivision/>
				<RedGradientPosition
					onChange={HD_changeInfo}
					onChanges={HD_changeInfos}
					positionInfo={positionInfo}
					sizeInfo={sizeInfo}
					calcLayerPixelSize={calcLayerPixelSize}
					containerSizeInfo_raw={containerSizeInfo_raw}
				/>
				<RedDivision/>
				<RedCssPreview label={'Container Css Preview'} codeStr={calcGradientLayer(activeLayerData)}/>
			</div>
			<div className={'RedGradientEditor_bottom'}>
				<div className={'RedLayerGroup_addTemplate'} onClick={() => {
					const tempElem = document.createElement('textarea');
					tempElem.value = calcGradientLayer(activeLayerData)
					document.body.appendChild(tempElem);
					tempElem.select();
					document.execCommand("copy");
					document.body.removeChild(tempElem);
					toast.dark(
						<RedToastSkin title={'Copy Layer Css!'}
													text={<>{activeViewLayerGroupInfo['groupList'][activeGroupIndex]['label']} > {activeLayerData['label']}</>}/>
						, {
							position: 'bottom-right'
						});
				}}>
					<FontAwesomeIcon
						icon={faCopy}
						style={{cursor: 'pointer'}}
						size={'1x'}
						fixedWidth={true}
					/>
					<span>Copy Layer Css</span>
				</div>
			</div>
		</div>
	)
}
export default RedGradientEditor