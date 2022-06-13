import RedCanvasFrame from "../core/canvas/RedCanvasFrame.jsx";
import './RedFrameCenter.css'

/**
 * RedFrameCenter
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameCenter = () => {
	return (
		<div className={'RedFrameCenter_container'}>
			<RedCanvasFrame/>
		</div>
	)
}
export default RedFrameCenter