import {useContext} from "react";
import './RedFrameStatus.css'
import ContextProjectInfo from "../contexts/static/ContextProjectInfo";

/**
 * 하단 상태바 프레임
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameStatus = () => {
	const projectInfo = useContext(ContextProjectInfo)
	return (
		<div className={'RedFrameStatus_container'}>
			<a
				rel="noreferrer"
				className={'RedFrameStatus_tagA'}
				href={projectInfo['github']}
				target={'_blank'}
			>
				Project GitHub : {projectInfo['github']}
			</a>
			<a
				rel="noreferrer"
				className={'RedFrameStatus_tagA'}
				href={projectInfo['authorGithub']}
				target={'_blank'}
			>
				This project is maintained by {projectInfo['author']}
			</a>
		</div>
	)
}
export default RedFrameStatus
