import ContextGradient from "../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import RedItemTitle from "../../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../../basicUI/RedSelect.jsx";
import ConstBoxOutlineType from "../../../../../data/const/ConstBoxOutlineType.js";
import RedNumberField from "../../../../basicUI/RedNumberField.jsx";
import RedColorPickerButton from "../../../../basicUI/RedColorPickerButton.jsx";

/**
 * 컨테이너 outline 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerOutline = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)

	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {outlineInfo} = containerInfo
	const {type} = outlineInfo
	const disableYn = type === ConstBoxOutlineType.NONE
	const HD_changeOutline = (value, key, saveHistoryYn) => {
		gradientActions.updateContainerOutlineByKey({
			viewKey,
			key,
			value,
			saveHistoryYn
		})
	}
	const HD_getColor = () => outlineInfo['color']
	const HD_updateColorFunction = (v) => {
		gradientActions.updateContainerOutlineByKey({
			...v,
			key: 'color'
		})
	}
	const renderItem = key => {
		return <div style={style.item}>
			<div>{key}</div>
			<RedNumberField
				value={outlineInfo[key]} width={'100%'} min={0} flexGrow={1}
				onInput={(value, saveHistoryYn) => HD_changeOutline(value, key, saveHistoryYn)}
				onKeyDown={(value, saveHistoryYn) => HD_changeOutline(value, key, saveHistoryYn)}
				onBlur={(value, saveHistoryYn) => HD_changeOutline(value, key, saveHistoryYn)}

			/>
		</div>
	}
	return (
		<div style={style.container}>
			<div style={style.titleContainer2}>
				<RedItemTitle label={'Outline'} width={'100px'}/>
				<RedSelect
					flexGrow={1}
					optionData={ConstBoxOutlineType}
					value={type}
					onChange={(e) => HD_changeOutline(e.target.value, 'type', true)}
				/>
				<RedColorPickerButton
					getColorFunction={HD_getColor}
					updateFunction={HD_updateColorFunction}
				/>
			</div>
			<div style={{...style.titleContainer2, opacity: disableYn ? 0.25 : 1}}>
				<div style={style.itemBox}>
					{renderItem('width')}
					{renderItem('offset')}
				</div>
			</div>
		</div>
	)
}
export default RedContainerOutline
const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px'
	},
	titleContainer2: {
		display: 'flex',
		flexDirection: 'row',
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
}