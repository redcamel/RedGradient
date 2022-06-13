import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedGradientDegreeEditor from "./RedGradientDegreeEditor.jsx";

/**
 * RedGradientDegree
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientDegree = ({value, onChange, onMouseDownCapture}) => {
	return (
		<div style={{display: 'flex', gap: '5px'}} onMouseDownCapture={onMouseDownCapture}>
			<div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
				<RedItemTitle label={'Angle'}/>
				<RedNumberField value={value} width={'100%'} flexGrow={1}
												onInput={(value, saveHistoryYn) => onChange('valueInfo', 'angle', value, saveHistoryYn)}
												onKeyDown={(value, saveHistoryYn) => onChange('valueInfo', 'angle', value, saveHistoryYn)}
												onBlur={(value, saveHistoryYn) => onChange('valueInfo', 'angle', value, saveHistoryYn)}
				/>
			</div>
			<RedGradientDegreeEditor
				value={value}
				onChange={(value, saveHistoryYn) => onChange('valueInfo', 'angle', value, saveHistoryYn)}
			/>
		</div>
	)
}
export default RedGradientDegree