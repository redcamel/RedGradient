import ContextGradient from "../../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasViewKey from "../../../../../../data/const/ConstCanvasViewKey.js";
import ConstBoxBorderPropertyModeType from "../ConstBoxBorderPropertyModeType.js";
import RedContainerBorderSolo from "./RedContainerBorderSolo.jsx";
import RedContainerBorderMerge from "./RedContainerBorderMerge.jsx";
import RedDivision from "../../../../../basicUI/RedDivision.jsx";

/**
 * 컨테이너 RedContainerBorderWidth 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderWidth = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	if (viewKey === ConstCanvasViewKey.ALL) return null
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {borderInfo} = containerInfo
	const {borderWidthInfo} = borderInfo
	const {mode} = borderWidthInfo
	// console.log('test mode', mode)
	// console.log('test borderWidthInfo', borderWidthInfo)
	const targetBorderWidthInfo = borderWidthInfo[mode]
	const HD_changeBorderWidthMode = (mode) => {
		gradientActions.update_borderWidthMode(mode)
	}
	return (
		<div style={style.container}>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				Border Width
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
								onClick={() => HD_changeBorderWidthMode(v)}
							>
								{v}
							</div>
						})
					}
				</div>
			</div>
			<RedDivision/>
			{
				mode === ConstBoxBorderPropertyModeType.SOLO
					? <RedContainerBorderSolo viewKey={viewKey} valueKey={'borderWidth'} targetInfo={targetBorderWidthInfo}/>
					: <RedContainerBorderMerge viewKey={viewKey} valueKey={'borderWidth'} targetInfo={targetBorderWidthInfo}/>
			}
		</div>
	)
}
export default RedContainerBorderWidth
const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px',
		border: '1px solid #222',
		borderRadius: '8px',
		padding: '10px'
	}
}