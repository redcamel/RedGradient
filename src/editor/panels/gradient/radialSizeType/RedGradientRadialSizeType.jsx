import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstGradientRadialSizeType from "../../../../data/const/ConstGradientRadialSizeType.js";

/**
 * RedGradientRadialSizeType
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientRadialSizeType = ({value, onChange}) => {
	return (
		<div style={{display:'flex',flexDirection:'column'}}>
			<RedItemTitle label={'Size Type'}/>
			<RedSelect
				optionData={ConstGradientRadialSizeType}
				value={value}
				onChange={e => onChange('valueInfo', 'sizeType', e.target.value, true)}
			/>
		</div>
	)
}
export default RedGradientRadialSizeType