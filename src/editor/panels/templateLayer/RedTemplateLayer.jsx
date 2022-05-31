import './RedTemplateLayer.css'
import {useContext, useState} from "react";
import ContextWindows from "../../contexts/window/ContextWindows";
import RedPanelTitle from "../../basicUI/panel/RedPanelTitle";
import ConstGradientType from "../../../data/const/ConstGradientType";
import RedNumberField from "../../basicUI/RedNumberField";
import RedSelect from "../../basicUI/RedSelect";
import gsap from "gsap";
import RedColorPickerButton from "../../basicUI/RedColorPickerButton";
import DataRedGradientStepInfo from "../../../data/DataRedGradientStepInfo";
import calcLayerGradient from "../layer/calcLayerGradient";
import DataRedGradientLayer from "../../../data/DataRedGradientLayer";
import ConstGradientStepMode from "../../../data/const/ConstGradientStepMode";
import ConstEndingShape from "../../../data/const/ConstEndingShape";

/**
 * 히스토리 창
 * @returns {JSX.Element}
 * @constructor
 */
const easeNameList = [
	'none',
	'power1',
	'power2',
	'power3',
	'power4',
	'circ',
	// 'back',
	// 'bounce',
	// 'elastic',
	'sine',
	'expo',
	'step'
];
const easeTypeList = [
	'in',
	'out',
	'inOut'
];
const divideTypeList = [
	'soft',
	'solid'
];

const RedTemplateLayer = () => {
	// const {actions: gradientActions} = useContext(ContextGradient)
	const {actions: windowActions} = useContext(ContextWindows)
	const [state, setState] = useState({
		rangeNum: 5,
		easeName: 'none',
		divideType: 'soft',
		easeType: 'out',
		tempColorList: [],
		colorPicker: [],
		openColorPicker: [],

		type: ConstGradientType.LINEAR,
		startEndColor: new DataRedGradientStepInfo({startColorHint: 'yellow', endColorHint: 'red'}),
		repeatRangeSize: 50,
	})
	const HD_close = () => {
		windowActions.removeLastWindow()
	}

	const calcGradient = (colorList) => {
		let gradients
		if (colorList.length > 1) {
		} else {
			const v = colorList[0]
			if (v) v['mode'] = state.divideType === divideTypeList[0] ? ConstGradientStepMode.SINGLE : ConstGradientStepMode.RANGE
		}
		const data = new DataRedGradientLayer()
		data.timeline[0].stepInfoList = colorList
		data.timeline[0].valueInfo.endingShape = ConstEndingShape.CIRCLE
		data.type = state.type
		gradients = calcLayerGradient(data)
		console.log(gradients)
		return gradients;
	};
	const repeatYn = state.type.indexOf('repeating') > -1
	const renderRange = () => {
		const tempColorList = state.tempColorList
		let rangeList = new Array(state.rangeNum);
		rangeList.fill(1);
		return rangeList.map((v, index) => {
			const maxRange = repeatYn ? state.repeatRangeSize : 100
			const len = rangeList.length
			let ease = state.easeName === 'none' ? 'none' : `${state.easeName}.${state.easeType}`;
			let tS = {value: 0};
			let tE = {value: 0};
			let tSTween = gsap.to(tS, {value: maxRange, duration: 1, ease: ease});
			tSTween.pause();
			tSTween.seek(index / len);
			let tETween = gsap.to(tS, {value: maxRange, duration: 1, ease: ease});
			tETween.pause();
			tETween.seek((index + 1) / len);
			// console.log(tSTween)
			tS = tSTween['ratio'] * maxRange;
			tE = tETween['ratio'] * maxRange;
			let tColor
			if (!tempColorList[index]) {
				tColor = gsap.utils.interpolate(state.startEndColor['start']['colorHint'], state.startEndColor['end']['colorHint'], index / len)
				tempColorList[index] = (new DataRedGradientStepInfo({
					startColorHint: tColor,
					endColorHint: tColor,
					startStop: tS,
					endStop: tE
				}));
				tempColorList[index]['start']['stop'] = tS;
				tempColorList[index]['end']['stop'] = tE;
			}
			// tempColorList[index]['start']['colorHint'] = tColor
			tempColorList[index]['end']['colorHint'] = tempColorList[index]['start']['colorHint']
			tempColorList[index]['end']['stop'] = tempColorList[index + 1] ? tempColorList[index + 1]['start']['stop'] : maxRange;
			// console.log(tempColorList[index])
			const tColorData = tempColorList[index];
			return <div
				className={'RedTemplateLayer_Container_colors_item'}
				style={{
					position: 'relative',
					padding: '5px',
					// background: (index + Math.floor(index / 10)) % 2 ? 'rgba(0,0,0,0.25)' : '',
					// borderLeft: index ? '1px solid #777' : 0,
					width: `${100 / len}%`,
					minWidth: '19.7%'
				}}
			>
				<div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
					<RedColorPickerButton
						getColorFunction={() => tColorData['start']['colorHint']}
						updateFunction={(v) => {
							tColorData['start']['colorHint'] = v['value']
							// tColorData['end']['colorHint'] = v['value']
							setState(prev => ({...prev}))
						}}
					/>
					<RedNumberField
						width={'100%'}
						min={0}
						max={tempColorList[index + 1] ? tempColorList[index + 1]['start']['stop'] : 100}
						value={tempColorList[index]['start']['stop']}
						onInput={(value) => {
							tempColorList[index]['start']['stop'] = value;
							tempColorList[index]['end']['stop'] = value;
							setState(prev => ({...prev}))
						}}
					/>
					<div style={{margin: '0px 2px 0px 2px'}}>%</div>
				</div>
				<div style={{display: 'flex', gap: '5px', alignItems: 'center', marginTop: '5px'}}>
					<div style={{color: '#777'}}>{tColorData['start']['colorHint']}</div>
				</div>
			</div>;
		})
	}
	let range = renderRange()
	range = renderRange()
	const gradient = calcGradient(state.tempColorList)
	console.log(state.tempColorList)
	return (
		<div className={'RedTemplateLayer_Container'}>
			<div>
				<RedPanelTitle label={'RedTemplateLayer'} useOnOff={false} openYn={true}/>
				<div className={'RedTemplateLayer_Container_close'} onClick={HD_close}>닫기</div>
			</div>
			<div className={'RedTemplateLayer_Container_setting'}>
				<div className={'RedTemplateLayer_Container_setting_item'}>
					rangeNum
					<RedNumberField
						step={1}
						dragStep={1}
						min={2}
						max={450}
						value={state.rangeNum}
						width={'50px'}
						onInput={(value) => {
							setState(prev => ({...prev, rangeNum: value, tempColorList: []}))
						}}
					/>
				</div>
				<div className={'RedTemplateLayer_Container_setting_item'}>
					divideType
					<RedSelect
						flexGrow={1}
						optionData={divideTypeList}
						value={state.divideType}
						onChange={(e) => {
							setState(prev => ({...prev, divideType: e.target.value}))
						}}
					/>
				</div>
				<div className={'RedTemplateLayer_Container_setting_item'}>
					ease
					<RedSelect
						flexGrow={1}
						optionData={easeNameList}
						value={state.easeName}
						onChange={(e) => {
							setState(prev => ({...prev, easeName: e.target.value, tempColorList: []}))
						}}
					/>
				</div>
				{
					state.easeName !== easeNameList[0] && <div className={'RedTemplateLayer_Container_setting_item'}>
						easeType
						<RedSelect
							flexGrow={1}
							optionData={easeTypeList}
							value={state.easeType}
							onChange={(e) => {
								setState(prev => ({...prev, easeType: e.target.value, tempColorList: []}))
							}}
						/>
					</div>
				}
				<div className={'RedTemplateLayer_Container_setting_item'}>
					gradientType
					<RedSelect
						flexGrow={1}
						// optionData={{
						// 	LINEAR: ConstGradientType.LINEAR,
						// 	RADIAL: ConstGradientType.RADIAL,
						// 	CONIC: ConstGradientType.CONIC
						// }}
						optionData={ConstGradientType}
						value={state.type}
						onChange={(e) => {
							setState(prev => ({...prev, type: e.target.value, tempColorList: []}))
						}}
					/>
				</div>
				{
					repeatYn && <>
						<div className={'RedTemplateLayer_Container_setting_item'}>
							repeatRangeSize
							<RedNumberField
								step={1}
								dragStep={1}
								min={1}
								max={100}
								value={state.repeatRangeSize}
								width={'50px'}
								onInput={(value) => {
									setState(prev => ({...prev, repeatRangeSize: value, tempColorList: []}))
								}}
							/>
						</div>

					</>
				}
				<div className={'RedTemplateLayer_Container_setting_item'}>
					startColor
					<RedColorPickerButton
						getColorFunction={() => state.startEndColor['start']['colorHint']}
						updateFunction={(v) => {
							state.startEndColor['start']['colorHint'] = v['value']
							// console.log(v)
							setState(prev => ({...prev, tempColorList: []}))
						}}
					/>
				</div>
				<div className={'RedTemplateLayer_Container_setting_item'}>
					endColor
					<RedColorPickerButton
						getColorFunction={() => state.startEndColor['end']['colorHint']}
						updateFunction={(v) => {
							state.startEndColor['end']['colorHint'] = v['value']
							// console.log(v)
							setState(prev => ({...prev, tempColorList: []}))
						}}
					/>
				</div>
			</div>
			<div className={'RedTemplateLayer_Container_middle'}>
				<div className={'RedTemplateLayer_Container_preview'}
						 key={state.tempColorList.length}
						 style={{
							 background: gradient
						 }}
				>
					preview
				</div>
				<div className={'RedTemplateLayer_Container_colorsRoot'}>
					<div className={'RedTemplateLayer_Container_colors'}>
						{range}
					</div>
				</div>
			</div>
			<div className={'RedTemplateLayer_Container_bottom'}>
				TODO - 닫기 / TODO - 적용
			</div>
		</div>
	)
}
export default RedTemplateLayer