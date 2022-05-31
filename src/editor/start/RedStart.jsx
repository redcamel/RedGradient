import {useContext} from "react";
import ContextProjectInfo from "../contexts/static/ContextProjectInfo.js";
import ContextGradient from "../contexts/system/ContextGradient.js";
import openFile from "../openFile.js";
import './RedStart.css';
import ContextWindows from "../contexts/window/ContextWindows.js";
import RedWindow from "../basicUI/window/RedWindow.jsx";
import RedNewDocument from "./newDocument/RedNewDocument.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faFile} from "@fortawesome/free-solid-svg-icons";

/**
 * 시작화면
 * @returns {JSX.Element}
 * @constructor
 */
const RedStart = () => {
	const projectInfo = useContext(ContextProjectInfo)
	const {actions: gradientActions} = useContext(ContextGradient)
	const {actions: windowActions} = useContext(ContextWindows)
	const HD_newProject = () => {
		windowActions.addWindow({
			contents: <RedWindow><RedNewDocument/></RedWindow>
		})
	}
	const HD_open = () => {
		openFile(gradientActions)
	}
	return (
		<div className={'RedStart_Container'}>
			<div className={'RedStart_Box'}>
				<img className={'RedStart_Logo'} src={'./tempLogo.svg'} alt={''}/>
				<div>
					<div className={'RedStart_ProjectName'}>{projectInfo['projectName']}</div>
					<div className={'RedStart_ProjectVersion'}>Version {projectInfo['version']}</div>
					<div className={'RedStart_NewProject'} onClick={HD_newProject}><FontAwesomeIcon icon={faFile}/>Start New
						Project
					</div>
					<div className={'RedStart_LoadProject'} onClick={HD_open}><FontAwesomeIcon icon={faDownload}/>Load Project
					</div>
					<div className={'RedStart_Copyright'}>
						<a
							rel="noreferrer"
							className={'RedStart_CopyrightTagA'}
							href={projectInfo['github']}
							target={'_blank'}
						>
							GitHub : {projectInfo['github']}
						</a>
						<a
							rel="noreferrer"
							className={'RedStart_CopyrightTagA2'}
							href={projectInfo['authorGithub']}
							target={'_blank'}
						>
							This project is maintained by {projectInfo['author']}
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
export default RedStart
