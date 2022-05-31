import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstEndingShape from "../../../../data/const/ConstEndingShape.js";

/**
 * RedGradientEndingShape
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientEndingShape = ({value, onChange}) => {
	return (
		<>
			<RedItemTitle label={'Ending Shape'}/>
			<RedSelect
				optionData={ConstEndingShape}
				value={value}
				onChange={e => onChange('valueInfo', 'endingShape', e.target.value, true)}
			/>
		</>
	)
}
export default RedGradientEndingShape