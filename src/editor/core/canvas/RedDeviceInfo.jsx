import {useContext} from "react";
import '../splitterLayout/stylesheets/index.css';
import ContextGradient from "../../contexts/system/ContextGradient.js";
import RedNumberField from "../../basicUI/RedNumberField.jsx";
import RedSelect from "../../basicUI/RedSelect.jsx";
import ConstDevicePreset from "../../../data/const/ConstDevicePreset.js";

/**
 * 디바이스 설정을 담당
 * @returns {JSX.Element}
 * @constructor
 */
const RedDeviceInfo = ({children}) => {
	const {state: {deviceInfo}, actions: gradientActions} = useContext(ContextGradient)
	const {sizeInfo} = deviceInfo
	const keyNameData = Object.values(ConstDevicePreset).reduce((prev, current) => {
		prev[current['deviceName']] = current['deviceName']
		return prev
	}, {})
	let currentKeyName = keyNameData[0];
	for (const k in ConstDevicePreset) {
		const tData = ConstDevicePreset[k]
		if (
			tData['sizeInfo']['width'] === sizeInfo['width']
			&& tData['sizeInfo']['height'] === sizeInfo['height']
		) {
			currentKeyName = tData['deviceName']
			break
		}
	}
	const HD_changeSize = (value, key, saveHistoryYn) => gradientActions.updateDeviceByKey({key, value, saveHistoryYn})
	return (
		<div className={'RedCanvasFrame_topContainer'}>
			{children}
			Device
			<RedSelect
				optionData={keyNameData}
				value={currentKeyName}
				onChange={e => gradientActions.updateDevicePreset({value: e.target.value})}
			/>
			width : <RedNumberField
			value={sizeInfo['width']} width={'75px'}
			onInput={(value, saveHistoryYn) => HD_changeSize(value, 'width', saveHistoryYn)}
			onKeyDown={(value, saveHistoryYn) => HD_changeSize(value, 'width', saveHistoryYn)}
			onBlur={(value, saveHistoryYn) => HD_changeSize(value, 'width', saveHistoryYn)}
		/>
			height : <RedNumberField
			value={sizeInfo['height']} width={'75px'}
			onInput={(value, saveHistoryYn) => HD_changeSize(value, 'height', saveHistoryYn)}
			onKeyDown={(value, saveHistoryYn) => HD_changeSize(value, 'height', saveHistoryYn)}
			onBlur={(value, saveHistoryYn) => HD_changeSize(value, 'height', saveHistoryYn)}
		/>
		</div>
	)
}
export default RedDeviceInfo