import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedColorPickerButton from "../../../basicUI/RedColorPickerButton.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstBoxShadowType from "../../../../data/const/ConstBoxShadowType.js";

/**
 * box-shadow 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBoxShadow = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)

	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {boxShadowInfo} = containerInfo
	const HD_changeBoxShadow = (value, key, saveHistoryYn) => {
		gradientActions.updateContainerBoxShadowByKey({
			viewKey,
			key,
			value,
			saveHistoryYn
		})
	}
	const HD_getColor = () => boxShadowInfo['color']
	const HD_updateColorFunction = (v) => {
		gradientActions.updateContainerBoxShadowColor(v)
	}
	const HD_changeBoxShadowType = (e) => {
		gradientActions.updateContainerBoxShadowType({
			viewKey,
			value: e.target.value
		})
	}
	const renderItem = key => {
		return <div style={style.itemBox}>
			<div>{key}</div>
			<RedNumberField
				value={boxShadowInfo[key]} width={'100%'} flexGrow={1}
				onInput={(value, saveHistoryYn) => HD_changeBoxShadow(value, key, saveHistoryYn)}
				onKeyDown={(value, saveHistoryYn) => HD_changeBoxShadow(value, key, saveHistoryYn)}
				onBlur={(value, saveHistoryYn) => HD_changeBoxShadow(value, key, saveHistoryYn)}
			/>
		</div>
	}
	return (
		<div style={style.container}>
			<div style={style.title}>
				<RedItemTitle label={'Box Shadow'}/>
				{HD_getColor()}
				<RedColorPickerButton
					getColorFunction={HD_getColor}
					updateFunction={HD_updateColorFunction}
				/>
			</div>
			<RedSelect
				flexGrow={1}
				optionData={ConstBoxShadowType}
				value={boxShadowInfo.type}
				onChange={HD_changeBoxShadowType}
			/>
			{renderItem('blur')}
			{renderItem('spread')}
			<div style={style.itemBox}>
				{renderItem('offsetX')}
				{renderItem('offsetY')}
			</div>
		</div>
	)
}
export default RedContainerBoxShadow
const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px'
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		gap: '5px'
	},
	itemBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: '5px'
	}
}