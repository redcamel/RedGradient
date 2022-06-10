import {useContext, useEffect} from "react";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import ConstCanvasViewKey from "../../../data/const/ConstCanvasViewKey.js";
import './RedCanvas.css'
import PARSER_CanvasLayoutHelper from "./PARSER_CanvasLayoutHelper.js";
import RedContainerTransformEditor from "./containerTransformEditor/RedContainerTransformEditor.jsx";
import PARSER_CONTAINER_CSS from "../../contexts/system/PARSER_CONTAINER_CSS.js";
import RedCanvasCross from "./etc/RedCanvasCross.jsx";
import RedCanvasDevice from "./etc/RedCanvasDevice.jsx";
import RedCanvasRuller from "./etc/RedCanvasRuller.jsx";
import getCalcedContainerEditorLayoutInfo_pixel from "./getCalcedContainerEditorLayoutInfo_pixel.js";
import calcLayerGradient from "../../panels/layer/calcLayerGradient.js";
import ConstEditMode from "../../../data/const/ConstEditMode";
import RedGradientTransformEditor from "./gradientTransformEditor/RedGradientTransformEditor";
import calcLayerGradientBlendMode from "../../panels/layer/calcLayerGradientBlendMode";
import RedContainerBorderRadiusEditor from "./containerBorderRadiusEditor/RedContainerBorderRadiusEditor";
import RedGradientVisibleEditor from "./gradientTransformEditor/RedGradientVisibleEditor";
import RedGradientAtEditor from "./gradientTransformEditor/RedGradientAtEditor";

/**
 * 실제 그라디언트를 그리는 캔버스
 * @param frameViewKey
 * @param viewKey
 * @param viewScale
 * @param viewOffset
 * @param deviceVisible
 * @param overflowHiddenYn
 * @returns {JSX.Element|null}
 * @constructor
 */
const RedCanvas = ({
										 frameViewKey,
										 viewKey,
										 viewScale = 1,
										 viewOffset = {x: 0, y: 0},
										 deviceVisible = true,
										 overflowHiddenYn = false,
										 HD_ActiveWindow
									 }) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	useEffect(() => {
		const {canvasInfo} = state
		const viewAllModeYn = false
		if (viewAllModeYn) {
		} else {
			const targetView = canvasInfo[viewKey]
			const {containerInfo} = targetView
			const {sizeInfo} = containerInfo
			gradientActions.updateCanvasViewOffset({
				viewKey,
				value: {x: -sizeInfo.width / 2 * viewScale, y: -sizeInfo.height / 2 * viewScale}
			})
		}
	}, [])
	const {canvasInfo} = state

	const targetView = canvasInfo[viewKey]
	const calcedLayoutSize = getCalcedContainerEditorLayoutInfo_pixel(state, viewScale)
	const current_LayoutInfo = calcedLayoutSize[viewKey]
	const deviceLayoutInfo = getDeviceLayoutInfo(state, viewKey, viewScale)
	//
	const renderContainer = (viewKey) => {

		return <div
			style={{
				position: 'absolute',
				...deviceLayoutInfo.viewScalePixel,
				// background : 'red',
				overflow: overflowHiddenYn ? 'hidden' : '',
				zIndex: viewKey === ConstCanvasViewKey.BEFORE ? 1 : viewKey === ConstCanvasViewKey.MAIN ? 2 : 3,
				pointerEvents: 'none',
			}}>

			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					transform: `translate(${(current_LayoutInfo.raw.x * viewScale - deviceLayoutInfo.raw.x)}px,${(current_LayoutInfo.raw.y * viewScale - deviceLayoutInfo.raw.y)}px)`,
					width: current_LayoutInfo.viewScalePixel.width,
					height: current_LayoutInfo.viewScalePixel.height
				}}>
				<div
					style={{
						// border: '1px dashed rgba(255, 255, 255, 0.5)',
						border: canvasInfo[viewKey]['editMode'] !== ConstEditMode.GRADIENT ? '1px dashed transparent' : `1px dashed ${canvasInfo[viewKey]['editMode'] === ConstEditMode.CONTAINER ? '#5e7ade' : '#674496'}`,
						willChange: 'transform',
						position: 'absolute',
						width: current_LayoutInfo.viewScalePixel.width,
						height: current_LayoutInfo.viewScalePixel.height
					}}>
					<div className={'RedCanvas_viewKey'}>{viewKey}</div>
				</div>
				<div
					key={Math.random()}
					style={{
						position: "absolute",
						willChange: 'transform',
						width: current_LayoutInfo.raw.width * viewScale + 'px',
						height: current_LayoutInfo.raw.height * viewScale + 'px',
						...PARSER_CONTAINER_CSS.getBoxCss(targetView, false, viewScale),
						background: targetView.layerGroupInfo.groupList.map(v => {
							return v['visibleYn'] ? v.children.map((v2, layerIndex) => {
								return v2['visibleYn'] ? calcLayerGradient(v2, state.timelineInfo.time, current_LayoutInfo, viewScale) : null
							}).filter(Boolean).join(',') : null
						}).filter(Boolean).join(',') + `, ${targetView.containerInfo['backgroundColor']}`,
						backgroundBlendMode: calcLayerGradientBlendMode(targetView.layerGroupInfo.groupList)
					}}>

				</div>
			</div>
		</div>
	}
	const renderContainerDummyCanvas = (viewKey) => {
		let dummyMain_LayoutInfo
		let withView = canvasInfo[viewKey]['withView']
		//
		dummyMain_LayoutInfo = calcedLayoutSize[ConstCanvasViewKey.MAIN]
		//
		return Object.values(ConstCanvasViewKey).filter(v => v !== viewKey).map((dummyKey, index) => {
			const targetView = canvasInfo[dummyKey]

			// console.log(dummyKey, canvasInfo, targetView)
			const dummyTarget_LayoutInfo = calcedLayoutSize[dummyKey]
			let topLeft
			switch (viewKey) {
				case ConstCanvasViewKey.MAIN:
					topLeft = {
						top: (dummyMain_LayoutInfo.raw.y + dummyTarget_LayoutInfo.raw.y) * viewScale - deviceLayoutInfo.raw.y + 'px',
						left: (dummyMain_LayoutInfo.raw.x + dummyTarget_LayoutInfo.raw.x) * viewScale - deviceLayoutInfo.raw.x + 'px'
					}
					break
				case ConstCanvasViewKey.AFTER:
					if (dummyKey === ConstCanvasViewKey.MAIN) {
						topLeft = {
							top: (-deviceLayoutInfo.raw.y) + 'px',
							left: (-deviceLayoutInfo.raw.x) + 'px'
						}
					} else {
						topLeft = {
							top: (dummyTarget_LayoutInfo.raw.y) * viewScale - deviceLayoutInfo.raw.y + 'px',
							left: (dummyTarget_LayoutInfo.raw.x) * viewScale - deviceLayoutInfo.raw.x + 'px'
						}
					}
					break
				case ConstCanvasViewKey.BEFORE:
					if (dummyKey === ConstCanvasViewKey.MAIN) {
						topLeft = {
							top: (-deviceLayoutInfo.raw.y) + 'px',
							left: (-deviceLayoutInfo.raw.x) + 'px'
						}
					} else {
						topLeft = {
							top: (dummyTarget_LayoutInfo.raw.y) * viewScale - deviceLayoutInfo.raw.y + 'px',
							left: (dummyTarget_LayoutInfo.raw.x) * viewScale - deviceLayoutInfo.raw.x + 'px'
						}
					}
					break
				default :
					break
			}
			if (!withView.includes(dummyKey)) return null
			return <div
				key={index}
				style={{
					position: 'absolute',
					...deviceLayoutInfo.viewScalePixel,
					// opacity: state.otherContainerDummyRenderYn ? 1 : 0,
					overflow: overflowHiddenYn ? 'hidden' : '',
					transition: 'outline 0.2s',
					outline: `1px dashed rgba(255,255,255,${state.otherContainerDummyRenderYn ? 0.25 : 0})`,
					pointerEvents: 'none',
					zIndex: dummyKey === ConstCanvasViewKey.BEFORE ? 1 : dummyKey === ConstCanvasViewKey.MAIN ? 2 : 3,
				}}>

				<div
					style={{
						position: 'absolute',
						...topLeft,
						width: dummyTarget_LayoutInfo.viewScalePixel.width,
						height: dummyTarget_LayoutInfo.viewScalePixel.height,
						pointerEvents: 'none'
					}}>
					<div
						key={Math.random()}
						style={{
							position: "absolute",
							willChange: 'transform',

							width: dummyTarget_LayoutInfo.viewScalePixel.width,
							height: dummyTarget_LayoutInfo.viewScalePixel.height,
							transform: `translate(-${(dummyTarget_LayoutInfo.viewScalePixel.width / 2)}px, calc(100% + 10px))`,
							// transform: `translate(${(current_LayoutInfo.raw.width * viewScale - current_LayoutInfo.raw.width) * 0.5}px,${((current_LayoutInfo.raw.height * viewScale - current_LayoutInfo.raw.height) * 0.5)}px) scale(${viewScale})`,
							// background: 'rgba(0,0,0,0.15)',
							border: `1px dashed rgba(${dummyKey === ConstCanvasViewKey.MAIN ? 0 : dummyKey === ConstCanvasViewKey.AFTER ? 0 : 0},255,255,0.15)`,
							pointerEvents: 'none',
							...PARSER_CONTAINER_CSS.getBoxCss(targetView, false, viewScale),
							background: targetView.layerGroupInfo.groupList.map(v => {
								return v['visibleYn'] ? v.children.map((v2, layerIndex) => {
									return v2['visibleYn'] ? calcLayerGradient(v2, state.timelineInfo.time, dummyTarget_LayoutInfo, viewScale) : null
								}).filter(Boolean) : null
							}).filter(Boolean).join(',') + `, ${targetView.containerInfo['backgroundColor']}`,
							backgroundBlendMode: calcLayerGradientBlendMode(targetView.layerGroupInfo.groupList)
						}}>
						<div className={'RedCanvas_viewKey'} style={{
							opacity: state.otherContainerDummyRenderYn ? 1 : 0,
							transition: 'opacity 0.2s',
						}}>{dummyKey}</div>
					</div>
				</div>
			</div>
		})
	}
	return (
		<div style={{transform: `translate(${(viewOffset.x)}px,${(viewOffset.y)}px)`}}>
			{
				canvasInfo[viewKey]['editMode'] === ConstEditMode.CONTAINER &&
				<RedContainerTransformEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={targetView}
					viewKey={viewKey}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}
			{
				canvasInfo[viewKey]['editMode'] === ConstEditMode.GRADIENT &&
				<RedGradientTransformEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={targetView}
					viewKey={viewKey}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}
			{
				canvasInfo[viewKey]['editMode'] === ConstEditMode.GRADIENT &&
				<RedGradientAtEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={targetView}
					viewKey={viewKey}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}
			{
				canvasInfo[viewKey]['visualGradientEditorVisible'] &&
				<RedGradientVisibleEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={targetView}
					viewKey={viewKey}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}
			{
				canvasInfo[viewKey]['editMode'] === ConstEditMode.BORDER_RADIUS &&
				<RedContainerBorderRadiusEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={targetView}
					viewKey={viewKey}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}
			<RedCanvasDevice layoutInfo={deviceLayoutInfo} viewScale={viewScale} visible={deviceVisible}/>
			{renderContainer(viewKey)}
			{
				renderContainerDummyCanvas(viewKey)
			}
			<RedCanvasCross layoutInfo={deviceLayoutInfo} viewScale={viewScale}/>
			<RedCanvasRuller layoutInfo={deviceLayoutInfo} viewScale={viewScale} visible={targetView.rulerVisible}/>
		</div>
	)
}
export default RedCanvas
/**
 * 디바이스의 레이아웃 정보를 계산해줌
 * @param state
 * @param viewKey
 * @returns {{raw: {top: (number|number), left: (number|number), x: (number|number), width, y: (number|number), height}, viewScalePixel: {top: (number|string), left: (number|string), x: (number|string), width: string, y: (number|string), height: string}}}
 */
const getDeviceLayoutInfo = (state, viewKey, viewScale) => {
	const {canvasInfo, deviceInfo} = state
	const {sizeInfo} = deviceInfo
	const mainCalcCanvasPixelPosition = PARSER_CanvasLayoutHelper.calcCanvasContainerPixelPosition(canvasInfo, ConstCanvasViewKey.MAIN)
	return {
		raw: {
			x: viewKey === ConstCanvasViewKey.MAIN ? 0 : -mainCalcCanvasPixelPosition.x * viewScale,
			y: viewKey === ConstCanvasViewKey.MAIN ? 0 : -mainCalcCanvasPixelPosition.y * viewScale,
			left: viewKey === ConstCanvasViewKey.MAIN ? 0 : -mainCalcCanvasPixelPosition.x * viewScale,
			top: viewKey === ConstCanvasViewKey.MAIN ? 0 : -mainCalcCanvasPixelPosition.y * viewScale,
			width: sizeInfo.width * viewScale,
			height: sizeInfo.height * viewScale
		},
		viewScalePixel: {
			x: viewKey === ConstCanvasViewKey.MAIN ? 0 : -mainCalcCanvasPixelPosition.x * viewScale + 'px',
			y: viewKey === ConstCanvasViewKey.MAIN ? 0 : -mainCalcCanvasPixelPosition.y * viewScale + 'px',
			left: viewKey === ConstCanvasViewKey.MAIN ? 0 : -mainCalcCanvasPixelPosition.x * viewScale + 'px',
			top: viewKey === ConstCanvasViewKey.MAIN ? 0 : -mainCalcCanvasPixelPosition.y * viewScale + 'px',
			width: sizeInfo.width * viewScale + 'px',
			height: sizeInfo.height * viewScale + 'px',
		},
		origin: deviceInfo.sizeInfo
	}
}