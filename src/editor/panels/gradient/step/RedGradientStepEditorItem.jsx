import './RedGradientStepEditorItem.css'
import {
	faArrowDown,
	faArrowsUpDown,
	faArrowUp,
	faCopy,
	faScissors,
	faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import RedToolTipIcon from "../../../basicUI/icon/RedToolTipIcon.jsx";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import RedColorPickerButton from "../../../basicUI/RedColorPickerButton.jsx";
import RedDivision from "../../../basicUI/RedDivision.jsx";
import ConstUnitPxPercentAuto from "../../../../data/const/ConstUnitPxPercentAuto.js";
import ConstGradientStepMode from "../../../../data/const/ConstGradientStepMode.js";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import RedGradientStepEditorItemSlider from "./RedGradientStepEditorItemSlider";
import ConstGradientType from "../../../../data/const/ConstGradientType";
import ConstUnitPercentAuto from "../../../../data/const/ConstUnitPercentAuto";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent";
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA";

/**
 * RedGradientStepEditorItem
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientStepEditorItem = ({
																		 gradientType,
																		 data,
																		 borderGradientMode,
																		 activeYn,
																		 time,
																		 stepIDX,
																		 groupIndex,
																		 groupLayerIndex,
																		 stepInfoList,
																		 //
																		 dummyDropTargetYn,
																		 dummyYn,
																		 onDragStart,
																		 onDragEnter,
																		 onDragOver,
																		 onDragLeave,
																		 onDragEnd,
																		 onDrop,
																	 }) => {
	const {state: gradientState, actions} = useContext(ContextGradient)
	const HD_changeStepInfo = (targetInfo, key, value, saveHistoryYn) => {
		const updateList = []
		if (key === 'mode') {
			if (value !== data['mode'] && value === ConstGradientStepMode.RANGE) {
				data['end'] = JSON.parse(JSON.stringify(data['start']))
			}
		}
		if (key === 'stopUnit') {
			if (data[targetInfo] && value === ConstUnitPxPercentAuto.AUTO) {
				data[targetInfo]['divideYn'] = false
			} else {
				const {
					layerSizeW
				} = HELPER_GET_DATA.calcLayerPixelSize(gradientState, HELPER_GET_DATA.getActiveLayerInfo(gradientState))

				if (value !== data[targetInfo]['stopUnit']) {
					if (value !== ConstUnitPxPercentAuto.AUTO) {
						//TODO 개선해야함
						let newStop = data[targetInfo]['stop']
						if (value === ConstUnitPxPercent.PERCENT) {
							newStop = data[targetInfo]['stop'] / layerSizeW * 100
						} else if (value === ConstUnitPxPercent.PX) {
							newStop = layerSizeW * data[targetInfo]['stop'] * 0.01
						}
						updateList.push(
							{
								key: 'stop',
								targetInfo,
								stepIDX,
								time,
								value: newStop,
								groupIndex,
								groupLayerIndex,
								saveHistoryYn
							}
						)
					}

				}

			}


		}
		updateList.push(
			{
				key,
				targetInfo,
				stepIDX,
				time,
				value,
				groupIndex,
				groupLayerIndex,
				saveHistoryYn
			}
		)
		if (borderGradientMode) {

			actions.updateBorderGradientStepValueInfoByKey(
				updateList
			)
		} else {

			actions.updateLayerStepInfoByKey(
				updateList
			)
		}

	}
	const HD_duplicateStepInfo = () => {

		actions.duplicateLayerStepInfo(
			{
				stepIDX,
				time,
				groupIndex,
				groupLayerIndex,
				borderGradientMode,
				saveHistoryYn: true,
			}
		)
	}
	const HD_removeStepInfo = () => {
		actions.removeLayerStepInfo(
			{
				stepIDX,
				time,
				groupIndex,
				groupLayerIndex,
				saveHistoryYn: true,
				borderGradientMode
			}
		)
	}
	const targetUnitOptionData = (gradientType === ConstGradientType.CONIC || gradientType === ConstGradientType.REPEATING_CONIC) ? ConstUnitPercentAuto : ConstUnitPxPercentAuto
	return (
		<div className={`RedGradientEditor_step_item ${activeYn ? 'active' : ''}`}>
			<div
				className={'RedGradientStepEditor_stepItemArea'}
				draggable={true}
				onDragStart={onDragStart}
				onDragEnter={onDragEnter}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDragEnd={onDragEnd}
				onDrop={dummyDropTargetYn ? onDrop : () => {
				}}
				style={{
					background: dummyDropTargetYn ? 'rgba(112,79,129,0.5)' : 'rgba(255,0,0,0.0)',
					...(dummyYn ? {zIndex: 100} : {})
				}}
			>
				<div className={'RedGradientStepEditor_stepItemAreaTitle'}
						 style={{
							 opacity: dummyDropTargetYn ? 1 : 0,
							 transform: dummyDropTargetYn ? 'scale(1)' : 'scale(0.8)'
							 // transform : dummyDropTargetYn ? 'scale(1)' : 'scale(0)'
						 }}
				>Drop here
				</div>
			</div>
			<div className={'RedGradientEditor_step_item_top'}>
				<div className={'RedGradientEditor_step_item_width'}>
					<RedSelect
						optionData={{SINGLE: 'single', RANGE: 'range'}}
						value={data['mode']}
						onChange={e => HD_changeStepInfo(null, 'mode', e.target.value, true)}
					/>
				</div>
				<div
					className={'RedGradientEditor_step_item_icons'}
				>
					{
						stepInfoList.length > 1 && <RedToolTipIcon
							icon={faTrashCan}
							toolTip={'Remove Step'}
							onClick={HD_removeStepInfo}
						/>
					}
					{
						data['mode'] === ConstGradientStepMode.RANGE &&
						<div className={'RedGradientEditor_step_item_colorActionBox'}>
							{/*<span style={{marginRight: '4px', color: '#777', fontWeight: 500}}>Color</span>*/}
							<RedToolTipIcon icon={faArrowsUpDown} toolTip={'Swap Color'} onClick={() => {
								actions.swapColorStepInfo(
									{
										stepIDX,
										time,
										groupIndex,
										groupLayerIndex,
										saveHistoryYn: true,
										borderGradientMode
									}
								)

							}}/>
							<RedToolTipIcon icon={faArrowDown} toolTip={'Copy Color - start to end'} onClick={() => {
								actions.copyColorStepInfo(
									{
										stepIDX,
										time,
										groupIndex,
										groupLayerIndex,
										toEnd: true,
										saveHistoryYn: true,
										borderGradientMode
									}
								)
							}}/>
							<RedToolTipIcon icon={faArrowUp} toolTip={'Copy Color - end to start'} onClick={() => {
								actions.copyColorStepInfo(
									{
										stepIDX,
										time,
										groupIndex,
										groupLayerIndex,
										toEnd: false,
										saveHistoryYn: true,
										borderGradientMode
									}
								)
							}}/>
						</div>
					}

					<RedToolTipIcon icon={faCopy}
													toolTip={'Duplicate Step'}
													onClick={HD_duplicateStepInfo}
					/>
				</div>
			</div>
			<RedDivision/>
			<div className={'RedGradientEditor_step_item_bottom'}>
				<div style={{display: 'flex', flexDirection: 'column', gap: '2px', width: '100%'}}>
					<div className={'RedGradientEditor_step_item_width'}>
						{
							data['start']['stopUnit'] !== ConstUnitPxPercentAuto.AUTO
							&& <RedToolTipIcon
								icon={faScissors} activeYn={data['start']['divideYn']}
								toolTip={'divide'}
								onClick={() => HD_changeStepInfo('start', 'divideYn', !data['start']['divideYn'], true)}
							/>
						}

						<RedColorPickerButton
							getColorFunction={() => data['start']['colorHint']}
							updateFunction={(v) => {
								HD_changeStepInfo('start', 'colorHint', v['value'], v.saveHistoryYn)
							}}
						/>
						{
							data['start']['stopUnit'] !== ConstUnitPxPercentAuto.AUTO
							&& <RedNumberField
								value={data['start']['stop']}
								width={'100%'} flexGrow={1}
								onInput={(value, saveHistoryYn) => HD_changeStepInfo('start', 'stop', value, saveHistoryYn)}
								onKeyDown={(value, saveHistoryYn) => HD_changeStepInfo('start', 'stop', value, saveHistoryYn)}
								onBlur={(value, saveHistoryYn) => HD_changeStepInfo('start', 'stop', value, saveHistoryYn)}
							/>
						}

						<RedSelect
							flexGrow={1}
							optionData={targetUnitOptionData}
							value={data['start']['stopUnit']}
							onChange={e => HD_changeStepInfo('start', 'stopUnit', e.target.value, true)}
						/>
					</div>
					{
						data['mode'] === ConstGradientStepMode.RANGE && <div className={'RedGradientEditor_step_item_width'}>
							{
								data['end']['stopUnit'] !== ConstUnitPxPercentAuto.AUTO
								&& <RedToolTipIcon
									icon={faScissors}
									activeYn={data['end']['divideYn']}
									toolTip={'divide'}
									onClick={() => HD_changeStepInfo('end', 'divideYn', !data['end']['divideYn'], true)}
								/>
							}
							<RedColorPickerButton
								getColorFunction={() => data['end']['colorHint']}
								updateFunction={(v) => {
									HD_changeStepInfo('end', 'colorHint', v['value'], v.saveHistoryYn)
								}}
							/>
							{
								data['end']['stopUnit'] !== ConstUnitPxPercentAuto.AUTO
								&& <RedNumberField
									value={data['end']['stop']}
									width={'100%'} flexGrow={1}
									onInput={(value, saveHistoryYn) => HD_changeStepInfo('end', 'stop', value, saveHistoryYn)}
									onKeyDown={(value, saveHistoryYn) => HD_changeStepInfo('end', 'stop', value, saveHistoryYn)}
									onBlur={(value, saveHistoryYn) => HD_changeStepInfo('end', 'stop', value, saveHistoryYn)}
								/>
							}
							<RedSelect
								flexGrow={1}
								optionData={targetUnitOptionData}
								value={data['end']['stopUnit'] || ConstUnitPxPercentAuto.AUTO}
								onChange={e => HD_changeStepInfo('end', 'stopUnit', e.target.value, true)}
							/>
						</div>
					}

				</div>
			</div>
			<RedDivision/>
			<RedGradientStepEditorItemSlider
				data={data} onChange={(key, value, saveHistoryYn) => {
				HD_changeStepInfo(key, 'stop', value, saveHistoryYn)
			}}/>
			{/*{JSON.stringify(data)}*/}

		</div>
	)
}
export default RedGradientStepEditorItem