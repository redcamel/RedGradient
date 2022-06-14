import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";
import {useContext} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient";

/**
 * RedGradientOffset
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientOffset = ({data, time, groupIndex, groupLayerIndex}) => {
	const {state, actions: gradientActions,} = useContext(ContextGradient)
	const {offsetInfo} = data['timeline'][time]['valueInfo']
	const HD_onChange = (value, saveHistoryYn) => {
		gradientActions.updateLayerValueInfoByKey(
			{
				targetInfoKey: 'valueInfo',
				key: 'offsetInfo',
				time,
				groupIndex,
				groupLayerIndex,
				value: {
					...offsetInfo,
					value: value
				},
				saveHistoryYn
			}
		)
	}
	const HD_unitChange = (value, saveHistoryYn) => {
		gradientActions.updateLayerValueInfoByKey(
			{
				targetInfoKey: 'valueInfo',
				key: 'offsetInfo',
				time,
				groupIndex,
				groupLayerIndex,
				value: {
					...offsetInfo,
					unit: value
				},
				saveHistoryYn
			}
		)
	}
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
			<RedItemTitle label={'Offset'}/>
			<RedNumberField
				value={offsetInfo['value']} width={'100%'} flexGrow={1}
				onInput={(value, saveHistoryYn) => HD_onChange(value, saveHistoryYn)}
				onKeyDown={(value, saveHistoryYn) => HD_onChange(value, saveHistoryYn)}
				onBlur={(value, saveHistoryYn) => HD_onChange(value, saveHistoryYn)}
			/>
			<RedSelect
				optionData={ConstUnitPxPercent}
				value={offsetInfo['unit']}
				onChange={e => HD_unitChange(e.target.value, true)}
			/>
		</div>
	)
}
export default RedGradientOffset