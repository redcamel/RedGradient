import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstGradientType from "../../../../data/const/ConstGradientType.js";

/**
 * RedGradientType
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientType = ({value, onChange}) => {
	return (
		<>
			<RedItemTitle label={'Gradient Type'}/>
			<RedSelect
				optionData={ConstGradientType}
				value={value}
				onChange={(e) => onChange('type', e.target.value, true)}
			/>
			<div
				className={'RedGradientEditor_container_repeat_box'}
				style={{
					// flexDirection: 'column',
					padding: '2px 0 5px 0',
					// alignItems: 'flex-start',
					// justifyContent : 'space-between',
					gap: '2px',
					flexWrap: 'wrap'
				}}
			>
				{
					Object.values(ConstGradientType).map(type => {
						const activeYn = value === type
						return <label
							key={type}
							style={{display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '2px'}}
							onMouseDown={() => onChange('type', type, true)}
						>
							{/*{activeYn.toString()}*/}
							<input
								type={'radio'} value={type} checked={activeYn}
								onChange={() => {
								}}
							/> <span
							style={{color: activeYn ? '#efb26a' : ''}}>{type.split('-').map(v2 => v2.charAt(0).toUpperCase()).join('')}</span>
						</label>
					})
				}
			</div>
		</>
	)
}
export default RedGradientType