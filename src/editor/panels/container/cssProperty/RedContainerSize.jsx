import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";
import getCalcedContainerEditorLayoutInfo_pixel from "../../../core/canvas/getCalcedContainerEditorLayoutInfo_pixel.js";
import {faLink, faLinkSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * 컨테이너 사이즈 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerSize = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {sizeInfo} = containerInfo
	const {useFixedRatio} = sizeInfo
	const HD_changeSize = (value, key, saveHistoryYn) => {
		const updateList = []
		const targetInfo = 'sizeInfo'
		if (useFixedRatio) {
			const ratio = value / sizeInfo[key]
			if (key === 'width') {
				updateList.push({
					targetInfo,
					key: 'height',
					value: sizeInfo['height'] * ratio
				})
			} else {
				updateList.push({
					targetInfo,
					key: 'width',
					value: sizeInfo['width'] * ratio,
				})
			}
		}
		updateList.push({
			targetInfo,
			key,
			value
		})
		gradientActions.updateContainerSizePosition({
			viewKey,
			value: updateList,
			saveHistoryYn
		})
	}
	const HD_changeUnit = (e, prefix) => {
		const value = e.target.value
		const sameUnitYn = sizeInfo[`${prefix}Unit`] === value
		const calced = getCalcedContainerEditorLayoutInfo_pixel(state)
		let calced_value;
		const targetCalced = calced[viewKey]
		const targetInfo = 'sizeInfo'
		if (sameUnitYn) {
			calced_value = sizeInfo[prefix]
		} else {
			if (sizeInfo[`${prefix}Unit`] === ConstUnitPxPercent.PX && value === ConstUnitPxPercent.PERCENT) {
				calced_value = sizeInfo[`${prefix}`] * 100 / targetCalced.parentSizeInfo[prefix]
			} else {
				calced_value = targetCalced.raw[prefix]
			}
		}
		gradientActions.updateContainerSizePosition({
			viewKey,
			value: [
				{
					targetInfo,
					key: `${prefix}Unit`,
					value: value
				},
				{
					targetInfo,
					key: `${prefix}`,
					value: calced_value
				}
			],
			saveHistoryYn: true
		})
	}
	const HD_setFixedRatio = () => {
		gradientActions.updateContainerUseFixedRatio({
			viewKey,
			value: !useFixedRatio,
			saveHistoryYn: true
		})
	}
	const renderItem = key => {
		return <div style={style.item}>
			<div style={style.label}>{key} :</div>
			<RedNumberField
				value={sizeInfo[key]} width={'100%'} flexGrow={1}
				min={0}
				onInput={(value, saveHistoryYn) => HD_changeSize(value, key, saveHistoryYn)}
				onKeyDown={(value, saveHistoryYn) => HD_changeSize(value, key, saveHistoryYn)}
				onBlur={(value, saveHistoryYn) => HD_changeSize(value, key, saveHistoryYn)}
				onDummySetting={(v) => gradientActions.setOtherContainerDummyRenderYn(v)}
			/>
			<RedSelect
				optionData={ConstUnitPxPercent}
				value={sizeInfo[`${key}Unit`]}
				onChange={e => HD_changeUnit(e, key)}
			/>
		</div>
	}
	const renderFixedIcon = () => {
		return <>
			<div style={{
				position: 'absolute',
				top: '-7px',
				left: '50%',
				width: '7px',
				borderBottom: '1px solid rgba(255,255,255,0.1)'
			}}/>
			<div style={{
				position: 'absolute',
				bottom: '-8px',
				left: '50%',
				width: '7px',
				borderTop: '1px solid rgba(255,255,255,0.1)'
			}}/>
			<div style={{
				position: 'absolute',
				top: '8px',
				left: '50%',
				height: '27px',
				transform: 'translate(0,-14px)',
				borderLeft: '1px solid rgba(255,255,255,0.1)'
			}}/>
			<FontAwesomeIcon icon={useFixedRatio ? faLink : faLinkSlash} style={{color: '#ff0000'}}/>
		</>
	}
	return (
		<div style={style.container}>
			<RedItemTitle label={'Size'}/>
			<div style={style.itemBox}>
				<div
					style={{...style.link, opacity: useFixedRatio ? 1 : 0.25, transition: 'opacity 0.2s'}}
					onClick={HD_setFixedRatio}>
					{renderFixedIcon()}
				</div>
				<div style={style.itemBox2}>
					{renderItem('width')}
					{renderItem('height')}
				</div>
			</div>
		</div>
	)
}
export default RedContainerSize
const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px'
	},
	itemBox: {
		display: 'flex',
		alignItems: 'center',
	},
	link: {
		display: 'flex',
		fontSize: '13px',
		padding: '1px 9px 0 11px',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		transition: 'opacity 0.2s'
	},
	itemBox2: {
		display: 'flex',
		flexDirection: 'column',
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
		minWidth: '50px'
	}
}