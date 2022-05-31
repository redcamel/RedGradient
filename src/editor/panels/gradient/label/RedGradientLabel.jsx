import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedTextField from "../../../basicUI/RedTextField.jsx";

/**
 * RedGradientLabel
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientLabel = ({value, onChange}) => {
	return (
		<>
			<RedItemTitle label={'Label'}/>
			<RedTextField
				value={value}
				onInput={v => onChange('label', v)}
				onKeyDown={v => onChange('label', v)}
				onBlur={v => onChange('label', v, true)}
			/>
		</>
	)
}
export default RedGradientLabel