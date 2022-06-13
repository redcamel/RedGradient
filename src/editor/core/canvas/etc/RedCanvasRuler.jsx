import Ruler from "@scena/react-ruler";

/**
 * RedCanvasRuler
 * @param layoutInfo
 * @param viewScale
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvasRuler = ({layoutInfo, viewScale}) => {
	const lineColor = '#525252'
	const textColor = '#ccc'
	const backgroundColor = 'transparent'
	const {raw} = layoutInfo
	const commonAttr = {
		zoom: viewScale,
		direction: "end",
		backgroundColor,
		lineColor,
		textColor
	}
	return <div style={styleContainer}>
		<Ruler
			{...commonAttr}
			type="horizontal"
			style={{
				position: 'absolute', display: "block",
				width: `${raw['width'] * 10}px`,
				height: "20px",
				top: `${-20 + raw.y}px`,
				left: `${raw.x}px`,
			}}
			scrollPos={raw.x / viewScale}
			textOffset={[0, 5]}
		/>
		<Ruler
			{...commonAttr}
			type="vertical"
			style={{
				position: 'absolute', display: "block",
				width: "20px",
				height: `${raw['height'] * 10}px`,
				top: `${raw.y}px`,
				left: `${-20 + raw.x}px`,
			}}
			scrollPos={raw.y / viewScale}
			textOffset={[5, 0]}
			negativeRuler
		/>
	</div>
}
export default RedCanvasRuler
const styleContainer = {position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none'}