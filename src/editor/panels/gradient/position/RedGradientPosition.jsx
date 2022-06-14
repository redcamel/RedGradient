import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './RedGradientPosition.css'
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faDotCircle} from "@fortawesome/free-solid-svg-icons";

/**
 * RedGradientPosition
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientPosition = ({positionInfo, sizeInfo, onChange, onChanges, containerSizeInfo_raw}) => {
	const renderMirrorIcon = (vertical = false) => {
		return <svg
			style={{
				transform: vertical ? 'rotate(90deg)' : ''
			}}
			width="14" height="14" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M14.576 3.1712V1.0336C14.576 0.844798 14.6464 0.678399 14.7904 0.534399C14.9344 0.390399 15.1008 0.319998 15.2896 0.319998H16.7136C16.9024 0.319998 17.0688 0.390399 17.2128 0.534399C17.3568 0.678399 17.4272 0.844798 17.4272 1.0336V3.1712H14.576ZM1.74401 26.6912C1.55521 26.6912 1.36321 26.6528 1.17441 26.576C0.604807 26.3296 0.320007 25.8912 0.320007 25.264V6.7328C0.320007 6.1056 0.604807 5.6672 1.17441 5.4208C1.32801 5.344 1.51681 5.3056 1.74401 5.3056C2.12481 5.3056 2.44801 5.4304 2.71361 5.6768L12.6944 14.944C12.9984 15.2288 13.152 15.5808 13.152 16C13.152 16.4192 12.9984 16.7712 12.6944 17.056L2.71361 26.32C2.44801 26.5664 2.12481 26.6912 1.74401 26.6912ZM30.256 26.6912C29.8752 26.6912 29.552 26.5664 29.2864 26.32L19.3056 17.056C19.0016 16.7712 18.848 16.4192 18.848 16C18.848 15.5808 19.0016 15.2288 19.3056 14.944L29.2832 5.68C29.5488 5.4336 29.872 5.3088 30.2528 5.3088C30.48 5.3088 30.672 5.3472 30.8224 5.424C31.392 5.6704 31.6768 6.1088 31.6768 6.736V25.264C31.6768 25.8912 31.392 26.3296 30.8224 26.576C30.6336 26.6528 30.4448 26.6912 30.256 26.6912ZM14.576 8.8736V6.0224H17.4272V8.8736H14.576ZM3.17121 21.9872L9.64161 16L3.17121 10.0128V21.9872ZM14.576 14.576V11.7248H17.4272V14.576H14.576ZM14.576 20.2752V17.424H17.4272V20.2752H14.576ZM14.576 25.9776V23.1264H17.4272V25.9776H14.576ZM15.2864 31.68C15.0976 31.68 14.9312 31.6096 14.7872 31.4656C14.6432 31.3216 14.5728 31.1552 14.5728 30.9664V28.8288H17.424V30.9664C17.424 31.1552 17.3536 31.3216 17.2096 31.4656C17.0656 31.6096 16.8992 31.68 16.7104 31.68H15.2864Z"
				fill="#fff"/>
		</svg>
	}
	const HD_setPosition = (type) => {
		const {x, y, xUnit, yUnit} = positionInfo
		let calcX = x
		let calcY = y
		const {PERCENT} = ConstUnitPxPercent
		const gradientWidth = sizeInfo['widthUnit'] === PERCENT ? containerSizeInfo_raw.width * sizeInfo['width'] * 0.01 : sizeInfo['width']
		const gradientHeight = sizeInfo['heightUnit'] === PERCENT ? containerSizeInfo_raw.height * sizeInfo['height'] * 0.01 : sizeInfo['height']
		const middleX = xUnit === PERCENT ? 50 : ((containerSizeInfo_raw.width - gradientWidth) * 0.5);
		const middleY = yUnit === PERCENT ? 50 : ((containerSizeInfo_raw.height - gradientHeight) * 0.5);
		const bottomY = yUnit === PERCENT ? 100 : ((containerSizeInfo_raw.height - gradientHeight));
		const rightX = xUnit === PERCENT ? (gradientWidth / (containerSizeInfo_raw.width - gradientWidth) * 100) : (containerSizeInfo_raw.width - gradientWidth)
		const targetInfoKey = 'positionInfo'
		switch (type) {
			case 'tl' :
				onChanges(
					[
						{targetInfoKey, key: 'x', value: 0},
						{targetInfoKey, key: 'y', value: 0}
					],
					`Layer Position : Top Left`
				)
				break
			case 't' :
				calcX = middleX
				onChanges(
					[
						{targetInfoKey, key: 'x', value: calcX},
						{targetInfoKey, key: 'y', value: 0}
					],
					`Layer Position : Top`
				)
				break
			case 'tr' :
				calcX = rightX
				onChanges(
					[
						{targetInfoKey, key: 'x', value: calcX},
						{targetInfoKey, key: 'y', value: 0}
					],
					`Layer Position : Top Right`
				)
				break
			case 'ml' :
				calcY = middleY
				onChanges(
					[
						{targetInfoKey, key: 'x', value: 0},
						{targetInfoKey, key: 'y', value: calcY}
					],
					`Layer Position : Middle Left`
				)
				break
			case 'm' :
				calcX = middleX
				calcY = middleY
				onChanges(
					[
						{targetInfoKey, key: 'x', value: calcX},
						{targetInfoKey, key: 'y', value: calcY}
					],
					`Layer Position : Middle`
				)
				break
			case 'mr' :
				calcX = rightX
				calcY = middleY
				onChanges(
					[
						{targetInfoKey, key: 'x', value: calcX},
						{targetInfoKey, key: 'y', value: calcY}
					],
					`Layer Position : Middle Right`
				)
				break
			case 'bl' :
				calcY = bottomY
				onChanges(
					[
						{targetInfoKey, key: 'x', value: 0},
						{targetInfoKey, key: 'y', value: calcY}
					],
					`Layer Position : Bottom Left`
				)
				break
			case 'b' :
				calcX = middleX
				calcY = bottomY
				onChanges(
					[
						{targetInfoKey, key: 'x', value: calcX},
						{targetInfoKey, key: 'y', value: calcY}
					],
					`Layer Position : Bottom`
				)
				break
			case 'br' :
				calcX = rightX
				calcY = bottomY
				onChanges(
					[
						{targetInfoKey, key: 'x', value: calcX},
						{targetInfoKey, key: 'y', value: calcY}
					],
					`Layer Position : Bottom Right`
				)
				break
			case 'horizontal':
				if (xUnit === PERCENT) calcX = 100 - x
				else calcX = containerSizeInfo_raw.width - x - gradientWidth
				onChange(targetInfoKey, 'x', calcX, true, 'Layer Position : Mirror Horizontal')
				break
			case 'vertical':
				if (yUnit === PERCENT) calcY = 100 - y
				else calcY = containerSizeInfo_raw.height - y - gradientHeight
				onChange(targetInfoKey, 'y', calcY, true, 'Layer Position : Mirror Vertical')
				break
			default :
				break
		}
	}
	const renderItem = (key, style) => {
		return <div className={'RedGradientEditor_container_sizeBox'} style={style}>
			<RedNumberField
				value={positionInfo[key]} width={'100%'} flexGrow={1}
				onInput={(value, saveHistoryYn) => onChange('positionInfo', key, value, saveHistoryYn)}
				onKeyDown={(value, saveHistoryYn) => onChange('positionInfo', key, value, saveHistoryYn)}
				onBlur={(value, saveHistoryYn) => onChange('positionInfo', key, value, saveHistoryYn)}
			/>
			<RedSelect
				optionData={ConstUnitPxPercent}
				value={positionInfo[`${key}Unit`]}
				onChange={e => onChange('positionInfo', `${key}Unit`, e.target.value, true)}
			/>
		</div>
	}
	const renderLocationItem = (key, icon, style) => {
		return <div onClick={() => HD_setPosition(key)} className={'RedGradientPosition_item'}><FontAwesomeIcon
			icon={icon}
			style={style}/>
		</div>
	}
	return (
		<div>
			<RedItemTitle label={'Background Position'}/>
			{renderItem('x')}
			{renderItem('y', {marginTop: '4px'})}
			<div style={{display: 'flex', gap: '5px', marginTop: '5px'}}>
				<div style={{display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid #222'}}>
					<div className={'RedGradientPosition_itemBox'}>
						{renderLocationItem('tl', faArrowUp, {transform: 'rotate(-45deg)'})}
						{renderLocationItem('t', faArrowUp)}
						{renderLocationItem('tr', faArrowUp, {transform: 'rotate(45deg)'})}
					</div>
					<div className={'RedGradientPosition_itemBox'}>
						{renderLocationItem('ml', faArrowLeft)}
						{renderLocationItem('m', faDotCircle, {fontSize: '10px'})}
						{renderLocationItem('mr', faArrowRight)}
					</div>
					<div className={'RedGradientPosition_itemBox'}>
						{renderLocationItem('bl', faArrowDown, {transform: 'rotate(45deg)'})}
						{renderLocationItem('b', faArrowDown)}
						{renderLocationItem('br', faArrowDown, {transform: 'rotate(-45deg)'})}
					</div>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', gap: '2px', flexGrow: 1}}>
					<div
						onClick={() => HD_setPosition('horizontal')}
						className={'RedGradientPosition_itemMirror'}
					>
						{renderMirrorIcon()} Mirror Horizontal
					</div>
					<div
						onClick={() => HD_setPosition('vertical')}
						className={'RedGradientPosition_itemMirror'}
					>
						{renderMirrorIcon(true)} Mirror Vertical
					</div>
				</div>
			</div>
		</div>
	)
}
export default RedGradientPosition
