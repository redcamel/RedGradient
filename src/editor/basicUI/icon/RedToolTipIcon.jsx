import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './RedToolTipIcon.css'

/**
 *
 * @param icon
 * @param onClick
 * @param activeYn
 * @param toolTip
 * @param shortcut
 * @param size
 * @returns {JSX.Element}
 * @constructor
 */
const RedToolTipIcon = ({icon, onClick, activeYn, toolTip, shortcut, size, align = ''}) => {
	return <div className={`RedToolTipIcon_container ${activeYn ? 'active' : ''}`} onClick={onClick}>
		{icon.type === 'svg' ? icon : <FontAwesomeIcon icon={icon} fixedWidth={true} size={size || '1x'}/>}
		<div className={`RedToolTipIcon_toolTip ${align}`} style={{display: toolTip ? '' : 'none'}}>{toolTip} {shortcut ?
			<div className={'RedToolTipIcon_toolTip_shortCut'}>{shortcut}</div> : ''}</div>
	</div>
}
export default RedToolTipIcon