import ContextGradient from "../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstBoxBorderPropertyModeType from "./ConstBoxBorderPropertyModeType.js";
import RedSelect from "../../../../basicUI/RedSelect.jsx";
import ConstBoxBorderType from "../../../../../data/const/ConstBoxBorderType.js";
import RedDivision from "../../../../basicUI/RedDivision.jsx";

/**
 * 컨테이너 RedContainerBorderStyle 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderStyle = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)

	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {borderInfo} = containerInfo
	const {borderStyleInfo} = borderInfo
	const {mode} = borderStyleInfo
	const targetBorderStyleInfo = borderStyleInfo[mode]
	const HD_changeBorderStyleMode = (mode) => {
		gradientActions.update_borderStyleMode(mode)
	}
	const HD_changeBorder = (value, key, saveHistoryYn) => {
		gradientActions[`update_borderStyle`]({
			viewKey,
			key,
			value,
			mode: mode,
			saveHistoryYn
		})
	}
	const renderMerge = () => {
		return <RedSelect
			optionData={ConstBoxBorderType}
			value={targetBorderStyleInfo['borderStyle']}
			onChange={(e) => HD_changeBorder(e.target.value, 'borderStyle', true)}
		/>
	}
	const renderItem = key => {
		return <div style={style.itemBox}>
			{key}
			<RedSelect
				flexGrow={1}
				optionData={ConstBoxBorderType}
				value={targetBorderStyleInfo[`${key}Style`]}
				onChange={(e) => HD_changeBorder(e.target.value, `${key}Style`, true)}
			/>
		</div>
	}
	const renderSolo = () => {
		return <div style={style.previewBoxRoot}>
			<div style={style.previewBox}>
				<div style={style.top}>
					{renderItem('top')}
					{renderItem('right')}
				</div>
				<div style={style.bottom}>
					{renderItem('left')}
					{renderItem('bottom')}
				</div>
			</div>
		</div>
	}
	return (
		<div style={style.container}>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				Style
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
			{mode === ConstBoxBorderPropertyModeType.SOLO ? renderSolo() : renderMerge()}
		</div>
	)
}
export default RedContainerBorderStyle
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
		gap: '5px',
		width: '50%'
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