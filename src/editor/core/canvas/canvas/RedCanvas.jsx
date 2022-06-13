import {useContext, useEffect} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import ConstCanvasViewKey from "../../../../data/const/ConstCanvasViewKey.js";
import './RedCanvas.css'
import PARSER_CanvasLayoutHelper from "./PARSER_CanvasLayoutHelper.js";
import RedContainerTransformEditor from "../containerTransformEditor/RedContainerTransformEditor.jsx";
import PARSER_CONTAINER_CSS from "../../../contexts/system/PARSER_CONTAINER_CSS.js";
import RedCanvasCross from "../etc/RedCanvasCross.jsx";
import RedCanvasDevice from "../etc/RedCanvasDevice.jsx";
import RedCanvasRuler from "../etc/RedCanvasRuler.jsx";
import getCalcedContainerEditorLayoutInfo_pixel from "../getCalcedContainerEditorLayoutInfo_pixel.js";
import ConstEditMode from "../../../../data/const/ConstEditMode";
import RedGradientTransformEditor from "../gradientTransformEditor/RedGradientTransformEditor";
import calcLayerGradientBlendMode from "../../../panels/layer/js/calcLayerGradientBlendMode";
import RedContainerBorderRadiusEditor from "../containerBorderRadiusEditor/RedContainerBorderRadiusEditor";
import RedGradientVisibleEditor from "../gradientTransformEditor/RedGradientVisibleEditor";
import RedGradientAtEditor from "../gradientTransformEditor/RedGradientAtEditor";
import calcGradientGroupList from "../../../panels/layer/js/calcGradientGroupList";

/**
 * 실제 그라디언트를 그리는 캔버스
 * @param viewKey
 * @param viewScale
 * @param viewOffset
 * @param deviceVisible
 * @param overflowHiddenYn
 * @param HD_ActiveWindow
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvas = ({
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
		const targetView = canvasInfo[viewKey]
		const {containerInfo} = targetView
		const {sizeInfo} = containerInfo
		gradientActions.updateCanvasViewOffset({
			viewKey,
			value: {
				x: -sizeInfo.width / 2 * viewScale,
				y: -sizeInfo.height / 2 * viewScale
			}
		})
	}, [])
	const {MAIN, BEFORE, AFTER} = ConstCanvasViewKey
	const {CONTAINER, GRADIENT, BORDER_RADIUS} = ConstEditMode
	const {canvasInfo} = state
	const time = state.timelineInfo.time
	const currentActiveView = canvasInfo[viewKey]
	const calcedLayoutSize = getCalcedContainerEditorLayoutInfo_pixel(state, viewScale)
	const current_LayoutInfo = calcedLayoutSize[viewKey]
	const deviceLayoutInfo = getDeviceLayoutInfo(state, viewKey, viewScale)

	//
	const renderContainer = (viewKey) => {
		const {raw, viewScalePixel} = current_LayoutInfo
		const targetView = canvasInfo[viewKey]
		return <div
			style={{
				position: 'absolute',
				...deviceLayoutInfo.viewScalePixel,
				overflow: overflowHiddenYn ? 'hidden' : '',
				zIndex: viewKey === BEFORE ? 1 : viewKey === MAIN ? 2 : 3,
				pointerEvents: 'none',
			}}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					transform: `translate(${(raw.x * viewScale - deviceLayoutInfo.raw.x)}px,${(raw.y * viewScale - deviceLayoutInfo.raw.y)}px)`,
					width: viewScalePixel.width,
					height: viewScalePixel.height
				}}>
				<div
					style={{
						border: targetView['editMode'] !== GRADIENT ? '1px dashed transparent' : `1px dashed ${targetView['editMode'] === CONTAINER ? '#5e7ade' : '#674496'}`,
						willChange: 'transform',
						position: 'absolute',
						width: viewScalePixel.width,
						height: viewScalePixel.height
					}}>
					<div className={'RedCanvas_viewKey'}>{viewKey}</div>
				</div>
				<div
					key={Math.random()}
					style={{
						position: "absolute",
						willChange: 'transform',
						width: raw.width * viewScale + 'px',
						height: raw.height * viewScale + 'px',
						...PARSER_CONTAINER_CSS.getBoxCss(targetView, false, viewScale),
						background: calcGradientGroupList(targetView, current_LayoutInfo, time, viewScale),
						backgroundBlendMode: calcLayerGradientBlendMode(targetView.layerGroupInfo.groupList)
					}}>

				</div>
			</div>
		</div>
	}
	const renderContainerDummyCanvas = (viewKey) => {
		let dummyMain_LayoutInfo
		let withView = canvasInfo[viewKey]['withView']
		dummyMain_LayoutInfo = calcedLayoutSize[MAIN]
		//
		return Object.values(ConstCanvasViewKey).filter(v => v !== viewKey).map((dummyKey, index) => {
			const targetView = canvasInfo[dummyKey]
			const dummyTarget_LayoutInfo = calcedLayoutSize[dummyKey]
			const dummyKeyIsMAIN = dummyKey === MAIN
			const dummyKeyIsBEFORE = dummyKey === BEFORE
			const dummyKeyIsAFTER = dummyKey === AFTER
			const deviceRawX = deviceLayoutInfo.raw.x
			const deviceRawY = deviceLayoutInfo.raw.y
			let topLeft
			switch (viewKey) {
				case MAIN:
					topLeft = {
						top: `${(dummyMain_LayoutInfo.raw.y + dummyTarget_LayoutInfo.raw.y) * viewScale - deviceRawY}px`,
						left: `${(dummyMain_LayoutInfo.raw.x + dummyTarget_LayoutInfo.raw.x) * viewScale - deviceRawX}px`
					}
					break
				case AFTER:
				case BEFORE:
					if (dummyKeyIsMAIN) {
						topLeft = {
							top: `${-deviceRawY}px`,
							left: `${-deviceRawX}px`,
						}
					} else {
						topLeft = {
							top: `${(dummyTarget_LayoutInfo.raw.y) * viewScale - deviceRawY}px`,
							left: `${(dummyTarget_LayoutInfo.raw.x) * viewScale - deviceRawX}px`
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
					zIndex: dummyKeyIsBEFORE ? 1 : dummyKeyIsMAIN ? 2 : 3,
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
							border: `1px dashed rgba(${dummyKeyIsMAIN ? 0 : dummyKeyIsAFTER ? 0 : 0},255,255,0.15)`,
							pointerEvents: 'none',
							...PARSER_CONTAINER_CSS.getBoxCss(targetView, false, viewScale),
							background: calcGradientGroupList(targetView, dummyTarget_LayoutInfo, time, viewScale),
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
				currentActiveView['editMode'] === CONTAINER &&
				<RedContainerTransformEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={currentActiveView}
					viewKey={viewKey}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}
			{
				currentActiveView['editMode'] === GRADIENT &&
				<RedGradientTransformEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={currentActiveView}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}
			{
				currentActiveView['editMode'] === GRADIENT &&
				<RedGradientAtEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={currentActiveView}
					viewKey={viewKey}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}
			{
				currentActiveView['editMode'] === BORDER_RADIUS &&
				<RedContainerBorderRadiusEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={currentActiveView}
					viewKey={viewKey}
					viewScale={viewScale}
				/>
			}
			{
				currentActiveView['visualGradientEditorVisible'] &&
				<RedGradientVisibleEditor
					calcedLayoutInfo={current_LayoutInfo}
					targetView={currentActiveView}
					viewScale={viewScale}
					HD_ActiveWindow={HD_ActiveWindow}
				/>
			}

			<RedCanvasDevice layoutInfo={deviceLayoutInfo} viewScale={viewScale} visible={deviceVisible}/>
			{renderContainer(viewKey)}
			{renderContainerDummyCanvas(viewKey)}
			<RedCanvasCross layoutInfo={deviceLayoutInfo} viewScale={viewScale}/>
			{currentActiveView.rulerVisible && <RedCanvasRuler layoutInfo={deviceLayoutInfo} viewScale={viewScale}/>}
		</div>
	)
}
export default RedCanvas
/**
 *
 * @param state
 * @param viewKey
 * @param viewScale
 * @returns {{origin, viewScalePixel: {top: string, left: string, x: string, width: string, y: string, height: string}, raw: {top: (number|number), left: (number|number), x: (number|number), width: number, y: (number|number), height: number}}}
 */
const getDeviceLayoutInfo = (state, viewKey, viewScale) => {
	const {canvasInfo, deviceInfo} = state
	const {sizeInfo} = deviceInfo
	const {MAIN} = ConstCanvasViewKey
	const mainYn = viewKey === MAIN
	const mainCalcCanvasPixelPosition = PARSER_CanvasLayoutHelper.calcCanvasContainerPixelPosition(canvasInfo, MAIN)
	//
	const raw = {
		x: mainYn ? 0 : -mainCalcCanvasPixelPosition.x * viewScale,
		y: mainYn ? 0 : -mainCalcCanvasPixelPosition.y * viewScale,
		left: mainYn ? 0 : -mainCalcCanvasPixelPosition.x * viewScale,
		top: mainYn ? 0 : -mainCalcCanvasPixelPosition.y * viewScale,
		width: sizeInfo.width * viewScale,
		height: sizeInfo.height * viewScale
	}
	return {
		raw,
		viewScalePixel: {
			x: raw.x + 'px',
			y: raw.y + 'px',
			left: raw.left + 'px',
			top: raw.top + 'px',
			width: raw.width + 'px',
			height: raw.height + 'px',
		},
		origin: deviceInfo.sizeInfo
	}
}