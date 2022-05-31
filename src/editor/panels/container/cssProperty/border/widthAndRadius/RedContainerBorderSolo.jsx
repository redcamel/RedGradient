import ContextGradient from "../../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasViewKey from "../../../../../../data/const/ConstCanvasViewKey.js";
import RedNumberField from "../../../../../basicUI/RedNumberField.jsx";
import RedSelect from "../../../../../basicUI/RedSelect.jsx";
import ConstUnitPxPercent from "../../../../../../data/const/ConstUnitPxPercent.js";
import ConstBoxBorderPropertyModeType from "../ConstBoxBorderPropertyModeType.js";

const edgeSet = [
	{
		location: 'top',
		children: [
			{
				valueKey: 'tl',
				valueUnitKey: 'tlUnit'
			},
			{
				valueKey: 'tr',
				valueUnitKey: 'trUnit'
			}
		]
	},
	{
		location: 'bottom',
		children: [
			{
				valueKey: 'bl',
				valueUnitKey: 'blUnit'
			},
			{
				valueKey: 'br',
				valueUnitKey: 'brUnit'
			},
		]
	}
]
const basicSet = [
	{
		location: 'top',
		children: [
			{
				valueKey: 'top',
				valueUnitKey: 'topUnit'
			},
			{
				valueKey: 'right',
				valueUnitKey: 'rightUnit'
			},
		]
	},
	{
		location: 'bottom',
		children: [
			{
				valueKey: 'left',
				valueUnitKey: 'leftUnit'
			},
			{
				valueKey: 'bottom',
				valueUnitKey: 'bottomUnit'
			}
		]
	}
]
const column = [
	{
		location: 'top',
		children: [
			{
				valueKey: 'top',
				valueUnitKey: 'topUnit'
			},
			{
				valueKey: 'right',
				valueUnitKey: 'rightUnit'
			},
			{
				valueKey: 'left',
				valueUnitKey: 'leftUnit'
			},
			{
				valueKey: 'bottom',
				valueUnitKey: 'bottomUnit'
			}
		]
	}
]
/**
 * 컨테이너 RedContainerBorderSolo 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderSolo = ({
																	viewKey,
																	valueKey,
																	targetInfo,
																	useUnit,
																	unitData = ConstUnitPxPercent,
																	layout = RedContainerBorderSolo.LAYOUT_BASIC
																}) => {
	const {actions: gradientActions} = useContext(ContextGradient)
	if (viewKey === ConstCanvasViewKey.ALL) return null
	const HD_changeBorder = (value, key, saveHistoryYn) => {
		gradientActions[`update_${valueKey}`]({
			viewKey,
			key,
			value,
			mode: ConstBoxBorderPropertyModeType.SOLO,
			saveHistoryYn
		})
	}
	const columnModeYn = layout === RedContainerBorderSolo.LAYOUT_COLUMN
	return (
		<div style={style.container}>
			<div style={style.previewBoxRoot}>
				<div style={style.previewBox}>
					{
						(layout).map(v => {
							return <div style={columnModeYn ? {
								display: 'flex',
								flexDirection: 'column',
								flexGrow: 1,
								gap: '5px'
							} : style[v['location']]}>
								{
									v.children.map(v2 => {
										const {valueKey, valueUnitKey} = v2
										// const iconKey = RedContainerBorderRadiusIcons[valueKey]
										return <div style={{...style.itemBox, width: columnModeYn ? '100%' : '50%'}}>
											{valueKey.charAt(0).toUpperCase()}{valueKey.substr(1)}
											{/*{iconKey}*/}
											<RedNumberField
												value={targetInfo[valueKey]} width={'100%'} flexGrow={1}
												min={0}
												onInput={(value, saveHistoryYn) => HD_changeBorder(value, valueKey, saveHistoryYn)}
												onKeyDown={(value, saveHistoryYn) => HD_changeBorder(value, valueKey, saveHistoryYn)}
												onBlur={(value, saveHistoryYn) => HD_changeBorder(value, valueKey, saveHistoryYn)}
											/>
											{
												useUnit && <RedSelect
													optionData={unitData}
													value={targetInfo[valueUnitKey]}
													onChange={(e) => HD_changeBorder(e.target.value, valueUnitKey, true)}
												/>
											}
										</div>
									})
								}
							</div>
						})
					}
				</div>
			</div>
		</div>
	)
}
RedContainerBorderSolo.LAYOUT_EDGE = edgeSet
RedContainerBorderSolo.LAYOUT_BASIC = basicSet
RedContainerBorderSolo.LAYOUT_COLUMN = column
export default RedContainerBorderSolo
const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
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
	previewBoxRoot: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	previewBox: {
		// border: '1px solid #222',
		width: '100%',
		minHeight: '50px',
		// background: '#222',
		// borderRadius : '6px',
	}
}