import Ruler from "@scena/react-ruler";

/**
 * RedCanvasRuller
 * @param layoutInfo
 * @param viewScale
 * @param size
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvasRuller = ({layoutInfo, viewScale, visible, size = 20}) => {
	return <div style={{
		position: 'absolute',
		top: 0, left: 0, right: 0,
		pointerEvents: 'none'
	}}>
		{
			visible && <>
				<Ruler
					zoom={viewScale}
					type="horizontal"
					direction="end"
					style={{
						display: "block",
						height: "20px",
						position: 'absolute',
						width: `${layoutInfo.raw['width'] * 10}px`,
						top: `${-20 + layoutInfo.raw.y}px`,
						left: `${layoutInfo.raw.x}px`,
					}}
					backgroundColor={'transparent'}
					lineColor={'#525252'}
					textColor={'#ccc'}
					textOffset={[0, 5]}
					scrollPos={layoutInfo.raw.x / viewScale}
				/>
				<Ruler
					zoom={viewScale}
					type="vertical"
					direction="end"
					style={{
						display: "block",
						width: "20px",
						position: 'absolute',
						height: `${layoutInfo.raw['height'] * 10}px`,
						left: `${-20 + layoutInfo.raw.x}px`,
						top: `${layoutInfo.raw.y}px`,
					}}
					backgroundColor={'transparent'}
					lineColor={'#525252'}
					textColor={'#ccc'}
					textOffset={[5, 0]}
					scrollPos={layoutInfo.raw.y / viewScale}
					negativeRuler
				/>
			</>
		}
	</div>
}
export default RedCanvasRuller