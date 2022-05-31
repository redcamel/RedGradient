import './RedContainerBorderRadiusEditor.css'
import {useContext, useEffect, useState} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import ConstBoxBorderPropertyModeType
	from "../../../panels/container/cssProperty/border/ConstBoxBorderPropertyModeType";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent";

let startMousePointX, startMousePointY
let tX, tY
let startKey
const RedContainerBorderRadiusEditor = ({viewKey, calcedLayoutInfo, viewScale, targetView, HD_ActiveWindow}) => {
	const {actions: gradientActions} = useContext(ContextGradient)
	const [dummyVisible, setDummyVisible] = useState(false)
	const {borderInfo} = targetView.containerInfo
	const {borderRadiusInfo} = borderInfo

	const HD_resizeStart = (e, direction) => {
		startKey = direction
		startMousePointX = e.nativeEvent.x
		startMousePointY = e.nativeEvent.y
		setDummyVisible(true)
	}
	useEffect(() => {
			const HD_up = (e) => {
				gradientActions.updateContainerSizePosition({
					viewKey,
					value: [],
					saveHistoryYn: true
				})
				setDummyVisible(false)
				gradientActions.setOtherContainerDummyRenderYn(false)
			};
			const HD_move = (e) => {
				e.preventDefault()
				e.stopPropagation()
				tX = e.pageX;
				tY = e.pageY;
				let key = 'borderRadius'
				if (borderRadiusInfo['mode'] === ConstBoxBorderPropertyModeType.SOLO) key = startKey

				const maxSize = Math.max(calcedLayoutInfo.raw.width, calcedLayoutInfo.raw.height) / 2
				const gap = ((startKey === 'tr' || startKey === 'br' ? 1 - tX / startMousePointX : tX / startMousePointX - 1)) * viewScale * maxSize
				const calcedSize = Math.min(maxSize, borderRadiusInfo[borderRadiusInfo.mode][key] + gap)
				const value = Math.max(calcedSize, 0)

				gradientActions.update_borderRadius({
					viewKey,
					key: key,
					value: value,
					mode: borderRadiusInfo.mode,
					saveHistoryYn: false
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
	const soloYn = borderRadiusInfo['mode'] === ConstBoxBorderPropertyModeType.SOLO

	const calcSize = (key) => {
		const rawH = calcedLayoutInfo.raw.height / 2 * viewScale
		const rawW = calcedLayoutInfo.raw.width / 2 * viewScale
		const unit = borderRadiusInfo[borderRadiusInfo.mode][(soloYn ? key : 'borderRadius') + 'Unit']
		const borderRadius = borderRadiusInfo[borderRadiusInfo.mode][soloYn ? key : 'borderRadius']
		const borderRadiusPixelWidth = unit === ConstUnitPxPercent.PERCENT ? borderRadius * rawW * 0.01 : (borderRadius * viewScale * 1)
		const borderRadiusPixelHeight = unit === ConstUnitPxPercent.PERCENT ? borderRadius * rawH * 0.01 : (borderRadius * viewScale * 1)
		// const t0 = ConstUnitPxPercent.PERCENT ? v : v/(horizonYn ? rawW : rawH) * 100
		// return unit === ConstUnitPxPercent.PERCENT ? t0 * (horizonYn ? rawW : rawH) * 0.01 : t0
		const tV = Math.min(rawH * 0.9, Math.min(borderRadiusPixelHeight, rawH))
		const tH = Math.min(rawW * 0.9, Math.min(borderRadiusPixelWidth, rawW))
		switch (key) {
			case 'tl':
				return {
					top: tV,
					left: tH,
				}

			case 'tr':
				return {
					top: tV,
					right: tH,
				}

			case 'bl':
				return {
					bottom: tV,
					left: tH,
				}

			case 'br':
				return {
					bottom: tV,
					right: tH,
				}
			default :
				break

		}
	}
	return <>
		<div
			className={'RedContainerBorderRadiusEditor'}
			style={{
				top: 0,
				left: 0,
				transform: `translate(${(parseInt(calcedLayoutInfo.viewScalePixel.x))}px,${parseInt(calcedLayoutInfo.viewScalePixel.y)}px)`,
				width: calcedLayoutInfo.viewScalePixel.width,
				height: calcedLayoutInfo.viewScalePixel.height
			}}
		>

			<div
				className={`RedContainerBorderRadiusEditor_item lt`}
				style={calcSize('tl')}
				onMouseDownCapture={e => HD_resizeStart(e, 'tl')}
			/>
			<div
				className={`RedContainerBorderRadiusEditor_item rt`}
				style={calcSize('tr')}
				onMouseDownCapture={e => HD_resizeStart(e, 'tr')}
			/>
			<div
				className={`RedContainerBorderRadiusEditor_item lb`}
				style={calcSize('bl')}
				onMouseDownCapture={e => HD_resizeStart(e, 'bl')}
			/>
			<div
				className={`RedContainerBorderRadiusEditor_item rb`}
				style={calcSize('br')}
				onMouseDownCapture={e => HD_resizeStart(e, 'br')}
			/>

		</div>

	</>
}
export default RedContainerBorderRadiusEditor