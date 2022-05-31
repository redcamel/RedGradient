const RedToastSkin = ({title, text}) => {
	return <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
		<b style={{fontSize: '12px', opacity: 0.8}}>{title}</b>
		<div style={{
			color: '#efb26a', lineHeight: 1.6,
			fontSize: '11px',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			width: '260px'
		}}>{text}</div>
		<div style={{color: '#777'}}>{(new Date()).toLocaleDateString()} {(new Date()).toLocaleTimeString()}</div>
	</div>

}
export default RedToastSkin