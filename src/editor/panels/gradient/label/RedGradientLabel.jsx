import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedTextField from "../../../basicUI/RedTextField.jsx";

/**
 * RedGradientLabel
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientLabel = ({value, onChange}) => {
	return (
		<div style={{display:'flex',flexDirection:'column'}}>
			<RedItemTitle label={'Label'}/>
			<RedTextField
				value={value}
				onInput={v => onChange('label', v)}
				onKeyDown={v => onChange('label', v)}
				onBlur={v => onChange('label', v, true)}
			/>
		</div>
	)
}
export default RedGradientLabel