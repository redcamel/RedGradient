import '../RedContainerFilter.css'
import ContextGradient from "../../../../contexts/system/ContextGradient.js";
import {useContext} from "react"
import RedNumberField from "../../../../basicUI/RedNumberField.jsx";
import RedColorPickerButton from "../../../../basicUI/RedColorPickerButton.jsx";

/**
 * RedContainerFilter_DropShadowFilter
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerFilter_DropShadowFilter = ({
																							 viewKey,
																							 data,
																							 idx,
																							 updateMethodName,
																							 step,
																							 dragStep,
																							 min,
																							 max,
																							 toFixed
																						 }) => {
	const {actions: gradientActions} = useContext(ContextGradient)
	const {setting} = data
	const HD_changeValue = (value, key, saveHistoryYn) => {
		gradientActions[updateMethodName]({
			viewKey,
			key,
			idx,
			value,
			saveHistoryYn
		})
	}
	const HD_getColor = () => setting['color']
	const HD_updateColorFunction = (value) => {
		gradientActions[updateMethodName]({
			...value,
			key: 'color',
			idx
		})
	}
	return (
		<div className={'RedContainerFilter_item_container'}>
			<div className={'RedContainerFilter_item'}>
				<div>blur</div>
				<RedNumberField
					value={setting['blur']} width={'100%'} flexGrow={1}
					min={min}
					max={max}
					step={step}
					toFixed={toFixed}
					dragStep={dragStep}
					onInput={(value, saveHistoryYn) => HD_changeValue(value, 'blur', saveHistoryYn)}
					onKeyDown={(value, saveHistoryYn) => HD_changeValue(value, 'blur', saveHistoryYn)}
					onBlur={(value, saveHistoryYn) => HD_changeValue(value, 'blur', saveHistoryYn)}
				/>
				{HD_getColor()}
				<RedColorPickerButton
					getColorFunction={HD_getColor}
					updateFunction={HD_updateColorFunction}
				/>
			</div>
			<div className={'RedContainerFilter_item'} style={{marginTop: '5px'}}>
				<div>x</div>
				<RedNumberField
					value={setting.offsetX} width={'100%'} flexGrow={1}
					min={min}
					max={max}
					step={step}
					toFixed={toFixed}
					dragStep={dragStep}
					onInput={(value, saveHistoryYn) => HD_changeValue(value, 'offsetX', saveHistoryYn)}
					onKeyDown={(value, saveHistoryYn) => HD_changeValue(value, 'offsetX', saveHistoryYn)}
					onBlur={(value, saveHistoryYn) => HD_changeValue(value, 'offsetX', saveHistoryYn)}

				/>
				<div>y</div>
				<RedNumberField
					value={setting.offsetY} width={'100%'} flexGrow={1}
					min={min}
					max={max}
					step={step}
					toFixed={toFixed}
					dragStep={dragStep}
					onInput={(value, saveHistoryYn) => HD_changeValue(value, 'offsetY', saveHistoryYn)}
					onKeyDown={(value, saveHistoryYn) => HD_changeValue(value, 'offsetY', saveHistoryYn)}
					onBlur={(value, saveHistoryYn) => HD_changeValue(value, 'offsetY', saveHistoryYn)}
				/>
			</div>
		</div>
	)
}
export default RedContainerFilter_DropShadowFilter