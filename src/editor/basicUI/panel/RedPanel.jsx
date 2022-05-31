import './RedPanel.css'
import RedPanelTitle from "./RedPanelTitle.jsx";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 *
 * @param titleLabel
 * @param tabFlexGrow
 * @param tabInfo
 * @param initActiveYn
 * @param useOnOff
 * @returns {JSX.Element}
 * @constructor
 */
const RedPanel = ({titleLabel, tabFlexGrow, tabInfo = [], initActiveYn = false, useOnOff = true}) => {
	initActiveYn = useOnOff ? initActiveYn : true
	const [activeIDX, setActiveIDX] = useState(0)
	const [openYn, setOpenYn] = useState(initActiveYn)
	tabInfo = tabInfo instanceof Array ? tabInfo : [tabInfo]
	const activeData = tabInfo[activeIDX]
	return <div className={'RedPanel'}>
		<div style={{position: 'sticky', top: 0, zIndex: 1}} onClick={() => useOnOff ? setOpenYn(!openYn) : 0}>
			<RedPanelTitle label={titleLabel} useOnOff={useOnOff} openYn={openYn}/>
		</div>
		<div className={`RedPanel_Tab_Container ${openYn && tabInfo && tabInfo.length > 1 ? 'active' : ''}`}>
			{
				tabInfo.map((v, index) => {
					const activeYn = index === activeIDX
					return <div
						key={index}
						onClick={() => setActiveIDX(index)}
						className={`RedPanel_Tab_item ${activeYn ? 'active' : ''}`}
						style={{flexGrow: tabFlexGrow}}
					>
						{v['icon'] && <FontAwesomeIcon icon={v['icon']}/>} {v['label']}
					</div>
				})
			}
		</div>
		{openYn ? <div className={'RedPanel_Contents'}>{activeData?.contents}</div> : ''}
	</div>
}
export default RedPanel
