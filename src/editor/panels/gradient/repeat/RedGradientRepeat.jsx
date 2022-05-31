import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstGradientRepeatType from "../../../../data/const/ConstGradientRepeatType.js";

/**
 * RedGradientRepeat
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientRepeat = ({value, onChange}) => {
	return (
		<>
			<RedItemTitle label={'Repeat Type'}/>
			<RedSelect
				optionData={ConstGradientRepeatType}
				value={value}
				onChange={e => onChange('repeatType', e.target.value, true)}
			/>
			<div className={'RedGradientEditor_container_repeat_box'}>
				{
					Object.values(ConstGradientRepeatType).map(type => {
						const activeYn = type === value
						return <div
							className={`RedGradientEditor_container_repeat_box_item ${activeYn ? 'active' : ''}`}
							key={type}
							style={{backgroundRepeat: type}}
							onClick={() => onChange('repeatType', type, true)}
						/>
					})
				}
			</div>
		</>
	)
}
export default RedGradientRepeat