import {useContext, useEffect, useState} from "react";
import {faFileAlt, faFolderOpen, faHistory, faRedo, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import ContextGradient from "../contexts/system/ContextGradient.js";
import RedTextField from "../basicUI/RedTextField.jsx"
import saveFile from "../saveFile.js";
import openFile from "../openFile.js";
import './RedFrameTop.css'
import RedToolTipIcon from "../basicUI/icon/RedToolTipIcon.jsx";
import ContextWindows from "../contexts/window/ContextWindows.js";
import RedWindow from "../basicUI/window/RedWindow.jsx";
import RedNewDocument from "../start/newDocument/RedNewDocument.jsx";
import RedHistory from "../panels/history/RedHistory";
import RedPublish from "../panels/publish/RedPublish";

/**
 * 상단프레임
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameTop = () => {
	const {state: gradientContext, actions} = useContext(ContextGradient)
	const {actions: windowActions} = useContext(ContextWindows)
	const HD_newProject = () => {
		windowActions.addWindow({
			contents: <RedWindow><RedNewDocument/></RedWindow>,
			backgroundColor: 'rgba(0,0,0, 0.5)'
		})
	}
	const HD_changeProjectName = (value, saveHistoryYn) => {
		actions.setProjectName({
			value,
			saveHistoryYn
		})
	}
	const [openHistoryYn, setOpenHistoryYn] = useState(false)
	const HD_save = () => saveFile(gradientContext)
	const HD_open = () => openFile(actions)
	useEffect(() => {
		const HD_keyUp = e => {
			if (e.keyCode === 120) setOpenHistoryYn(!openHistoryYn)
		}
		document.addEventListener('keyup', HD_keyUp);
		return () => {
			document.removeEventListener('keyup', HD_keyUp);
		}
	}, [openHistoryYn])
	return (
		<div className={'RedFrameTop_container'}>
			<div className={'RedFrameTop_logoBox'}>
				<img alt={'logo'} className={'RedFrameTop_logo'} src={'./tempLogo.svg'}/>
				<RedTextField
					value={gradientContext['projectName']}
					onInput={HD_changeProjectName}
					onKeyDown={HD_changeProjectName}
					onBlur={HD_changeProjectName}
				/>
				<div className={'RedFrameTop_menuBox'}>
					<RedToolTipIcon icon={faFileAlt} toolTip={'new project'} shortcut={'Alt + N'} onClick={HD_newProject}/>
					<RedToolTipIcon icon={faFolderOpen} toolTip={'open'} shortcut={'Ctr + O'} onClick={HD_open}/>
					<RedToolTipIcon icon={faSave} toolTip={'save'} shortcut={'Ctr + S'} onClick={HD_save}/>
					<RedToolTipIcon icon={faUndo} toolTip={'undo'} shortcut={'Ctr + Z'} onClick={actions.undo}
						// activeYn={history.length}
					/>
					<RedToolTipIcon icon={faRedo} toolTip={'redo'} shortcut={'Ctr + shift + Z'} onClick={actions.redo}
						// activeYn={historyRedo.length}
					/>
				</div>
				<RedPublish/>
				<a className={'RedFrameTop_help_button'} href={'https://redcamel.github.io/RedGradientDoc/docs/intro'} target={'_blank'}>Help</a>
			</div>
			<div className={`RedFrameTop_history_container ${openHistoryYn ? 'active' : ''}`}>
				<div className={'RedFrameTop_history_button'}>
					<RedToolTipIcon icon={faHistory} toolTip={'History'} shortcut={'F9'} align={'right'}
													onClick={() => setOpenHistoryYn(!openHistoryYn)}
					/>
				</div>
				<RedHistory/>
			</div>
		</div>
	)
}
export default RedFrameTop
