import ContextGradient from "../../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstBoxBorderPropertyModeType from "../ConstBoxBorderPropertyModeType.js";
import RedContainerBorderSolo from "../widthAndRadius/RedContainerBorderSolo.jsx";
import RedContainerBorderMerge from "../widthAndRadius/RedContainerBorderMerge.jsx";
import RedDivision from "../../../../../basicUI/RedDivision.jsx";
import ConstUnitNumberPercent from "../../../../../../data/const/ConstUnitNumberPercent.js";

/**
 * 컨테이너 RedContainerBorderImageSlice 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderImageSlice = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {borderInfo} = containerInfo
	const {borderImageSliceInfo} = borderInfo
	const {mode} = borderImageSliceInfo
	// console.log('test mode', mode)
	// console.log('test borderRadiusInfo', borderRadiusInfo)
	const targetBorderImageSliceInfo = borderImageSliceInfo[mode]
	const {borderImageSliceFill} = targetBorderImageSliceInfo
	const HD_changeBorderImageSliceMode = (mode) => {
		gradientActions.update_borderImageSliceMode(mode)
	}
	const HD_changeFill = (value, key, saveHistoryYn) => {
		gradientActions[`update_borderImageSlice`]({
			viewKey,
			key,
			value,
			mode: mode,
			saveHistoryYn
		})
	}
	return (
		<div style={style.container}>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				Border Image Slice

				<label onClick={(e) => HD_changeFill(!borderImageSliceFill, 'borderImageSliceFill', true)}>
					<div style={{display: 'flex', alignItems: 'center'}}>
						<input type={'checkbox'} key={Math.random()} checked={borderImageSliceFill}/>Fill
					</div>
				</label>
				<div style={{display: 'flex', overflow: 'hidden'}}>

					{
						Object.values(ConstBoxBorderPropertyModeType).map((v, index) => {
							const activeYn = v === mode
							return <div
								style={{
									padding: '6px 10px',
									background: activeYn ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : 'linear-gradient(rgb(30, 30, 30), rgb(0 0 0 / 45%))',
									borderRadius: index ? '0 4px 4px 0' : '4px 0 0 4px',
									border: `1px solid ${activeYn ? '#000' : '#000'}`,
									borderRight: index ? '1px solid #000' : 'none',
									cursor: 'pointer'
								}}
								onClick={() => HD_changeBorderImageSliceMode(v)}
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
					? <RedContainerBorderSolo useUnit={true} viewKey={viewKey} valueKey={'borderImageSlice'}
																		targetInfo={targetBorderImageSliceInfo} unitData={ConstUnitNumberPercent}
																		layout={RedContainerBorderSolo.LAYOUT_COLUMN}/>
					: <RedContainerBorderMerge useUnit={true} viewKey={viewKey} valueKey={'borderImageSlice'}
																		 targetInfo={targetBorderImageSliceInfo} unitData={ConstUnitNumberPercent}/>
			}
		</div>
	)
}
export default RedContainerBorderImageSlice
const style = {
	container: {
		background: 'rgba(0,0,0,0.1)',
		display: 'flex',
		flexDirection: 'column',
		gap: '5px',
		border: '1px solid #222',
		borderRadius: '8px',
		padding: '10px'
	}
}