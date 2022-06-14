import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";

/**
 * RedGradientOffset
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientOffset = ({data, time}) => {
	const {offsetInfo} = data['timeline'][time]['valueInfo']
	const onChange = ()=>{

	}
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
			<RedItemTitle label={'Offset'}/>
			<RedNumberField
				value={offsetInfo['value']} width={'100%'} flexGrow={1}
				onInput={(value, saveHistoryYn) => onChange('value', value, saveHistoryYn)}
				onKeyDown={(value, saveHistoryYn) => onChange('value', value, saveHistoryYn)}
				onBlur={(value, saveHistoryYn) => onChange('value', value, saveHistoryYn)}
			/>
			<RedSelect
				optionData={ConstUnitPxPercent}
				value={offsetInfo['unit']}
				onChange={e => onChange('unit', e.target.value, true)}
			/>
		</div>
	)
}
export default RedGradientOffset