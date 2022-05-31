import './RedContainerFilter.css'
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA.js";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react"
import RedDivision from "../../../basicUI/RedDivision.jsx";
import RedContainerFilterItem from "./RedContainerFilter_Item.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFillDrip} from "@fortawesome/free-solid-svg-icons";

/**
 * RedContainerFilter
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerFilter = () => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const targetView = HELPER_GET_DATA.getTargetViewInfo(state)
	const {containerInfo} = targetView
	const {filterInfo} = containerInfo
	const HD_addFilter = () => {
		gradientActions.addFilter()
	}
	return (
		<div className={'RedContainerFilter_container'}>

			<div className={'RedContainerFilter_middle'}>
				{
					filterInfo.map((v, index) => {
						return <div key={index}>
							<RedContainerFilterItem data={v} filterIDX={index}/>
							<RedDivision/>
						</div>
					})
				}
				{
					filterInfo.length === 0 ? <div
						className={'RedContainerFilter_add_filter'}
						onClick={HD_addFilter}
					>
						<FontAwesomeIcon icon={faFillDrip} style={{fontSize: '16px'}}/>Add Filter
					</div> : ''
				}
				{/*{PARSER_CONTAINER_CSS.getFilterCss(filterInfo)}*/}
			</div>

		</div>
	)
}
export default RedContainerFilter