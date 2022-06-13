import {useState} from "react";

/**
 * 기본 RedNumberField
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
let requestAni;
let startX, startValue, startTime;
const RedNumberField = (
	{
		value, step = 1, dragStep = 0.1,
		min, max, toFixed = 2,
		width, height,
		flexGrow,
		onInput, onDummySetting, onKeyDown
	}
) => {
	let currentValue = value
	const [focusValue, setFocusValue] = useState()
	const HD_focus = e => setFocusValue(+e.target.value)
	const HD_input = e => update(e.target.value)
	const HD_keyDown = e => {
		if (onKeyDown && e.keyCode === 13) update(e.target.value, true)
	}
	const HD_blur = (e, saveHistoryYn) => {
		onInput?.(currentValue, focusValue !== currentValue || saveHistoryYn)
		onDummySetting?.(false)
	}
	const HD_move = e => {
		const tX = e.pageX - startX;
		let value = +startValue + tX * dragStep
		update(value)
	};
	const update = (v, saveHistoryYn) => {
		if (min !== undefined) v = Math.max(v, min)
		if (max !== undefined) v = Math.min(v, max)
		v = +v

		if (min !== undefined) if (v < min) v = min;
		if (max !== undefined) if (v > max) v = max;
		currentValue = +v.toFixed(toFixed)
		onInput?.(currentValue, saveHistoryYn)
		onDummySetting?.(true)
	}
	const HD_up = () => {
		cancelAnimationFrame(requestAni);
		window.removeEventListener('mousemove', HD_move);
		window.removeEventListener('mouseup', HD_up);
		onDummySetting?.(false)
	};
	const HD_up2 = (e) => {
		cancelAnimationFrame(requestAni);
		HD_blur(e, true)
		window.removeEventListener('mouseup', HD_up2);
		onDummySetting?.(false)
	};
	const HD_onMouseDown = e => {
		startValue = currentValue
		startX = e.nativeEvent.pageX
		window.addEventListener('mousemove', HD_move);
		window.addEventListener('mouseup', HD_up);
	}
	return <div className={'RedBasicUI_container'} style={{flexGrow: flexGrow}}>
		<input
			className={'RedBasicUI_inputField'}
			type={'number'}
			min={min}
			value={currentValue}
			onMouseDown={HD_onMouseDown}
			onInput={HD_input}
			onFocus={HD_focus}
			onKeyDown={HD_keyDown}
			onBlur={HD_blur || null}
			style={{width: width, height: height}}
		/>
		<div className={'RedBasicUI_inputField_plus'}
				 onMouseDown={() => {
					 HD_up()
					 HD_up2()
					 startValue = currentValue;
					 const tick = time => {
						 if (time - startTime > 100) {
							 startValue += step
							 update(startValue);
						 }
						 requestAni = requestAnimationFrame(tick);
					 };
					 requestAni = tick();
					 startTime = performance.now();
					 update(startValue + step);
					 window.addEventListener('mouseup', HD_up2);
				 }}

		>+
		</div>
		<div className={'RedBasicUI_inputField_minus'}
				 onMouseDown={() => {
					 HD_up()
					 HD_up2()
					 startValue = currentValue;
					 const tick = time => {
						 if (time - startTime > 100) {
							 startValue -= step
							 update(startValue);
						 }
						 requestAni = requestAnimationFrame(tick);
					 };
					 requestAni = tick();
					 startTime = performance.now();
					 update(startValue - step);
					 window.addEventListener('mouseup', HD_up2);
				 }}
		>-
		</div>
	</div>
}
export default RedNumberField