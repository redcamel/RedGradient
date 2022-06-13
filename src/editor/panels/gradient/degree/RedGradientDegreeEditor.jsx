import './RedGradientDegreeEditor.css'
import {useRef} from "react";

let currentValue
let rect
/**
 * RedGradientDegreeEditor
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientDegreeEditor = ({value, onChange}) => {
	const ref = useRef()
	const HD_MoveStart = () => {
		rect = ref.current.getBoundingClientRect()
		window.addEventListener('mousemove', HD_move);
		window.addEventListener('mouseup', HD_up);
	}
	const HD_move = e => {
		const tX = e.pageX - (rect.x + rect.width / 2);
		const tY = e.pageY - (rect.y + rect.height / 2);
		const angle = Math.atan2(tY, tX) * 180 / Math.PI + 90;
		update(angle)
	};
	const update = (v, saveHistoryYn) => {
		currentValue = v
		onChange?.(v, saveHistoryYn)
	}
	const HD_up = () => {
		onChange?.(currentValue, true)
		window.removeEventListener('mousemove', HD_move);
		window.removeEventListener('mouseup', HD_up);
	};
	return (
		<div className={'RedGradientDegreeEditor_container'} ref={ref}
				 onMouseDown={HD_MoveStart}
				 style={{
					 transform: `rotate(${value}deg)`
				 }}
		>
			<div className={'RedGradientDegreeEditor_container_center'}/>
			<div className={'RedGradientDegreeEditor_line'}/>
		</div>
	)
}
export default RedGradientDegreeEditor