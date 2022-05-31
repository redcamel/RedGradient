import {useContext} from "react";
import './RedColorPickerButton.css'
// import '@easylogic/colorpicker/dist/colorpicker.css';
import '@easylogic/pure-colorpicker/style.css'
import ContextColorPicker from "../contexts/contextColorPicker/ContextColorPicker.js";
import ColorPickerUI from '@easylogic/pure-colorpicker';

/**
 *
 * @param getColorFunction
 * @param updateFunction
 * @returns {JSX.Element}
 * @constructor
 */
const RedColorPickerButton = ({getColorFunction, updateFunction}) => {
	// console.log('ColorPickerUI',ColorPickerUI)
	const {actions: colorPickerActions} = useContext(ContextColorPicker)
	const HD_openColorPicker = (e) => {
		let {pageX: tX, pageY: tY} = e
		colorPickerActions['closePicker']()
		colorPickerActions['openPicker']({
			value: getColorFunction(),
			getColorFunction,
			updateFunction,
			position: {
				x: -10000,
				y: -10000
			}
		})
		setTimeout(() => {
			{
				const t0 = document.querySelector('.easylogic-colorpicker')
				const rect = {
					width: t0.offsetWidth,
					height: t0.offsetHeight
				}
				console.log(rect)
				const windowW = window.innerWidth
				const windowH = window.innerHeight
				if (tX + rect.width > windowW) tX = windowW - rect.width - 10
				if (tY + rect.height > windowH) tY = windowH - rect.height - 10
			}
			colorPickerActions['openPicker']({
				value: getColorFunction(),
				getColorFunction,
				updateFunction,
				position: {
					x: tX,
					y: tY
				}
			})
		}, 1)
	}
	const colorInfo = ColorPickerUI.Color.parse(getColorFunction())

	const rgb = `rgb(${colorInfo.r},${colorInfo.g},${colorInfo.b}`
	const rgba = `rgb(${colorInfo.r},${colorInfo.g},${colorInfo.b},${colorInfo.a}`
	return (
		<div
			className={'RedColorPickerButton'}
			onClick={HD_openColorPicker}
		>
			<div
				className={'RedColorPickerButton_item'}
			>
				<div
					className={'RedColorPickerButton_item_rgb'}
					style={{background: rgb}}
				/>
				<div
					className={'RedColorPickerButton_item_rgba'}
					style={{background: colorInfo.a === 1 ? rgb : rgba}}
				/>
			</div>
		</div>
	)
}
export default RedColorPickerButton