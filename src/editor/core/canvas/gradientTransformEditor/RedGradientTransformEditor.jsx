import './RedGradeintTransformEditor.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowLeft, faArrowRight, faArrowsAlt, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import RedDivision from "../../../basicUI/RedDivision.jsx";
import getCalcedGradientEditorLayoutInfo_pixel from "../getCalcedGradientEditorLayoutInfo_pixel";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent";

let startMousePointX, startMousePointY
let tX, tY
let startDummyPositionX_calced, startDummyPositionY_calced
let startContainerW_calced, startContainerH_calced
let dummyPositionX, dummyPositionY
let horizontalDirection, verticalDirection
let resizeMode
let dummyWidth, dummyHeight
let startSizeInfo, startPositionInfo
const snapSize = 10
const RedGradientTransformEditor = ({calcedLayoutInfo, viewScale, targetView, HD_ActiveWindow}) => {
	const {state: gradientState, actions: gradientActions} = useContext(ContextGradient)
	const [dummyVisible, setDummyVisible] = useState(false)
	const [resizeKey, setResizeKey] = useState({})
	//

	const time = gradientState['timelineInfo']['time']
	const {layerGroupInfo} = targetView
	const valueSnapToContainer = gradientState['snapToContainer']
	const {
		activeGroupIndex,
		activeGroupLayerIndex,
		groupList
	} = layerGroupInfo
	useEffect(() => {
		resetTempInfo(tX, tY)
	}, [])
	useEffect(() => {
		resetTempInfo(tX, tY)
		const updateList = []
		updateList.push(
			{
				targetInfoKey: 'sizeInfo',
				key: 'width',
				time,
				value: startSizeInfo['width'],
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
			},
			{
				targetInfoKey: 'positionInfo',
				key: 'x',
				time,
				value: startPositionInfo['x'],
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
			},
			{
				targetInfoKey: 'sizeInfo',
				key: 'height',
				time,
				value: startSizeInfo['height'],
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
			},
			{
				targetInfoKey: 'positionInfo',
				key: 'y',
				time,
				value: startPositionInfo['y'],
				groupIndex: activeGroupIndex,
				groupLayerIndex: activeGroupLayerIndex,
			}
		)
		gradientActions.updateLayerValueInfoByKey(
			updateList
		)
	}, [window.RedKey.downList.alt, window.RedKey.downList.shift])
	useEffect(() => {

			const HD_up = (e) => {
				if (resizeMode) {
					const payload = []
					payload.saveHistoryYn = true
					gradientActions.updateLayerValueInfoByKey(payload)
				} else {
					console.log('window.RedKey', JSON.stringify(window.RedKey.downList))
					if (window.RedKey['downList']['alt']) {
						gradientActions.duplicateLayer({
							groupIndex: activeGroupIndex,
							groupLayerIndex: activeGroupLayerIndex
						})
						const updateList = []
						updateList.push(
							{
								targetInfoKey: 'sizeInfo',
								key: 'width',
								time,
								value: startSizeInfo['width'],
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex + 1,
							},
							{
								targetInfoKey: 'positionInfo',
								key: 'x',
								time,
								value: startPositionInfo['x'],
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex + 1,
							},
							{
								targetInfoKey: 'sizeInfo',
								key: 'height',
								time,
								value: startSizeInfo['height'],
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex + 1,
							},
							{
								targetInfoKey: 'positionInfo',
								key: 'y',
								time,
								value: startPositionInfo['y'],
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex + 1,
							}
						)
						gradientActions.updateLayerValueInfoByKey(
							updateList
						)
						gradientActions.setActiveGroupAndLayer(
							{activeGroupIndex: activeGroupIndex, activeGroupLayerIndex: activeGroupLayerIndex}
						)
					} else {
						const payload = []
						payload.saveHistoryYn = true
						gradientActions.updateLayerValueInfoByKey(payload)
					}
				}

				tX = e.pageX;
				tY = e.pageY;
				resizeMode = false
				horizontalDirection = null
				verticalDirection = null
				setResizeKey({})
				setDummyVisible(false)
				gradientActions.setOtherContainerDummyRenderYn(false)
			};
			const HD_move = (e) => {
				e.preventDefault()
				e.stopPropagation()
				tX = e.pageX;
				tY = e.pageY;
				const {alt} = window.RedKey.downList
				const {sizeInfo, positionInfo} = gradient_calcedLayoutInfo
				const useFixedRatio = window.RedKey.downList['shift'] || sizeInfo.useFixedRatio
				const updateList = []
				const convertPxToPercent_size = (calced_px, sizeInfoKey) => {
					let calced_unit = calced_px
					if (sizeInfo[`${sizeInfoKey}Unit`] === ConstUnitPxPercent.PERCENT) {
						calced_unit = calced_px / calcedLayoutInfo.raw[sizeInfoKey] * 100
					}
					return calced_unit
				}
				const calcShift = (calced_width_px) => {
					if (useFixedRatio && verticalDirection) {
						const ratio = dummyHeight / dummyWidth
						const calced_height_px = calced_width_px * ratio
						const calced_height_unit = convertPxToPercent_size(calced_height_px, 'height')
						updateList.push(
							{
								targetInfoKey: 'sizeInfo',
								key: 'height',
								value: calced_height_unit,
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
							}
						)
						const gap = dummyHeight - calced_height_px
						let calced_y_px
						let calced_y_unit
						if (alt) {
							dummyPositionY = -gap * 0.5
							calced_y_px = (startDummyPositionY_calced) + gap * 0.5
						} else {
							if (verticalDirection === 'T') {
								dummyPositionY = -gap
								calced_y_px = (startDummyPositionY_calced) + gap
							} else {
								calced_y_px = (startDummyPositionY_calced)
							}
						}
						//
						if (positionInfo['yUnit'] === ConstUnitPxPercent.PERCENT) {
							calced_y_unit = calced_y_px / ((startContainerH_calced - calced_height_px)) * 100
						} else {
							calced_y_unit = calced_y_px
						}
						//
						updateList.push(
							{
								targetInfoKey: 'positionInfo',
								key: 'y',
								value: calced_y_unit,
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
							}
						)
					}
				}
				const resizeByTop = () => {
					let calced_height_px, calced_height_unit
					if (resizeMode) {
						calced_height_px = Math.max(0, dummyHeight - (tY - startMousePointY) * (alt ? 2 : 1) / viewScale)
						calced_height_unit = convertPxToPercent_size(calced_height_px, 'height')
						{
							// snap
							const layoutTop = 0
							const gradientTop = startDummyPositionY_calced - (calced_height_px - dummyHeight)
							if (valueSnapToContainer && Math.abs(layoutTop - gradientTop) < snapSize) {
								calced_height_px -= layoutTop - gradientTop
								calced_height_unit = convertPxToPercent_size(calced_height_px, 'height')
							}
						}
						updateList.push(
							{
								targetInfoKey: 'sizeInfo',
								key: 'height',
								value: calced_height_unit,
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
							}
						)
						let calced_y_px, calced_y_unit
						const gap = dummyHeight - calced_height_px
						if (alt) {
							dummyPositionY = -gap * 0.5
							calced_y_px = (startDummyPositionY_calced) + gap * 0.5
						} else {
							dummyPositionY = -gap
							calced_y_px = (startDummyPositionY_calced) + gap
						}
						if (positionInfo['yUnit'] === ConstUnitPxPercent.PERCENT) {
							calced_y_unit = calced_y_px / ((startContainerH_calced - calced_height_px)) * 100
						} else {
							calced_y_unit = calced_y_px
						}
						updateList.push(
							{
								targetInfoKey: 'positionInfo',
								key: 'y',
								value: calced_y_unit,
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
							}
						)
						calcShift(calced_height_px)
					}
				}
				const resizeByBottom = () => {
					let calced_height_px, calced_height_unit
					if (resizeMode) {
						calced_height_px = Math.max(0, dummyHeight + (tY - startMousePointY) * (alt ? 2 : 1) / viewScale)
						calced_height_unit = convertPxToPercent_size(calced_height_px, 'height')

						{
							// snap
							const layoutBottom = calcedLayoutInfo.raw.height
							const gradientBottom = startDummyPositionY_calced + calced_height_px
							if (valueSnapToContainer && Math.abs(layoutBottom - gradientBottom) < snapSize) {
								calced_height_px += layoutBottom - gradientBottom
								calced_height_unit = convertPxToPercent_size(calced_height_px, 'height')
							}
						}
						updateList.push(
							{
								targetInfoKey: 'sizeInfo',
								key: 'height',
								value: calced_height_unit,
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
							}
						)
						let calced_y_px, calced_y_unit
						const gap = dummyHeight - calced_height_px
						if (alt) {
							dummyPositionY = -gap * 0.5
							if (positionInfo['yUnit'] === ConstUnitPxPercent.PX) {
								calced_y_px = startDummyPositionY_calced + gap * 0.5
								calced_y_unit = calced_y_px
							} else {
								dummyPositionY = -gap * 0.5
								calced_y_px = (startDummyPositionY_calced) + gap * 0.5
								calced_y_unit = calced_y_px / ((startContainerH_calced - calced_height_px)) * 100
							}
							updateList.push(
								{
									targetInfoKey: 'positionInfo',
									key: 'y',
									value: calced_y_unit,
									time,
									groupIndex: activeGroupIndex,
									groupLayerIndex: activeGroupLayerIndex,
								}
							)
						} else {
							if (positionInfo['yUnit'] === ConstUnitPxPercent.PERCENT) {
								const tempY = (startDummyPositionY_calced)
								calced_y_unit = tempY / ((startContainerH_calced - calced_height_px)) * 100
								updateList.push(
									{
										targetInfoKey: 'positionInfo',
										key: 'y',
										value: calced_y_unit,
										time,
										groupIndex: activeGroupIndex,
										groupLayerIndex: activeGroupLayerIndex,
									}
								)
							}
						}
					}
				}
				const resizeByLeft = () => {
					let calced_width_px, calced_width_unit
					if (resizeMode) {
						calced_width_px = Math.max(0, dummyWidth - (tX - startMousePointX) * (alt ? 2 : 1) / viewScale)
						calced_width_unit = convertPxToPercent_size(calced_width_px, 'width')
						{
							// snap
							const layoutLeft = 0
							const gradientLeft = startDummyPositionX_calced - (calced_width_px - dummyWidth)
							if (valueSnapToContainer && Math.abs(layoutLeft - gradientLeft) < snapSize) {
								calced_width_px -= layoutLeft - gradientLeft
								calced_width_unit = convertPxToPercent_size(calced_width_px, 'width')
							}
						}
						updateList.push(
							{
								targetInfoKey: 'sizeInfo',
								key: 'width',
								value: calced_width_unit,
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
							}
						)
						let calced_x_px, calced_x_unit
						const gap = dummyWidth - calced_width_px
						if (alt) {
							dummyPositionX = -gap * 0.5
							calced_x_px = (startDummyPositionX_calced) + gap * 0.5
						} else {
							dummyPositionX = -gap
							calced_x_px = (startDummyPositionX_calced) + gap
						}
						if (positionInfo['xUnit'] === ConstUnitPxPercent.PERCENT) {
							calced_x_unit = calced_x_px / ((startContainerW_calced - calced_width_px)) * 100
						} else {
							calced_x_unit = calced_x_px
						}
						updateList.push(
							{
								targetInfoKey: 'positionInfo',
								key: 'x',
								value: calced_x_unit,
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
							}
						)
						calcShift(calced_width_px)
					}
				}
				const resizeByRight = () => {
					let calced_width_px, calced_width_unit
					if (resizeMode) {
						calced_width_px = Math.max(0, dummyWidth + (tX - startMousePointX) * (alt ? 2 : 1) / viewScale)
						calced_width_unit = convertPxToPercent_size(calced_width_px, 'width')
						{
							// snap
							const layoutRight = calcedLayoutInfo.raw.width
							const gradientRight = startDummyPositionX_calced + calced_width_px
							if (valueSnapToContainer && Math.abs(layoutRight - gradientRight) < snapSize) {
								calced_width_px += layoutRight - gradientRight
								calced_width_unit = convertPxToPercent_size(calced_width_px, 'width')
							}
						}
						updateList.push(
							{
								targetInfoKey: 'sizeInfo',
								key: 'width',
								value: calced_width_unit,
								time,
								groupIndex: activeGroupIndex,
								groupLayerIndex: activeGroupLayerIndex,
							}
						)
						let calced_x_px, calced_x_unit
						const gap = dummyWidth - calced_width_px
						if (alt) {
							dummyPositionX = -gap * 0.5
							if (positionInfo['xUnit'] === ConstUnitPxPercent.PX) {
								calced_x_px = startDummyPositionX_calced + gap * 0.5
								calced_x_unit = calced_x_px
							} else {
								dummyPositionX = -gap * 0.5
								calced_x_px = (startDummyPositionX_calced) + gap * 0.5
								calced_x_unit = calced_x_px / ((startContainerW_calced - calced_width_px)) * 100
							}
							updateList.push(
								{
									targetInfoKey: 'positionInfo',
									key: 'x',
									value: calced_x_unit,
									time,
									groupIndex: activeGroupIndex,
									groupLayerIndex: activeGroupLayerIndex,
								}
							)
						} else {
							if (positionInfo['xUnit'] === ConstUnitPxPercent.PERCENT) {
								const tempX = (startDummyPositionX_calced)
								calced_x_unit = tempX / ((startContainerW_calced - calced_width_px)) * 100
								updateList.push(
									{
										targetInfoKey: 'positionInfo',
										key: 'x',
										value: calced_x_unit,
										time,
										groupIndex: activeGroupIndex,
										groupLayerIndex: activeGroupLayerIndex,
									}
								)
							}
						}
						calcShift(calced_width_px)
					}
				}
				const moveH = () => {
					const calced_width_px = dummyWidth - (tX - startMousePointX) / viewScale * 2
					const gap = dummyWidth - calced_width_px
					let calced_x_px
					let calced_x_unit
					//

					if (positionInfo['xUnit'] === ConstUnitPxPercent.PX) {
						dummyPositionX = -gap * 0.5
						calced_x_px = (startDummyPositionX_calced) + gap * 0.5
						calced_x_unit = calced_x_px
					} else {
						dummyPositionX = -gap * 0.5
						calced_x_px = (startDummyPositionX_calced) + gap * 0.5
						calced_x_unit = calced_x_px / ((startContainerW_calced - dummyWidth)) * 100
					}
					{
						// snap left
						const layoutLeft = 0
						const gradientLeft = calced_x_px
						if (valueSnapToContainer && Math.abs(layoutLeft - gradientLeft) < snapSize) {
							calced_x_px = 0
							calced_x_unit = calced_x_px / ((startContainerW_calced - dummyWidth)) * 100
							dummyPositionX -= layoutLeft - gradientLeft
						}
					}
					{
						// snap right
						const layoutRight = calcedLayoutInfo.raw.width
						const gradientRight = calced_x_px + dummyWidth
						if (valueSnapToContainer && Math.abs(layoutRight - gradientRight) < snapSize) {
							calced_x_px = layoutRight - dummyWidth
							if (positionInfo['xUnit'] === ConstUnitPxPercent.PX) calced_x_unit = calced_x_px
							else calced_x_unit = calced_x_px / (layoutRight - dummyWidth) * 100
							dummyPositionX -= (layoutRight - gradientRight)
						}
					}
					updateList.push(
						{
							targetInfoKey: 'positionInfo',
							key: 'x',
							value: calced_x_unit,
							time,
							groupIndex: activeGroupIndex,
							groupLayerIndex: activeGroupLayerIndex,
						}
					)
					//
				}
				const moveV = () => {
					const calced_height_px = dummyHeight - (tY - startMousePointY) / viewScale * 2
					const gap = dummyHeight - calced_height_px
					let calced_y_px
					let calced_y_unit
					//
					if (positionInfo['yUnit'] === ConstUnitPxPercent.PX) {
						dummyPositionY = -gap * 0.5
						calced_y_px = (startDummyPositionY_calced) + gap * 0.5
						calced_y_unit = calced_y_px
					} else {
						dummyPositionY = -gap * 0.5
						calced_y_px = (startDummyPositionY_calced) + gap * 0.5
						calced_y_unit = calced_y_px / ((startContainerH_calced - dummyHeight)) * 100
					}
					{
						// snap top
						const layoutTop = 0
						const gradientTop = calced_y_px
						if (valueSnapToContainer && Math.abs(layoutTop - gradientTop) < snapSize) {
							calced_y_px = 0
							calced_y_unit = calced_y_px / ((startContainerH_calced - dummyHeight)) * 100
							dummyPositionY -= layoutTop - gradientTop
						}
					}
					{
						// snap bottom
						const layoutBottom = calcedLayoutInfo.raw.height
						const gradientBottom = calced_y_px + dummyHeight
						if (valueSnapToContainer && Math.abs(layoutBottom - gradientBottom) < snapSize) {
							calced_y_px = layoutBottom - dummyHeight
							if (positionInfo['yUnit'] === ConstUnitPxPercent.PX) calced_y_unit = calced_y_px
							else calced_y_unit = calced_y_px / (layoutBottom - dummyHeight) * 100
							dummyPositionY -= (layoutBottom - gradientBottom)
						}
					}

					updateList.push(
						{
							targetInfoKey: 'positionInfo',
							key: 'y',
							value: calced_y_unit,
							time,
							groupIndex: activeGroupIndex,
							groupLayerIndex: activeGroupLayerIndex,
						}
					)
				}
				if (resizeMode) {
					if (verticalDirection && horizontalDirection) {
						switch (verticalDirection) {
							case 'B' : {
								if (!useFixedRatio) resizeByBottom()
								break
							}
							case 'T' : {
								if (!useFixedRatio) resizeByTop()
								break
							}
							default :
								break
						}
					} else {
						switch (verticalDirection) {
							case 'B' : {
								resizeByBottom()
								break
							}
							case 'T' : {
								resizeByTop()
								break
							}
							default :
								break
						}
					}
					switch (horizontalDirection) {
						case 'R' : {
							resizeByRight()
							break
						}
						case 'L' : {
							resizeByLeft()
							break
						}
						default :
							break
					}
				} else {
					switch (verticalDirection) {
						case 'B' : {
							moveV()
							break
						}
						case 'T' : {
							moveV()
							break
						}
						default :
							break
					}
					switch (horizontalDirection) {
						case 'R' : {
							moveH()
							break
						}
						case 'L' : {
							moveH()
							break
						}
						default :
							break
					}
				}
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

	const activeLayer = groupList[activeGroupIndex]['children'][activeGroupLayerIndex]['timeline'][time]
	//
	const gradient_calcedLayoutInfo = getCalcedGradientEditorLayoutInfo_pixel(targetView.containerInfo, activeLayer, calcedLayoutInfo, viewScale)
	const raw = {...gradient_calcedLayoutInfo.raw}
	const {sizeInfo, positionInfo} = activeLayer
	const resetTempInfo = (x, y) => {
		startMousePointX = x
		startMousePointY = y
		dummyPositionX = 0
		dummyPositionY = 0
		dummyWidth = raw.width
		dummyHeight = raw.height
		startDummyPositionX_calced = gradient_calcedLayoutInfo.raw.x - calcedLayoutInfo.raw.x
		startDummyPositionY_calced = gradient_calcedLayoutInfo.raw.y - calcedLayoutInfo.raw.y
		startContainerW_calced = calcedLayoutInfo.raw.width
		startContainerH_calced = calcedLayoutInfo.raw.height
		startSizeInfo = JSON.parse(JSON.stringify(sizeInfo))
		startPositionInfo = JSON.parse(JSON.stringify(positionInfo))
	}
	const HD_resizeStart = (e, hDirection, vDirection, resizeYn) => {
		HD_ActiveWindow?.()
		setResizeKey({vDirection, hDirection})
		resizeMode = resizeYn
		horizontalDirection = hDirection
		verticalDirection = vDirection
		e.nativeEvent.preventDefault()
		e.nativeEvent.stopPropagation()
		resetTempInfo(e.nativeEvent.pageX, e.nativeEvent.pageY)
		setDummyVisible(true)
		gradientActions.setOtherContainerDummyRenderYn(true)
	}

	const transformPointerVisible = !resizeMode && !horizontalDirection && !verticalDirection
	const {useFixedRatio} = sizeInfo
	return <>
		{
			dummyVisible && <div
				className={'RedGradientTransformEditor'}
				style={{
					top: 0,
					left: 0,
					border: 0,
					transform: `translate(${(parseFloat(gradient_calcedLayoutInfo.viewScalePixel.x))}px,${(parseFloat(gradient_calcedLayoutInfo.viewScalePixel.y))}px)`,
					width: gradient_calcedLayoutInfo.viewScalePixel.width,
					height: gradient_calcedLayoutInfo.viewScalePixel.height,
				}}
			>
				<div
					className={'RedGradientTransformEditor_dummy'}
					style={{
						top: 0,
						left: 0,
						transform: `translate(${(dummyPositionX) * viewScale}px,${(dummyPositionY) * viewScale}px)`,
						width: dummyWidth * viewScale + 'px',
						height: dummyHeight * viewScale + 'px'
					}}
				/>
			</div>
		}

		<div
			className={'RedGradientTransformEditor'}
			style={{
				top: 0,
				left: 0,
				transform: `translate(${(parseInt(parseFloat(gradient_calcedLayoutInfo.viewScalePixel.x)))}px,${(parseInt(parseFloat(gradient_calcedLayoutInfo.viewScalePixel.y)))}px)`,
				width: gradient_calcedLayoutInfo.viewScalePixel.width,
				height: gradient_calcedLayoutInfo.viewScalePixel.height,
			}}
		>
			{/*{JSON.stringify(window.RedKey.downList)}*/}
			{/*dummyPositionX : {dummyPositionX}*/}
			{/*dummyPositionY : {dummyPositionY}*/}
			<div
				className={`RedGradientTransformEditor_item ${transformPointerVisible || (resizeMode && horizontalDirection === 'L' && verticalDirection === 'T') ? '' : 'deActive'} lt`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', 'T', true)}
			/>
			<div
				className={`RedGradientTransformEditor_item ${!useFixedRatio && (transformPointerVisible || (resizeMode && !horizontalDirection && verticalDirection === 'T')) ? '' : 'deActive'} t`}
				onMouseDownCapture={e => HD_resizeStart(e, null, 'T', true)}
			/>
			<div
				className={`RedGradientTransformEditor_item ${transformPointerVisible || (resizeMode && horizontalDirection === 'R' && verticalDirection === 'T') ? '' : 'deActive'} rt`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', 'T', true)}
			/>
			<div
				className={`RedGradientTransformEditor_item ${!useFixedRatio && (transformPointerVisible || (resizeMode && horizontalDirection === 'L' && !verticalDirection)) ? '' : 'deActive'} lm`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', null, true)}
			/>
			<div
				className={`RedGradientTransformEditor_item ${!useFixedRatio && (transformPointerVisible || (resizeMode && horizontalDirection === 'R' && !verticalDirection)) ? '' : 'deActive'} rm`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', null, true)}
			/>
			<div
				className={`RedGradientTransformEditor_item ${transformPointerVisible || (resizeMode && horizontalDirection === 'L' && verticalDirection === 'B') ? '' : 'deActive'} lb`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', 'B', true)}
			/>
			<div
				className={`RedGradientTransformEditor_item ${!useFixedRatio && (transformPointerVisible || (resizeMode && !horizontalDirection && verticalDirection === 'B')) ? '' : 'deActive'} b`}
				onMouseDownCapture={e => HD_resizeStart(e, null, 'B', true)}
			/>
			<div
				className={`RedGradientTransformEditor_item ${transformPointerVisible || (resizeMode && horizontalDirection === 'R' && verticalDirection === 'B') ? '' : 'deActive'} rb`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', 'B', true)}
			/>
			{/*  */}
			<div
				className={`RedGradientTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'L' && verticalDirection === 'T') ? '' : 'deActive'} lt`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', 'T', false)}
			>
				<FontAwesomeIcon icon={faArrowsAlt} size={'1x'}/>
			</div>
			<div
				className={`RedGradientTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'R' && verticalDirection === 'T') ? '' : 'deActive'} rt`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', 'T', false)}
			>
				<FontAwesomeIcon icon={faArrowsAlt} size={'1x'}/>
			</div>
			<div
				className={`RedGradientTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'L' && verticalDirection === 'B') ? '' : 'deActive'} lb`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', 'B', false)}
			>
				<FontAwesomeIcon icon={faArrowsAlt} size={'1x'}/>
			</div>

			<div
				className={`RedGradientTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'R' && verticalDirection === 'B') ? '' : 'deActive'} rb`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', 'B', false)}
			>
				<FontAwesomeIcon icon={faArrowsAlt} size={'1x'}/>
			</div>

			<div
				className={`RedGradientTransformEditor_item_move ${transformPointerVisible || (!resizeMode && (horizontalDirection === 'L' && !verticalDirection)) ? '' : 'deActive'} left`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', null, false)}
			>
				<FontAwesomeIcon icon={faArrowLeft}/>
			</div>

			<div
				className={`RedGradientTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'R' && !verticalDirection) ? '' : 'deActive'} right`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', null, false)}
			>
				<FontAwesomeIcon icon={faArrowRight}/>
			</div>
			<div
				className={`RedGradientTransformEditor_item_move ${transformPointerVisible || (!resizeMode && !horizontalDirection && verticalDirection === 'T') ? '' : 'deActive'} top`}
				onMouseDownCapture={e => HD_resizeStart(e, null, 'T', false)}
			>
				<FontAwesomeIcon icon={faArrowUp}/>
			</div>

			<div
				className={`RedGradientTransformEditor_item_move ${transformPointerVisible || (!resizeMode && !horizontalDirection && verticalDirection === 'B') ? '' : 'deActive'} bottom`}
				onMouseDownCapture={e => HD_resizeStart(e, null, 'B', false)}
			>
				<FontAwesomeIcon icon={faArrowDown}/>
			</div>

		</div>

		<div
			className={`RedGradientTransformEditor_info ${dummyVisible ? 'active' : ''} `}
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				zIndex: 4,
				transform: `translate(
					calc(
					${
					resizeKey.hDirection === 'L'
						? (gradient_calcedLayoutInfo.raw.x) * viewScale
						: resizeKey.hDirection === 'R'
							? (gradient_calcedLayoutInfo.raw.x + gradient_calcedLayoutInfo.raw.width) * viewScale
							: (gradient_calcedLayoutInfo.raw.x + gradient_calcedLayoutInfo.raw.width / 2) * viewScale
				}px - ${
					resizeKey.hDirection === 'L'
						? `calc(100% + 8px)`
						: resizeKey.hDirection === 'R'
							? '-8px'
							: '50%'
				}
					 ),
				calc(
					${
					resizeKey.vDirection === 'T'
						? (gradient_calcedLayoutInfo.raw.y) * viewScale
						: resizeKey.vDirection === 'B'
							? (gradient_calcedLayoutInfo.raw.y + gradient_calcedLayoutInfo.raw.height) * viewScale
							: (gradient_calcedLayoutInfo.raw.y + gradient_calcedLayoutInfo.raw.height / 2) * viewScale
				}px - ${
					resizeKey.vDirection === 'T'
						? `calc(100% + 8px)`
						: resizeKey.vDirection === 'B'
							? '-8px'
							: '50%'
				}
                )
			)`
			}}
		>

			{
				startSizeInfo && <>
					<div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>

						<div>
							<span className={'title'}>Size</span>
							<div className={'box'}>
								<div
									className={'prev'}>{startSizeInfo.width.toFixed(2)}{startSizeInfo.widthUnit} {startSizeInfo.height.toFixed(2)}{startSizeInfo.heightUnit}</div>
								<div
									className={'current'}>{sizeInfo.width.toFixed(2)}{sizeInfo.widthUnit} {sizeInfo.height.toFixed(2)}{sizeInfo.heightUnit}</div>
							</div>
						</div>
						<RedDivision/>
						<div>
							<span className={'title'}>Position</span>
							<div className={'box'}>
								<div
									className={'prev'}>{startPositionInfo.x.toFixed(2)}{startPositionInfo.xUnit} {startPositionInfo.y.toFixed(2)}{startPositionInfo.yUnit}</div>
								<div
									className={'current'}>{positionInfo.x.toFixed(2)}{positionInfo.xUnit} {positionInfo.y.toFixed(2)}{positionInfo.yUnit}</div>
							</div>
						</div>
					</div>
				</>
			}

		</div>

	</>
}
export default RedGradientTransformEditor