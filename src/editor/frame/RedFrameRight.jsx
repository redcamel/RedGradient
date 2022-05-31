import './RedFrameRight.css'
import RedGradientEditor from "../panels/gradient/RedGradientEditor.jsx";
import RedLayerGroup from "../panels/layer/RedLayerGroup.jsx";
import RedGradientStepEditor from "../panels/gradient/step/RedGradientStepEditor.jsx";

/**
 * 미들 프레임의 오른쪽 부분
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameRight = () => {
	return (
		<div className={'RedFrameRight_container'}>
			<div className={'RedFrameRight_container_item'}>
				<RedLayerGroup/>
			</div>
			<div
				className={'RedFrameRight_container_item'}

			>
				<RedGradientEditor/>
			</div>
			<div
				className={'RedFrameRight_container_item'}
				style={{width: '100%'}}
			>
				<RedGradientStepEditor/>
			</div>

		</div>
	)
}
export default RedFrameRight
