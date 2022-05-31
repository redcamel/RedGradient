import './RedWindow.css'

const RedWindow = (props) => {
	return <div
		className={'RedWindow'} style={props.style}>
		{props.children}
	</div>
}
export default RedWindow