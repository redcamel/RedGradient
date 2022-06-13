/**
 * RedToastSkin
 * @param title
 * @param text
 * @returns {JSX.Element}
 * @constructor
 */
const RedToastSkin = ({title, text}) => {
	return <div style={styleContainer}>
		<b style={styleTitle}>{title}</b>
		<div style={styleText}>{text}</div>
		<div style={styleTime}>{(new Date()).toLocaleDateString()} {(new Date()).toLocaleTimeString()}</div>
	</div>

}
export default RedToastSkin
const styleContainer = {display: 'flex', flexDirection: 'column', gap: '4px'}
const styleTitle = {fontSize: '12px', opacity: 0.8}
const styleText = {
	color: '#efb26a', lineHeight: 1.6,
	fontSize: '11px',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	width: '260px'
}
const styleTime = {color: '#777'}