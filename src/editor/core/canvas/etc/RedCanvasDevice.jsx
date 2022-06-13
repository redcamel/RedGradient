/**
 * 디바이스표현
 * @param layoutInfo
 * @param viewScale
 * @param visible
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvasDevice = ({layoutInfo, viewScale, visible}) => {
	return <div
		className={`RedCanvas_device ${visible ? 'active' : ''}`}
		style={{
			position: 'absolute',
			...layoutInfo.viewScalePixel,
			outlineWidth: visible ? 15 * viewScale + 'px' : 0
		}}
	/>
}
export default RedCanvasDevice