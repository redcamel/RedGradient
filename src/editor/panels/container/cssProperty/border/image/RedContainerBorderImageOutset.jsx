import ContextGradient from "../../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstBoxBorderPropertyModeType from "../ConstBoxBorderPropertyModeType.js";
import RedContainerBorderSolo from "../widthAndRadius/RedContainerBorderSolo.jsx";
import RedContainerBorderMerge from "../widthAndRadius/RedContainerBorderMerge.jsx";
import RedDivision from "../../../../../basicUI/RedDivision.jsx";
import ConstUnitPxNumber from "../../../../../../data/const/ConstUnitPxNumber.js";

/**
 * 컨테이너 RedContainerBorderImageOutset 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderImageOutset = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {borderInfo} = containerInfo
	const {borderImageOutsetInfo} = borderInfo
	const {mode} = borderImageOutsetInfo
	// console.log('test mode', mode)
	// console.log('test borderRadiusInfo', borderRadiusInfo)
	const targetBorderImageOutsetInfo = borderImageOutsetInfo[mode]
	const HD_changeBorderRadiusMode = (mode) => {
		gradientActions.update_borderImageOutsetMode(mode)
	}
	return (
		<div style={style.container}>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				Border Image Outset
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
								onClick={() => HD_changeBorderRadiusMode(v)}
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
					? <RedContainerBorderSolo useUnit={true} viewKey={viewKey} valueKey={'borderImageOutset'}
																		targetInfo={targetBorderImageOutsetInfo} unitData={ConstUnitPxNumber}
																		layout={RedContainerBorderSolo.LAYOUT_COLUMN}/>
					: <RedContainerBorderMerge useUnit={true} viewKey={viewKey} valueKey={'borderImageOutset'}
																		 targetInfo={targetBorderImageOutsetInfo} unitData={ConstUnitPxNumber}/>
			}
		</div>
	)
}
export default RedContainerBorderImageOutset
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