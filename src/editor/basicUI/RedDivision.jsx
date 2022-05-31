import './RedDivision.css'

/**
 * RedDivision
 * @returns {JSX.Element}
 * @constructor
 */
const RedDivision = ({margin, verticalYn}) => {
	return <div className={`${verticalYn ? 'RedDivision_vertical' : 'RedDivision'}`} style={{margin}}/>
}
export default RedDivision
