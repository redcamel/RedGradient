/**
 * 캔버스의 디바이스 외곽표현
 * @param layoutInfo
 * @param viewScale
 * @param size
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvasCross = ({layoutInfo, size = 10}) => {
	const border = '1px dashed rgba(255,255,255,.25)'
	const border2 = '1px dashed rgba(255,255,255,.25)'
	const {raw, viewScalePixel, origin} = layoutInfo
	return <>
		<div style={{
			position: 'absolute',
			left: `${raw.x - 38}px`,
			top: viewScalePixel.y,
			fontSize: '12px',
			color: '#666',
			writingMode: 'vertical-lr',
			transform: 'rotate(180deg)',
			whiteSpace: 'nowrap',
			pointerEvents: 'none'
		}}>
			Device Size - {origin.width} * {origin.height}
		</div>
		<div style={{
			position: 'absolute',
			left: viewScalePixel.x,
			top: viewScalePixel.y,
			width: viewScalePixel.width,
			height: viewScalePixel.height,
			border: border2,
			pointerEvents: 'none'
		}}/>
		<>
			<div style={{
				position: 'absolute',
				top: `${-size + raw.y}px`,
				left: viewScalePixel.x,
				width: 0,
				height: `${size * 2}px`,
				borderLeft: border,
				pointerEvents: 'none'
			}}/>
			<div style={{
				position: 'absolute',
				top: viewScalePixel.y,
				left: `${-size + raw.x}px`,
				width: `${size * 2}px`,
				height: 0,
				borderTop: border,
				pointerEvents: 'none'
			}}/>
		</>
		<>
			<div style={{
				position: 'absolute',
				top: `${-size + raw.y}px`,
				left: `${raw.width + raw.x}px`,
				width: 0,
				height: `${size * 2}px`,
				borderLeft: border,
				pointerEvents: 'none'
			}}/>
			<div style={{
				position: 'absolute',
				top: viewScalePixel.y,
				left: `${raw.width + raw.x - size}px`,
				width: `${size * 2}px`,
				height: 0,
				borderTop: border,
				pointerEvents: 'none'
			}}/>
		</>
		<>
			<div style={{
				position: 'absolute',
				top: `${raw.height + raw.y - size}px`,
				left: viewScalePixel.x,
				width: 0,
				height: `${size * 2}px`,
				borderLeft: border,
				pointerEvents: 'none'
			}}/>
			<div style={{
				position: 'absolute',
				top: `${raw.height + raw.y}px`,
				left: `${-size + raw.x}px`,
				width: `${size * 2}px`,
				height: 0,
				borderTop: border,
				pointerEvents: 'none'
			}}/>
		</>
		<>
			<div style={{
				position: 'absolute',
				top: `${raw.height + raw.y - size}px`,
				left: `${raw.width + raw.x}px`,
				width: 0,
				height: `${size * 2}px`,
				borderLeft: border,
				pointerEvents: 'none'
			}}/>
			<div style={{
				position: 'absolute',
				top: `${raw.height + raw.y}px`,
				left: `${raw.width + raw.x - size}px`,
				width: `${size * 2}px`,
				height: 0,
				borderTop: border,
				pointerEvents: 'none'
			}}/>
		</>
	</>
}
export default RedCanvasCross