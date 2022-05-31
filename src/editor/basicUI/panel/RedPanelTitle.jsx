import './RedPanelTitle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";

/**
 * 패널타이틀
 * @param label
 * @param icon
 * @param useOnOff
 * @param openYn
 * @returns {JSX.Element}
 * @constructor
 */
const RedPanelTitle = ({label, icon, useOnOff, openYn}) => {
	return <div className={'RedPanelTitle'}>
		{
			useOnOff
				? <FontAwesomeIcon
					icon={faChevronUp} fixedWidth={true}
					style={{transform: openYn ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s'}}
				/>
				: ''
		} {icon ? <FontAwesomeIcon
		icon={icon}/> : ''} {label}
	</div>
}
export default RedPanelTitle
