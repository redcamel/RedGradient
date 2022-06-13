import '../RedContainerFilter.css'
import ContextGradient from "../../../../contexts/system/ContextGradient.js";
import {useContext} from "react"
import RedNumberField from "../../../../basicUI/RedNumberField.jsx";

/**
 * RedContainerFilter_AmountFilter
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerFilter_AmountFilter = ({
																					 viewKey,
																					 data,
																					 idx,
																					 valueKey,
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
	return (
		<div className={'RedContainerFilter_item_container'}>
			<div className={'RedContainerFilter_item'}>
				<div>{valueKey}</div>
				<RedNumberField
					value={setting[valueKey]} width={'100%'} flexGrow={1}
					min={min}
					max={max}
					step={step}
					toFixed={toFixed}
					dragStep={dragStep}
					onInput={(value, saveHistoryYn) => HD_changeValue(value, valueKey, saveHistoryYn)}
					onKeyDown={(value, saveHistoryYn) => HD_changeValue(value, valueKey, saveHistoryYn)}
					onBlur={(value, saveHistoryYn) => HD_changeValue(value, valueKey, saveHistoryYn)}
				/>
			</div>
		</div>
	)
}
export default RedContainerFilter_AmountFilter