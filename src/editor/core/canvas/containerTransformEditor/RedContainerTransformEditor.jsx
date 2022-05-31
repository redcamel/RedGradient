import './RedContainerTransformEditor.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowLeft, faArrowRight, faArrowsAlt, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import RedDivision from "../../../basicUI/RedDivision.jsx";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";

let startMousePointX, startMousePointY
let tX, tY
let startDummyPositionX_calced, startDummyPositionY_calced
let dummyPositionX, dummyPositionY
let horizontalDirection, verticalDirection
let resizeMode
let dummyWidth, dummyHeight
let startSizeInfo, startPositionInfo
const RedContainerTransformEditor = ({viewKey, calcedLayoutInfo, viewScale, targetView, HD_ActiveWindow}) => {
	const {actions: gradientActions} = useContext(ContextGradient)
	const [dummyVisible, setDummyVisible] = useState(false)
	const [resizeKey, setResizeKey] = useState({})
	const raw = calcedLayoutInfo.raw
	const {sizeInfo, positionInfo} = targetView.containerInfo
	const resetTempInfo = (x, y) => {
		startMousePointX = x
		startMousePointY = y
		dummyPositionX = 0
		dummyPositionY = 0
		dummyWidth = raw.width
		dummyHeight = raw.height
		startDummyPositionX_calced = raw.x
		startDummyPositionY_calced = raw.y
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
	useEffect(() => {
		// console.log('오냐')
		resetTempInfo(tX, tY)
		const updateList = []
		updateList.push(
			{
				targetInfo: 'sizeInfo',
				key: 'width',
				value: startSizeInfo['width']
			},
			{
				targetInfo: 'positionInfo',
				key: 'x',
				value: startPositionInfo['x']
			},
			{
				targetInfo: 'sizeInfo',
				key: 'height',
				value: startSizeInfo['height']
			},
			{
				targetInfo: 'positionInfo',
				key: 'y',
				value: startPositionInfo['y']
			}
		)
		gradientActions.updateContainerSizePosition({
			viewKey,
			value: updateList
		})
	}, [window.RedKey.downList.alt, window.RedKey.downList.shift])
	useEffect(() => {
			const HD_up = (e) => {
				gradientActions.updateContainerSizePosition({
					viewKey,
					value: [],
					saveHistoryYn: true
				})
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
				const {sizeInfo, parentSizeInfo, positionInfo} = calcedLayoutInfo
				const useFixedRatio = window.RedKey.downList['shift'] || sizeInfo.useFixedRatio
				const updateList = []
				const convertPxToPercent_size = (calced_px, key) => {
					let calced_unit = calced_px
					const sizeInfoKey = key
					if (sizeInfo[`${key}Unit`] === ConstUnitPxPercent.PERCENT) calced_unit = calced_px / parentSizeInfo[sizeInfoKey] * 100
					return calced_unit
				}
				const convertPxToPercent_position = (calced_px, key) => {
					let calced_unit = calced_px
					const sizeInfoKey = key === 'y' ? 'height' : 'width'
					if (positionInfo[`${key}Unit`] === ConstUnitPxPercent.PERCENT) calced_unit = calced_px / parentSizeInfo[sizeInfoKey] * 100
					return calced_unit
				}
				const calcShift = (calced_width_px) => {
					if (useFixedRatio && verticalDirection) {
						const ratio = dummyHeight / dummyWidth
						const calced_height_px = calced_width_px * ratio
						const calced_height_unit = convertPxToPercent_size(calced_height_px, 'height')
						updateList.push(
							{
								targetInfo: 'sizeInfo',
								key: 'height',
								value: calced_height_unit
							}
						)
						const gap = dummyHeight - calced_height_px
						if (alt) dummyPositionY = -gap * (alt ? 0.5 : 1)
						if (verticalDirection === 'T') dummyPositionY = -gap * (alt ? 0.5 : 1)
						const calced_y_px = startDummyPositionY_calced - dummyPositionY
						const calced_y_unit = convertPxToPercent_position(calced_y_px, 'y')
						updateList.push(
							{
								targetInfo: 'positionInfo',
								key: 'y',
								value: calced_y_unit
							}
						)
					}
				}
				const resizeByTop = () => {
					let calced_height_px, calced_height_unit
					if (resizeMode) {
						calced_height_px = Math.max(0, dummyHeight - (tY - startMousePointY) * (alt ? 2 : 1) / viewScale)
						calced_height_unit = convertPxToPercent_size(calced_height_px, 'height')
						updateList.push(
							{
								targetInfo: 'sizeInfo',
								key: 'height',
								value: calced_height_unit
							}
						)
						let calced_y_px, calced_y_unit
						const gap = dummyHeight - calced_height_px
						if (alt) {
							dummyPositionY = -gap * 0.5
							calced_y_px = startDummyPositionY_calced - dummyPositionY
						} else {
							dummyPositionY = -gap
							calced_y_px = startDummyPositionY_calced - dummyPositionY
						}
						calced_y_unit = convertPxToPercent_position(calced_y_px, 'y')
						updateList.push(
							{
								targetInfo: 'positionInfo',
								key: 'y',
								value: calced_y_unit
							}
						)
					}
				}
				const resizeByBottom = () => {
					let calced_height_px, calced_height_unit
					if (resizeMode) {
						calced_height_px = Math.max(0, dummyHeight + (tY - startMousePointY) * (alt ? 2 : 1) / viewScale)
						calced_height_unit = convertPxToPercent_size(calced_height_px, 'height')
						updateList.push(
							{
								targetInfo: 'sizeInfo',
								key: 'height',
								value: calced_height_unit
							}
						)
						if (alt) {
							let calced_y_px, calced_y_unit
							const gap = dummyHeight - calced_height_px
							dummyPositionY = -gap * 0.5
							calced_y_px = startDummyPositionY_calced - dummyPositionY
							calced_y_unit = convertPxToPercent_position(calced_y_px, 'y')
							updateList.push(
								{
									targetInfo: 'positionInfo',
									key: 'y',
									value: calced_y_unit
								}
							)
						}
					}
				}
				const resizeByLeft = () => {
					let calced_width_px, calced_width_unit
					if (resizeMode) {
						calced_width_px = Math.max(0, dummyWidth - (tX - startMousePointX) * (alt ? 2 : 1) / viewScale)
						calced_width_unit = convertPxToPercent_size(calced_width_px, 'width')
						updateList.push(
							{
								targetInfo: 'sizeInfo',
								key: 'width',
								value: calced_width_unit
							}
						)
						let calced_x_px, calced_x_unit
						const gap = dummyWidth - calced_width_px
						if (alt) {
							dummyPositionX = -gap * 0.5
							calced_x_px = startDummyPositionX_calced - dummyPositionX
						} else {
							dummyPositionX = -gap
							calced_x_px = startDummyPositionX_calced + gap
						}
						calced_x_unit = convertPxToPercent_position(calced_x_px, 'x')
						updateList.push(
							{
								targetInfo: 'positionInfo',
								key: 'x',
								value: calced_x_unit
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
						updateList.push(
							{
								targetInfo: 'sizeInfo',
								key: 'width',
								value: calced_width_unit
							}
						)
						let calced_x_px, calced_x_unit
						const gap = dummyWidth - calced_width_px
						if (alt) {
							dummyPositionX = -gap * 0.5
							calced_x_px = startDummyPositionX_calced - dummyPositionX
							calced_x_unit = convertPxToPercent_position(calced_x_px, 'x')
							updateList.push(
								{
									targetInfo: 'positionInfo',
									key: 'x',
									value: calced_x_unit
								}
							)
						}
						calcShift(calced_width_px)
					}
				}
				const moveH = () => {
					const calced_width_px = dummyWidth - (tX - startMousePointX) / viewScale
					const gap = dummyWidth - calced_width_px
					dummyPositionX = -gap
					const calced_x_px = startDummyPositionX_calced - dummyPositionX
					const calced_x_unit = convertPxToPercent_position(calced_x_px, 'x')
					updateList.push(
						{
							targetInfo: 'positionInfo',
							key: 'x',
							value: calced_x_unit
						}
					)
				}
				const moveV = () => {
					const calced_height_px = dummyHeight - (tY - startMousePointY) / viewScale
					const gap = dummyHeight - calced_height_px
					dummyPositionY = -gap
					const calced_y_px = startDummyPositionY_calced - dummyPositionY
					const calced_y_unit = convertPxToPercent_position(calced_y_px, 'x')
					updateList.push(
						{
							targetInfo: 'positionInfo',
							key: 'y',
							value: calced_y_unit
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
				gradientActions.updateContainerSizePosition({
					viewKey,
					value: updateList
				})
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
	const transformPointerVisible = !resizeMode && !horizontalDirection && !verticalDirection
	const {useFixedRatio} = sizeInfo
	return <>
		{
			dummyVisible && <div
				className={'RedTransformEditor'}
				style={{
					top: 0,
					left: 0,
					border: 0,
					transform: `translate(${(parseFloat(calcedLayoutInfo.viewScalePixel.x))}px,${parseFloat(calcedLayoutInfo.viewScalePixel.y)}px)`,
					width: calcedLayoutInfo.viewScalePixel.width,
					height: calcedLayoutInfo.viewScalePixel.height
				}}
			>
				<div
					className={'RedTransformEditor_dummy'}
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
			className={'RedTransformEditor'}
			style={{
				top: 0,
				left: 0,
				transform: `translate(${(parseInt(parseFloat(calcedLayoutInfo.viewScalePixel.x)))}px,${parseInt(parseFloat(calcedLayoutInfo.viewScalePixel.y))}px)`,
				width: calcedLayoutInfo.viewScalePixel.width,
				height: calcedLayoutInfo.viewScalePixel.height
			}}
		>
			{/*{JSON.stringify(window.RedKey.downList)}*/}
			{/*dummyPositionX : {dummyPositionX}*/}
			{/*dummyPositionY : {dummyPositionY}*/}

			<div
				className={`RedTransformEditor_item ${transformPointerVisible || (resizeMode && horizontalDirection === 'L' && verticalDirection === 'T') ? '' : 'deActive'} lt`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', 'T', true)}
			/>
			<div
				className={`RedTransformEditor_item ${!useFixedRatio && (transformPointerVisible || (resizeMode && !horizontalDirection && verticalDirection === 'T')) ? '' : 'deActive'} t`}
				onMouseDownCapture={e => HD_resizeStart(e, null, 'T', true)}
			/>
			<div
				className={`RedTransformEditor_item ${transformPointerVisible || (resizeMode && horizontalDirection === 'R' && verticalDirection === 'T') ? '' : 'deActive'} rt`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', 'T', true)}
			/>
			<div
				className={`RedTransformEditor_item ${!useFixedRatio && (transformPointerVisible || (resizeMode && horizontalDirection === 'L' && !verticalDirection)) ? '' : 'deActive'} lm`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', null, true)}
			/>
			<div
				className={`RedTransformEditor_item ${!useFixedRatio && (transformPointerVisible || (resizeMode && horizontalDirection === 'R' && !verticalDirection)) ? '' : 'deActive'} rm`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', null, true)}
			/>
			<div
				className={`RedTransformEditor_item ${transformPointerVisible || (resizeMode && horizontalDirection === 'L' && verticalDirection === 'B') ? '' : 'deActive'} lb`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', 'B', true)}
			/>
			<div
				className={`RedTransformEditor_item ${!useFixedRatio && (transformPointerVisible || (resizeMode && !horizontalDirection && verticalDirection === 'B')) ? '' : 'deActive'} b`}
				onMouseDownCapture={e => HD_resizeStart(e, null, 'B', true)}
			/>
			<div
				className={`RedTransformEditor_item ${transformPointerVisible || (resizeMode && horizontalDirection === 'R' && verticalDirection === 'B') ? '' : 'deActive'} rb`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', 'B', true)}
			/>
			{/*  */}
			<div
				className={`RedTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'L' && verticalDirection === 'T') ? '' : 'deActive'} lt`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', 'T', false)}
			>
				<FontAwesomeIcon icon={faArrowsAlt} size={'1x'}/>
			</div>
			<div
				className={`RedTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'R' && verticalDirection === 'T') ? '' : 'deActive'} rt`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', 'T', false)}
			>
				<FontAwesomeIcon icon={faArrowsAlt} size={'1x'}/>
			</div>
			<div
				className={`RedTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'L' && verticalDirection === 'B') ? '' : 'deActive'} lb`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', 'B', false)}
			>
				<FontAwesomeIcon icon={faArrowsAlt} size={'1x'}/>
			</div>

			<div
				className={`RedTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'R' && verticalDirection === 'B') ? '' : 'deActive'} rb`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', 'B', false)}
			>
				<FontAwesomeIcon icon={faArrowsAlt} size={'1x'}/>
			</div>
			<div
				className={`RedTransformEditor_item_move ${transformPointerVisible || (!resizeMode && (horizontalDirection === 'L' && !verticalDirection)) ? '' : 'deActive'} left`}
				onMouseDownCapture={e => HD_resizeStart(e, 'L', null, false)}
			>
				<FontAwesomeIcon icon={faArrowLeft}/>
			</div>

			<div
				className={`RedTransformEditor_item_move ${transformPointerVisible || (!resizeMode && horizontalDirection === 'R' && !verticalDirection) ? '' : 'deActive'} right`}
				onMouseDownCapture={e => HD_resizeStart(e, 'R', null, false)}
			>
				<FontAwesomeIcon icon={faArrowRight}/>
			</div>
			<div
				className={`RedTransformEditor_item_move ${transformPointerVisible || (!resizeMode && !horizontalDirection && verticalDirection === 'T') ? '' : 'deActive'} top`}
				onMouseDownCapture={e => HD_resizeStart(e, null, 'T', false)}
			>
				<FontAwesomeIcon icon={faArrowUp}/>
			</div>

			<div
				className={`RedTransformEditor_item_move ${transformPointerVisible || (!resizeMode && !horizontalDirection && verticalDirection === 'B') ? '' : 'deActive'} bottom`}
				onMouseDownCapture={e => HD_resizeStart(e, null, 'B', false)}
			>
				<FontAwesomeIcon icon={faArrowDown}/>
			</div>
		</div>
		<div
			className={`RedTransformEditor_info ${dummyVisible ? 'active' : ''} `}
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				zIndex: 4,
				transform: `translate(
					calc(
					${
					resizeKey.hDirection === 'L'
						? (calcedLayoutInfo.raw.x) * viewScale
						: resizeKey.hDirection === 'R'
							? (calcedLayoutInfo.raw.x + calcedLayoutInfo.raw.width) * viewScale
							: (calcedLayoutInfo.raw.x + calcedLayoutInfo.raw.width / 2) * viewScale
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
						? (calcedLayoutInfo.raw.y) * viewScale
						: resizeKey.vDirection === 'B'
							? (calcedLayoutInfo.raw.y + calcedLayoutInfo.raw.height) * viewScale
							: (calcedLayoutInfo.raw.y + calcedLayoutInfo.raw.height / 2) * viewScale
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
									className={'prev'}>{startSizeInfo.width}{startSizeInfo.widthUnit} {startSizeInfo.height}{startSizeInfo.heightUnit}</div>
								<div
									className={'current'}>{sizeInfo.width}{sizeInfo.widthUnit} {sizeInfo.height}{sizeInfo.heightUnit}</div>
							</div>
						</div>
						<RedDivision/>
						<div>
							<span className={'title'}>Position</span>
							<div className={'box'}>
								<div
									className={'prev'}>{startPositionInfo.x}{startPositionInfo.xUnit} {startPositionInfo.y}{startPositionInfo.yUnit}</div>
								<div
									className={'current'}>{positionInfo.x}{positionInfo.xUnit} {positionInfo.y}{positionInfo.yUnit}</div>
							</div>
						</div>
					</div>
				</>
			}

		</div>
	</>
}
export default RedContainerTransformEditor