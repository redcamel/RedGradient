import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstBlendModeType from "../../../../data/const/ConstBlendModeType.js";

/**
 * RedGradientBlendMode
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientBlendMode = ({value, onChange}) => {
	return (
		<div style={{display:'flex',flexDirection:'column'}}>
			<RedItemTitle label={'Blend Mode'}/>
			<RedSelect
				optionData={ConstBlendModeType}
				value={value}
				onChange={(e) => onChange('blendMode', e.target.value, true)}
			/>
		</div>
	)
}
export default RedGradientBlendMode