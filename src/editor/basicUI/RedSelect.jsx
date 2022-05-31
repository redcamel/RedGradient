import './RedBasicUI.css'

/**
 *
 * @param optionData
 * @param value
 * @param unit
 * @param onChange
 * @param flexGrow
 * @param toFixed
 * @returns {JSX.Element}
 * @constructor
 */
const RedSelect = ({optionData = {}, value, unit, onChange, flexGrow, toFixed = 2}) => {
	const optionList = Object.values(optionData)
	return <select
		className={'RedBasicUI_select'}
		onChange={onChange}
		value={value}
		style={{flexGrow: flexGrow}}
	>
		{
			optionList.map(v => {
				// console.log(v)
				return (
					<option value={v} key={v}>{typeof v == 'number' ? v.toFixed(toFixed) : v}{unit}</option>
				)
			})
		}
	</select>
}
export default RedSelect
