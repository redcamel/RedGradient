import './RedGradeintAtEditor.css'
import {useContext, useEffect, useState} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import getCalcedGradientEditorLayoutInfo_pixel from "../getCalcedGradientEditorLayoutInfo_pixel";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent";
import ConstEndingShape from "../../../../data/const/ConstEndingShape";
import ConstGradientType from "../../../../data/const/ConstGradientType";
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA";

let startMousePointX, startMousePointY
let startAtInfo
let tX, tY

const RedGradientAtEditor = ({calcedLayoutInfo, viewScale, targetView, HD_ActiveWindow}) => {
	const {state: gradientState, actions: gradientActions} = useContext(ContextGradient)
	const [dummyVisible, setDummyVisible] = useState(false)
	//

	const time = gradientState['timelineInfo']['time']
	const {layerGroupInfo} = targetView

	const {
		activeGroupIndex,
		activeGroupLayerIndex,
		groupList
	} = layerGroupInfo
	useEffect(() => {
		resetTempInfo(tX, tY)
	}, [])
	useEffect(() => {

			const HD_up = (e) => {
				const payload = []
				payload.saveHistoryYn = true
				gradientActions.updateLayerValueInfoByKey(payload)
				tX = e.pageX - startMousePointX;
				tY = e.pageY - startMousePointY;
				setDummyVisible(false)

			};
			const HD_move = (e) => {

				e.preventDefault()
				e.stopPropagation()
				tX = (e.pageX - startMousePointX) / viewScale;
				tY = (e.pageY - startMousePointY) / viewScale;
				tX = startAtInfo['xUnit'] === ConstUnitPxPercent.PERCENT ? tX / layerSizeW * 100 : tX
				tY = startAtInfo['yUnit'] === ConstUnitPxPercent.PERCENT ? tY / layerSizeH * 100 : tY
				const calcX = startAtInfo['x'] + tX
				const calcY = startAtInfo['y'] + tY

				const updateList = []
				updateList.push(
					{
						targetInfoKey: 'valueInfo',
						key: 'atInfo',
						time,
						groupIndex: activeGroupIndex,
						groupLayerIndex: activeGroupLayerIndex,
						value: {
							x: calcX,
							y: calcY,
							xUnit: startAtInfo['xUnit'],
							yUnit: startAtInfo['yUnit']
						},
						saveHistoryYn: false
					}
				)
				gradientActions.updateLayerValueInfoByKey(
					updateList
				)
			};
			if (dummyVisible) {
				window.addEventListener('mousemove', HD_move, true);
				window.addEventListener('mouseup', HD_up, true);
			}
			return () => {
				window.removeEventListener('mousemove', HD_move, true);
				window.removeEventListener('mouseup', HD_up, true);
			}
		}, [dummyVisible]
	)
	if (!groupList[activeGroupIndex] || !groupList[activeGroupIndex]['children'][activeGroupLayerIndex]) return null;

	const gradientType = groupList[activeGroupIndex]['children'][activeGroupLayerIndex]['type']
	const activeLayer = groupList[activeGroupIndex]['children'][activeGroupLayerIndex]['timeline'][time]
	//
	const gradient_calcedLayoutInfo = getCalcedGradientEditorLayoutInfo_pixel(targetView.containerInfo, activeLayer, calcedLayoutInfo, viewScale)
	const {
		layerSizeW,
		layerSizeH
	} = HELPER_GET_DATA.calcLayerPixelSize(gradientState, HELPER_GET_DATA.getActiveLayerInfo(gradientState));
	const {valueInfo} = activeLayer
	const {atInfo, endingShape} = valueInfo
	const resetTempInfo = (x, y) => {
		startMousePointX = x
		startMousePointY = y
		startAtInfo = JSON.parse(JSON.stringify(atInfo))
	}
	const HD_resizeStart = (e) => {
		HD_ActiveWindow?.()
		e.nativeEvent.preventDefault()
		e.nativeEvent.stopPropagation()
		resetTempInfo(e.nativeEvent.pageX, e.nativeEvent.pageY)
		setDummyVisible(true)
		gradientActions.setOtherContainerDummyRenderYn(true)
	}

	return <>
		<div
			className={'RedGradientAtEditor'}
			style={{
				top: 0,
				left: 0,
				transform: `translate(${((parseFloat(gradient_calcedLayoutInfo.viewScalePixel.x)))}px,${((parseFloat(gradient_calcedLayoutInfo.viewScalePixel.y)))}px)`,
				width: gradient_calcedLayoutInfo.viewScalePixel.width,
				height: gradient_calcedLayoutInfo.viewScalePixel.height,
			}}
		>

			{
				!(gradientType === ConstGradientType.LINEAR || gradientType === ConstGradientType.REPEATING_LINEAR) &&
				<div className={'RedGradientAtEditor_center'}
						 onMouseDownCapture={e => HD_resizeStart(e)}
						 style={{
							 top: (atInfo['y'] * (atInfo['yUnit'] === ConstUnitPxPercent.PX ? viewScale : 1)) + atInfo['yUnit'],
							 left: (atInfo['x'] * (atInfo['xUnit'] === ConstUnitPxPercent.PX ? viewScale : 1)) + atInfo['xUnit'],
							 height: endingShape === ConstEndingShape.ELLIPSE ? (gradient_calcedLayoutInfo.raw.height / gradient_calcedLayoutInfo.raw.width * 40 + 'px') : '40px'
						 }}
				/>
			}
		</div>
	</>
}
export default RedGradientAtEditor