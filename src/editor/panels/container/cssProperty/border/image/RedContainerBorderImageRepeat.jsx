import ContextGradient from "../../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import RedSelect from "../../../../../basicUI/RedSelect.jsx";
import RedDivision from "../../../../../basicUI/RedDivision.jsx";
import ConstBoxBorderImageRepeatType from "../ConstBoxBorderImageRepeatType.js";

/**
 * 컨테이너 RedContainerBorderImageRepeat 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderImageRepeat = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {borderInfo} = containerInfo
	const {borderImageRepeatInfo} = borderInfo
	const HD_changeBorder = (value, key, saveHistoryYn) => {
		gradientActions[`update_borderImageRepeat`]({
			viewKey,
			key,
			value,
			saveHistoryYn
		})
	}
	return (
		<div style={style.container}>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				Border Image Repeat
			</div>
			<RedDivision/>
			<div style={style.previewBoxRoot}>
				<div style={style.itemBox}>
					Vertical
					<RedSelect
						flexGrow={1}
						optionData={ConstBoxBorderImageRepeatType}
						value={borderImageRepeatInfo['verticalRepeat']}
						onChange={(e) => HD_changeBorder(e.target.value, 'verticalRepeat', true)}
					/>
				</div>
				<div style={style.itemBox}>
					Horizontal
					<RedSelect
						flexGrow={1}
						optionData={ConstBoxBorderImageRepeatType}
						value={borderImageRepeatInfo['horizontalRepeat']}
						onChange={(e) => HD_changeBorder(e.target.value, 'horizontalRepeat', true)}
					/>
				</div>
			</div>
		</div>
	)
}
export default RedContainerBorderImageRepeat
const style = {
	container: {
		background: 'rgba(0,0,0,0.1)',
		display: 'flex',
		flexDirection: 'column',
		gap: '5px',
		border: '1px solid #222',
		borderRadius: '8px',
		padding: '10px'
	},
	top: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		display: 'flex',
		flexGrow: 1,
		gap: '5px'
	},
	bottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		display: 'flex',
		flexGrow: 1,
		gap: '5px'
	},
	itemBox: {
		color: '#666',
		display: 'flex',
		alignItems: 'center',
		gap: '5px',
		width: '50%'
	},
	previewBoxRoot: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '5px'
	},
	previewBox: {
		// border: '1px solid #222',
		width: '100%',
		height: '50px',
		// background: '#222',
		// borderRadius : '6px',
	}
}