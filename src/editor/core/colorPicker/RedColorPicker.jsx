import {useContext, useEffect, useRef, useState} from "react";
import ColorPickerUI from '@easylogic/pure-colorpicker'
import ContextColorPicker from "../../contexts/contextColorPicker/ContextColorPicker.js";
import './RedColorPicker.css'
import ContextGradient from "../../contexts/system/ContextGradient.js";
import HELPER_GET_DATE from "../../contexts/system/HELPER_GET_DATA.js"

const RedColorPicker = () => {
	const pickerContainer = useRef(null)
	const [currentPicker, setCurrentPicker] = useState()
	const {state, actions} = useContext(ContextColorPicker)
	const {state: gradientState} = useContext(ContextGradient)
	useEffect(() => {
		setCurrentPicker(ColorPickerUI.create({
			type: "sketch",
			color: '#ff0000',
			position: 'inline',
			container: pickerContainer.current,
		}))
		return () => {
		}
	}, [])
	useEffect(() => {
		if (currentPicker) currentPicker.hide()
		if (pickerContainer.current) {
			if (state.openYn) {
				pickerContainer.current.style.display = ''
				currentPicker.show(
					{
						hideDelay: 0
					},
					state['getColorFunction'](),
					function (newColor) {
						state['updateFunction']({
							viewKey: gradientState ? HELPER_GET_DATE.getActiveViewInfo(gradientState)['viewKey'] : null,
							value: newColor,
						})
					},
					null,
					function (newColor) {
						state['updateFunction']({
							viewKey: gradientState ? HELPER_GET_DATE.getActiveViewInfo(gradientState)['viewKey'] : null,
							value: newColor,
							saveHistoryYn: true
						})
					}
				)
			} else {
				pickerContainer.current.style.display = 'none'
			}
		}
		let ableClose = true
		const HD_checkNeedClose = e => {
			ableClose = false
		}
		const HD_clearColorPicker = e => {
			if (state.openYn && ableClose) actions.closePicker()
			ableClose = true
		}
		pickerContainer.current.addEventListener("mousedown", HD_checkNeedClose);
		document.addEventListener("click", HD_clearColorPicker);
		return () => {
			pickerContainer.current.removeEventListener("mousedown", HD_checkNeedClose);
			document.removeEventListener("click", HD_clearColorPicker);
		}
	}, [state.openYn])
	return (
		<div className={'RedColorPicker'}
				 id={'pickerBgContainer'}
				 style={{
					 display: state.openYn ? 'flex' : 'none',
					 top: state.position.y + 'px',
					 left: state.position.x + 'px'
				 }}
		>
			<div className={'RedColorPicker_activeContainer'}>
				<div ref={pickerContainer} className={'RedColorPicker_picker'}/>
			</div>
		</div>
	)
}
export default RedColorPicker

