import ContextGradient from "../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './RedHistory.css'
import {faHistory, faPen} from "@fortawesome/free-solid-svg-icons";
import RedPanelTitle from "../../basicUI/panel/RedPanelTitle.jsx";

/**
 * 히스토리 창
 * @returns {JSX.Element}
 * @constructor
 */
const RedHistory = () => {
	const {history, historyRedo, actions} = useContext(ContextGradient)
	return (
		<div className={'RedHistory_container'}>
			<RedPanelTitle label={`History ${history.length}`} icon={faHistory}/>
			<div className={'RedHistory_undoBox'}>
				{
					history.map((v, index) => {
						const activeYn = history.length === index + 1
						const icon = v['icon']
						return <div
							className={'RedHistory_item'}
							style={{opacity: activeYn ? 1 : 0.25}}
							onClick={() => actions.setTargetHistoryIndex(index)}
							key={index}
						>
							{activeYn && <FontAwesomeIcon className={'RedHistory_icon_active'} icon={faPen}/>}
							<FontAwesomeIcon className={'RedHistory_icon'} icon={icon}/>{v['label']}
							{/*- {v['data']['projectName']}*/}
							{/*{(new Date(v['updateTime'])).toLocaleTimeString()}*/}
						</div>
					})
				}
				<div
					className={'RedHistory_title'}
					style={{display: historyRedo.length ? '' : 'none', opacity: 0.9}}><FontAwesomeIcon icon={faHistory}
																																														 style={{transform: 'scale(-1,1)'}}/>historyRedo {historyRedo.length}
				</div>
				<div className={'RedHistory_redoBox'}>
					{
						historyRedo.map((v, index) => {
							const icon = v['icon']
							const targetIDX = history.length + historyRedo.length - index - 1
							return <div className={'RedHistory_item'}
													onClick={() => actions.setTargetHistoryIndex(targetIDX, true)}
													key={index}
							>
								<FontAwesomeIcon className={'RedHistory_icon'} icon={icon}/>{v['label']}
								{/*- {v['data']['projectName']}*/}
								{/*{(new Date(v['updateTime'])).toLocaleTimeString()}*/}
							</div>
						})
					}
				</div>
			</div>
		</div>
	)
}
export default RedHistory