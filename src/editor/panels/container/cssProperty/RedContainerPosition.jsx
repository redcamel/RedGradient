import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
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
		const value = e.target.value
		const sameUnitYn = positionInfo[`${prefix}Unit`] === value
		const calced = getCalcedContainerEditorLayoutInfo_pixel(state)
		let calced_value;
		const targetCalced = calced[viewKey]
		if (sameUnitYn) {
			calced_value = positionInfo[prefix]
		} else {
			if (positionInfo[`${prefix}Unit`] === ConstUnitPxPercent.PX && value === ConstUnitPxPercent.PERCENT) {
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
					value: value
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
	const renderItem = (key, unit) => {
		return <div style={style.item}>
			<div style={style.label}>{key} :</div>
			<RedNumberField
				value={positionInfo[key]} width={'100%'} flexGrow={1}
				onInput={(value, saveHistoryYn) => HD_changePosition(value, key, saveHistoryYn)}
				onKeyDown={(value, saveHistoryYn) => HD_changePosition(value, key, saveHistoryYn)}
				onBlur={(value, saveHistoryYn) => HD_changePosition(value, key, saveHistoryYn)}
				onDummySetting={(v) => gradientActions.setOtherContainerDummyRenderYn(v)}

			/>
			<RedSelect
				optionData={ConstUnitPxPercent}
				value={positionInfo[`${key}Unit`]}
				onChange={e => HD_changeUnit(e, key, unit)}
			/>
		</div>
	}
	return (
		<div style={style.container}>
			<RedItemTitle label={'Position'}/>
			<div style={style.itemBox}>
				{renderItem('x', 'width')}
				{renderItem('y', 'height')}
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