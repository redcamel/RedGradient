import ContextGradient from "../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasViewKey from "../../../../../data/const/ConstCanvasViewKey.js";
import ConstBoxBorderPropertyModeType from "./ConstBoxBorderPropertyModeType.js";
import RedColorPickerButton from "../../../../basicUI/RedColorPickerButton.jsx";
import RedDivision from "../../../../basicUI/RedDivision.jsx";

/**
 * 컨테이너 RedContainerBorderColor 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderColor = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	if (viewKey === ConstCanvasViewKey.ALL) return null
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {borderInfo} = containerInfo
	const {borderColorInfo} = borderInfo
	const {mode} = borderColorInfo
	const targetBorderColorInfo = borderColorInfo[mode]
	const HD_changeBorderStyleMode = (mode) => {
		gradientActions.update_borderColorMode(mode)
	}
	const HD_updateColorFunction = (value, key) => {
		gradientActions[`update_borderColor`]({
			viewKey,
			key,
			mode: mode,
			...value
		})
	}
	const renderMerge = () => {
		const HD_getColor = () => targetBorderColorInfo['borderColor']
		return <div style={{...style.itemBox, width: '100%'}}>
			borderColor
			<div style={style.itemValue}>
				{targetBorderColorInfo['borderColor']}
				<RedColorPickerButton
					getColorFunction={HD_getColor}
					updateFunction={(v) => HD_updateColorFunction(v, 'borderColor')}
				/>
			</div>
		</div>
	}
	const renderSolo = () => {
		const HD_getColor = (key) => targetBorderColorInfo[key]
		return <div style={style.previewBoxRoot}>
			<div style={style.previewBox}>
				<div style={style.top}>
					<div style={style.itemBox}>
						T
						<div style={style.itemValue}>
							{targetBorderColorInfo['topBorderColor']}
							<RedColorPickerButton
								getColorFunction={() => HD_getColor('topBorderColor')}
								updateFunction={(v) => HD_updateColorFunction(v, 'topBorderColor')}
							/>
						</div>
					</div>
					<div style={style.itemBox}>
						R
						<div style={style.itemValue}>
							{targetBorderColorInfo['rightBorderColor']}
							<RedColorPickerButton
								getColorFunction={() => HD_getColor('rightBorderColor')}
								updateFunction={(v) => HD_updateColorFunction(v, 'rightBorderColor')}
							/>
						</div>
					</div>
				</div>
				<div style={style.bottom}>
					<div style={style.itemBox}>
						L
						<div style={style.itemValue}>
							{targetBorderColorInfo['leftBorderColor']}
							<RedColorPickerButton
								getColorFunction={() => HD_getColor('leftBorderColor')}
								updateFunction={(v) => HD_updateColorFunction(v, 'leftBorderColor')}
							/>
						</div>
					</div>
					<div style={style.itemBox}>
						B
						<div style={style.itemValue}>
							{targetBorderColorInfo['bottomBorderColor']}
							<RedColorPickerButton
								getColorFunction={() => HD_getColor('bottomBorderColor')}
								updateFunction={(v) => HD_updateColorFunction(v, 'bottomBorderColor')}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
	return (
		<div style={style.container}>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				Border Color
				<div style={{display: 'flex', overflow: 'hidden'}}>
					{
						Object.values(ConstBoxBorderPropertyModeType).map((v, index) => {
							const activeYn = v === mode
							return <div
								key={index}
								style={{
									padding: '6px 10px',
									background: activeYn ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : 'linear-gradient(rgb(30, 30, 30), rgb(0 0 0 / 45%))',
									borderRadius: index ? '0 4px 4px 0' : '4px 0 0 4px',
									border: `1px solid ${activeYn ? '#000' : '#000'}`,
									borderRight: index ? '1px solid #000' : 'none',
									cursor: 'pointer'
								}}
								onClick={() => HD_changeBorderStyleMode(v)}
							>
								{v}
							</div>
						})
					}
				</div>
			</div>
			<RedDivision/>
			{
				mode === ConstBoxBorderPropertyModeType.SOLO ? renderSolo() : renderMerge()
			}

		</div>
	)
}
export default RedContainerBorderColor
const style = {
	container: {
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
		justifyContent: 'space-between',
		gap: '5px',
		width: '50%'
	},
	itemValue: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: '5px',
	},
	previewBoxRoot: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	previewBox: {
		// border: '1px solid #222',
		width: '100%',
		height: '50px',
		// background: '#222',
		// borderRadius : '6px',
	}
}