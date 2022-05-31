import './RedItemTitle.css'

/**
 * 아이템타이틀
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const RedItemTitle = ({label, width = '100%'}) => {
	return <div className={'RedItemTitle'} style={{width: width}}>{label}</div>
}
export default RedItemTitle
