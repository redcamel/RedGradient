import './RedFrameLeft.css'
import RedContainerEditor from "../panels/container/RedContainerEditor.jsx";

/**
 * 미들 프레임의 왼쪽부분
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