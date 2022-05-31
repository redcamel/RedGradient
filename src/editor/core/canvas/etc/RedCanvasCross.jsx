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
	const rawInfo = layoutInfo.raw
	const pxInfo = layoutInfo.viewScalePixel
	const originInfo = layoutInfo.origin
	return <>
		<div style={{
			position: 'absolute',
			left: `${rawInfo.x - 38}px`,
			top: pxInfo.y,
			fontSize: '12px',
			color: '#666',
			writingMode: 'vertical-lr',
			transform: 'rotate(180deg)',
			whiteSpace: 'nowrap',
			pointerEvents: 'none'
		}}>
			Device Size - {originInfo.width} * {originInfo.height}
		</div>
		<div style={{
			position: 'absolute',
			left: pxInfo.x,
			top: pxInfo.y,
			width: pxInfo.width,
			height: pxInfo.height,
			border: border2,
			pointerEvents: 'none'
		}}/>
		<>
			<div style={{
				position: 'absolute',
				top: `${-size + rawInfo.y}px`,
				left: pxInfo.x,
				width: 0,
				height: `${size * 2}px`,
				borderLeft: border,
				pointerEvents: 'none'
			}}/>
			<div style={{
				position: 'absolute',
				top: pxInfo.y,
				left: `${-size + rawInfo.x}px`,
				width: `${size * 2}px`,
				height: 0,
				borderTop: border,
				pointerEvents: 'none'
			}}/>
		</>
		<>
			<div style={{
				position: 'absolute',
				top: `${-size + rawInfo.y}px`,
				left: `${rawInfo.width + rawInfo.x}px`,
				width: 0,
				height: `${size * 2}px`,
				borderLeft: border,
				pointerEvents: 'none'
			}}/>
			<div style={{
				position: 'absolute',
				top: pxInfo.y,
				left: `${rawInfo.width + rawInfo.x - size}px`,
				width: `${size * 2}px`,
				height: 0,
				borderTop: border,
				pointerEvents: 'none'
			}}/>
		</>
		<>
			<div style={{
				position: 'absolute',
				top: `${rawInfo.height + rawInfo.y - size}px`,
				left: pxInfo.x,
				width: 0,
				height: `${size * 2}px`,
				borderLeft: border,
				pointerEvents: 'none'
			}}/>
			<div style={{
				position: 'absolute',
				top: `${rawInfo.height + rawInfo.y}px`,
				left: `${-size + rawInfo.x}px`,
				width: `${size * 2}px`,
				height: 0,
				borderTop: border,
				pointerEvents: 'none'
			}}/>
		</>
		<>
			<div style={{
				position: 'absolute',
				top: `${rawInfo.height + rawInfo.y - size}px`,
				left: `${rawInfo.width + rawInfo.x}px`,
				width: 0,
				height: `${size * 2}px`,
				borderLeft: border,
				pointerEvents: 'none'
			}}/>
			<div style={{
				position: 'absolute',
				top: `${rawInfo.height + rawInfo.y}px`,
				left: `${rawInfo.width + rawInfo.x - size}px`,
				width: `${size * 2}px`,
				height: 0,
				borderTop: border,
				pointerEvents: 'none'
			}}/>
		</>
	</>
}
export default RedCanvasCross