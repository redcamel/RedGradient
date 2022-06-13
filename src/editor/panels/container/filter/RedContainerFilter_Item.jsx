import './RedContainerFilter.css'
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA.js";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react"
import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import {faArrowDown, faArrowUp, faCopy, faEye, faEyeSlash, faTrash} from "@fortawesome/free-solid-svg-icons";
import RedToolTipIcon from "../../../basicUI/icon/RedToolTipIcon.jsx";
import ConstFilterType from "../../../../data/const/ConstFilterType.js";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import RedContainerFilter_AmountFilter from "./blur/RedContainerFilter_AmountFilter.jsx";
import RedContainerFilter_DropShadowFilter from "./blur/RedContainerFilter_DropShadowFilter.jsx";

/**
 * RedContainerFilter_Item
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerFilter_Item = ({data, filterIDX}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const targetView = HELPER_GET_DATA.getActiveViewInfo(state)
	const {viewKey, containerInfo} = targetView
	const {type, visibleYn} = data
	const {filterInfo} = containerInfo
	const filterNum = filterInfo.length
	const prevSwapAble = filterIDX > 0
	const nextSwapAble = filterIDX < filterNum - 1
	const HD_swapFilter = (e, targetIndex, destinationIndex) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.swapFilter({
			target_filterIndex: targetIndex,
			destination_filterIndex: destinationIndex
		})
	}
	const HD_duplicateFilter = (e) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.duplicateFilter({
			target_filterIndex: filterIDX
		})
	}
	const HD_removeFilter = (e) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.removeFilter({
			target_filterIndex: filterIDX
		})
	}
	const HD_changeFilter = (e) => {
		gradientActions.changeFilterType({
			type: e.target.value,
			target_filterIndex: filterIDX
		})
	}
	const HD_setFilterVisible = () => {
		gradientActions.setFilterVisible({
			target_filterIndex: filterIDX,
			value: !visibleYn
		})
	}
	const renderFilter = () => {
		let TargetClass = null
		let valueKey = 'amount'
		let step, min, max, updateMethodName, dragStep, toFixed
		switch (type) {
			case ConstFilterType.BLUR :
				TargetClass = RedContainerFilter_AmountFilter
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.BRIGHTNESS :
				TargetClass = RedContainerFilter_AmountFilter
				step = 0.01
				min = 0
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.CONTRAST :
				TargetClass = RedContainerFilter_AmountFilter
				min = 0
				max = 5
				step = 0.01
				dragStep = 0.002
				toFixed = 3
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.DROP_SHADOW :
				TargetClass = RedContainerFilter_DropShadowFilter
				min = 0
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.GRAYSCALE :
				TargetClass = RedContainerFilter_AmountFilter
				min = 0
				max = 1
				step = 0.01
				dragStep = 0.002
				toFixed = 3
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.HUE_ROTATE :
				TargetClass = RedContainerFilter_AmountFilter
				min = 0
				max = 360
				valueKey = 'deg'
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.INVERT :
				TargetClass = RedContainerFilter_AmountFilter
				min = 0
				max = 1
				step = 0.01
				dragStep = 0.002
				toFixed = 3
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.OPACITY :
				TargetClass = RedContainerFilter_AmountFilter
				min = 0
				max = 1
				step = 0.01
				dragStep = 0.002
				toFixed = 3
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.SATURATE :
				TargetClass = RedContainerFilter_AmountFilter
				min = 0
				step = 0.01
				dragStep = 0.002
				toFixed = 3
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			case ConstFilterType.SEPIA :
				TargetClass = RedContainerFilter_AmountFilter
				min = 0
				max = 1
				step = 0.01
				dragStep = 0.002
				toFixed = 3
				updateMethodName = 'updateContainerFilterSettingByKey'
				break
			default :
				break
		}
		return TargetClass ? <TargetClass
			data={data}
			viewKey={viewKey}
			idx={filterIDX}
			min={min}
			max={max}
			step={step}
			dragStep={dragStep}
			toFixed={toFixed}
			updateMethodName={updateMethodName}
			valueKey={valueKey}
		/> : null
	}
	return (
		<div className={'RedContainerFilter_item_container'} style={{opacity: visibleYn ? 1 : 0.25}}>
			<RedItemTitle label={<div className={'RedContainerFilter_item_title'}>
				<div className={'RedContainerFilter_item_title_box'}>
					<RedToolTipIcon
						icon={visibleYn ? faEye : faEyeSlash}
						activeYn={visibleYn}

						toolTip={'Remove Filter'}
						onClick={HD_setFilterVisible}
					/>
					{prevSwapAble && <RedToolTipIcon icon={faArrowUp}
																					 toolTip={'Move Up'}
																					 onClick={(e) => HD_swapFilter(e, filterIDX, filterIDX - 1)}
					/>}
					{nextSwapAble && <RedToolTipIcon icon={faArrowDown}
																					 toolTip={'Move Down'}
																					 onClick={(e) => HD_swapFilter(e, filterIDX, filterIDX + 1)}
					/>}

				</div>
				<RedSelect
					flexGrow={1}
					optionData={ConstFilterType}
					value={type}
					onChange={HD_changeFilter}
				/>
				<div className={'RedContainerFilter_item_title_box'}>
					<RedToolTipIcon icon={faTrash} toolTip={'Remove Filter'} onClick={HD_removeFilter}/>
					<RedToolTipIcon icon={faCopy} toolTip={'Duplicate Filter'} onClick={HD_duplicateFilter}/>
				</div>
			</div>}/>
			{renderFilter()}
		</div>
	)
}
export default RedContainerFilter_Item