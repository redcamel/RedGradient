import './RedFrameLeft.css'
import RedContainerEditor from "../panels/container/RedContainerEditor.jsx";

/**
 * RedFrameLeft
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameLeft = () => {
	return (
		<div className={'RedFrameLeft_container'}>
			<RedContainerEditor/>
		</div>
	)
}
export default RedFrameLeft