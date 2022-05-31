import RedCanvasFrame from "../core/canvas/RedCanvasFrame.jsx";
import './RedFrameCenter.css'

/**
 * 미들 프레임의 가운데 부분
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