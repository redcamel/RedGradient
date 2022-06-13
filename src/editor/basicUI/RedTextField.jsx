import './RedBasicUI.css'
import {useState} from "react";

/**
 * 기본 TextField
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const RedTextField = (props) => {
	let currentValue = props.value
	const [focusValue, setFocusValue] = useState()
	const HD_input = e => {
		currentValue = e.target.value
		props.onInput?.(currentValue, false)
	}
	const HD_keyDown = e => {
		if (props.onKeyDown) {
			if (e.keyCode === 13) {
				currentValue = e.target.value
				props.onKeyDown(currentValue, true)
			}
		}
	}
	const HD_focus = e => setFocusValue(e.target.value)
	const HD_blur = () => props.onBlur?.(currentValue, focusValue !== currentValue)
	return <input
		className={'RedBasicUI_inputField'}
		placeholder={props.placeholder}
		value={currentValue}
		onFocus={HD_focus}
		onInput={HD_input}
		onKeyDown={HD_keyDown}
		onBlur={HD_blur}
		style={{width: props.width, height: props.height}}
	/>
}
export default RedTextField
