import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasViewKey from "../../../../data/const/ConstCanvasViewKey.js";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";
import getCalcedContainerEditorLayoutInfo_pixel from "../../../core/canvas/getCalcedContainerEditorLayoutInfo_pixel.js";

/**
 * 컨테이너 포지션 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerPosition = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	if (viewKey === ConstCanvasViewKey.ALL) return null
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {positionInfo} = containerInfo
	const HD_changePosition = (value, key, saveHistoryYn) => {
		gradientActions.updateContainerSizePosition({
				viewKey,
				value: [
					{
						targetInfo: 'positionInfo',
						key: key,
						value: value
					}
				],
				saveHistoryYn
			}
		)
	}
	const HD_changeUnit = (e, prefix, sizeKey) => {
		const sameUnitYn = positionInfo[`${prefix}Unit`] === e.target.value
		const calced = getCalcedContainerEditorLayoutInfo_pixel(state)
		let calced_value;
		const targetCalced = calced[viewKey]
		if (sameUnitYn) {
			calced_value = positionInfo[prefix]
		} else {
			if (positionInfo[`${prefix}Unit`] === ConstUnitPxPercent.PX && e.target.value === ConstUnitPxPercent.PERCENT) {
				calced_value = positionInfo[`${prefix}`] * 100 / targetCalced.parentSizeInfo[sizeKey]
			} else {
				calced_value = targetCalced.raw[prefix]
			}
		}
		gradientActions.updateContainerSizePosition({
			viewKey,
			value: [
				{
					targetInfo: 'positionInfo',
					key: `${prefix}Unit`,
					value: e.target.value
				},
				{
					targetInfo: 'positionInfo',
					key: `${prefix}`,
					value: calced_value
				}
			],
			saveHistoryYn: true
		})
	}
	return (
		<div style={style.container}>
			<RedItemTitle label={'Position'}/>
			<div style={style.itemBox}>
				<div style={style.item}>
					<div style={style.label}>x :</div>
					<RedNumberField value={positionInfo.x} width={'100%'} flexGrow={1}
													onInput={(value, saveHistoryYn) => HD_changePosition(value, 'x', saveHistoryYn)}
													onKeyDown={(value, saveHistoryYn) => HD_changePosition(value, 'x', saveHistoryYn)}
													onBlur={(value, saveHistoryYn) => HD_changePosition(value, 'x', saveHistoryYn)}
													onDummySetting={(v) => gradientActions.setOtherContainerDummyRenderYn(v)}

					/>
					<RedSelect
						optionData={ConstUnitPxPercent}
						value={positionInfo['xUnit']}
						onChange={e => HD_changeUnit(e, 'x', 'width')}
					/>
				</div>
				<div style={style.item}>
					<div style={style.label}>y :</div>
					<RedNumberField value={positionInfo.y} width={'100%'} flexGrow={1}
													onInput={(value, saveHistoryYn) => HD_changePosition(value, 'y', saveHistoryYn)}
													onKeyDown={(value, saveHistoryYn) => HD_changePosition(value, 'y', saveHistoryYn)}
													onBlur={(value, saveHistoryYn) => HD_changePosition(value, 'y', saveHistoryYn)}
													onDummySetting={(v) => gradientActions.setOtherContainerDummyRenderYn(v)}
					/>
					<RedSelect
						optionData={ConstUnitPxPercent}
						value={positionInfo['yUnit']}
						onChange={e => HD_changeUnit(e, 'y', 'height')}
					/>
				</div>
			</div>
		</div>
	)
}
export default RedContainerPosition
const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px'
	},
	itemBox: {
		display: 'flex',
		justifyContent: 'flex-start',
		gap: '5px'
	},
	item: {
		display: 'flex',
		flexGrow: 1,
		alignItems: 'center',
		whiteSpace: 'nowrap',
		gap: '5px'
	},
	label: {
		// minWidth: '50px'
	}
}