import ContextGradient from "../../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import RedNumberField from "../../../../../basicUI/RedNumberField.jsx";
import RedSelect from "../../../../../basicUI/RedSelect.jsx";
import ConstUnitPxPercent from "../../../../../../data/const/ConstUnitPxPercent.js";
import ConstBoxBorderPropertyModeType from "../ConstBoxBorderPropertyModeType.js";

/**
 * 컨테이너 RedContainerBorderMerge 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorderMerge = ({viewKey, valueKey, targetInfo, useUnit, unitData = ConstUnitPxPercent}) => {
	const {actions: gradientActions} = useContext(ContextGradient)
	
	const valueUnitKey = `${valueKey}Unit`
	const HD_changeBorder = (value, key, saveHistoryYn) => {
		gradientActions[`update_${valueKey}`]({
			viewKey,
			key,
			value,
			mode: ConstBoxBorderPropertyModeType.MERGE,
			saveHistoryYn
		})
	}
	return (
		<div style={style.container}>
			<div style={style.itemBox}>
				{/*{valueKey}*/}
				<RedNumberField
					value={targetInfo[valueKey]}
					width={'100%'}
					flexGrow={1}
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
		</div>
	)
}
export default RedContainerBorderMerge
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
		gap: '5px'
	}
}