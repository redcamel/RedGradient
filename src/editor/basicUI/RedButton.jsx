import './RedBasicUI.css'

/**
 * 기본 RedButton
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const RedButton = (props) => {
	return <div>
		<div className={'RedBasicUI_button'} {...props} >
			{props.label}
		</div>
	</div>
}
export default RedButton
