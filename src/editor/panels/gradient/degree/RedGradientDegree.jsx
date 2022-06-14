import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedGradientDegreeEditor from "./RedGradientDegreeEditor.jsx";

/**
 * RedGradientDegree
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientDegree = ({value, onChange, onMouseDownCapture}) => {
	const HD_onChange = (value, saveHistoryYn) => {
		onChange('valueInfo', 'angle', value, saveHistoryYn)
	}
	return (
		<div style={{display: 'flex', gap: '5px'}} onMouseDownCapture={onMouseDownCapture}>
			<div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
				<RedItemTitle label={'Angle'}/>
				<RedNumberField
					value={value} width={'100%'} flexGrow={1}
					onInput={HD_onChange}
					onKeyDown={HD_onChange}
					onBlur={HD_onChange}
				/>
			</div>
			<RedGradientDegreeEditor value={value} onChange={HD_onChange}/>
		</div>
	)
}
export default RedGradientDegree