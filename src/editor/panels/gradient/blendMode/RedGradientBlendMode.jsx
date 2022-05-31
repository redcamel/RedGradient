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
		<>
			<RedItemTitle label={'Blend Mode'}/>
			<RedSelect
				optionData={ConstBlendModeType}
				value={value}
				onChange={(e) => onChange('blendMode', e.target.value, true)}
			/>
		</>
	)
}
export default RedGradientBlendMode