import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedNumberField from "../../../basicUI/RedNumberField.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExpand, faLink, faLinkSlash} from "@fortawesome/free-solid-svg-icons";

/**
 * RedGradientOffset
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientSize = ({sizeInfo, onChange, onChanges, containerSizeInfo_raw}) => {
	const {useFixedRatio} = sizeInfo
	const HD_FitSize = () => {
		const pxWidth = sizeInfo['widthUnit'] === ConstUnitPxPercent.PERCENT ? 100 : containerSizeInfo_raw.width
		const pxHeight = sizeInfo['heightUnit'] === ConstUnitPxPercent.PERCENT ? 100 : containerSizeInfo_raw.height
		const updateList = [
			{targetInfoKey: 'sizeInfo', key: 'width', value: pxWidth},
			{targetInfoKey: 'sizeInfo', key: 'height', value: pxHeight}
		]
		updateList.saveHistoryYn = true

		onChanges(updateList,'Layer Fit To Container')
	}
	return (
		<div>
			<RedItemTitle label={'Background Size'}/>
			<div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
				<div style={{...style.link, opacity: useFixedRatio ? 1 : 0.25, transition: 'opacity 0.2s'}}
						 onClick={() => onChange('sizeInfo', 'useFixedRatio', !useFixedRatio, true)}>
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
				</div>
				<div>
					<div className={'RedGradientEditor_container_sizeBox'}>
						<RedNumberField value={sizeInfo['width']} width={'100%'} flexGrow={1} min={0}
														onInput={(value, saveHistoryYn) => onChange('sizeInfo', 'width', value, saveHistoryYn)}
														onKeyDown={(value, saveHistoryYn) => onChange('sizeInfo', 'width', value, saveHistoryYn)}
														onBlur={(value, saveHistoryYn) => onChange('sizeInfo', 'width', value, saveHistoryYn)}
						/>
						<RedSelect
							optionData={ConstUnitPxPercent}
							value={sizeInfo['widthUnit']}
							onChange={e => onChange('sizeInfo', 'widthUnit', e.target.value, true)}
						/>
					</div>
					<div className={'RedGradientEditor_container_sizeBox'} style={{marginTop: '4px'}}>
						<RedNumberField value={sizeInfo['height']} width={'100%'} flexGrow={1} min={0}
														onInput={(value, saveHistoryYn) => onChange('sizeInfo', 'height', value, saveHistoryYn)}
														onKeyDown={(value, saveHistoryYn) => onChange('sizeInfo', 'height', value, saveHistoryYn)}
														onBlur={(value, saveHistoryYn) => onChange('sizeInfo', 'height', value, saveHistoryYn)}
						/>
						<RedSelect
							optionData={ConstUnitPxPercent}
							value={sizeInfo['heightUnit']}
							onChange={e => onChange('sizeInfo', 'heightUnit', e.target.value, true)}
						/>
					</div>
				</div>
			</div>
			<div className={'RedGradientPosition_itemMirror'} style={{padding: '6px', marginTop: '4px'}}
					 onClick={HD_FitSize}
			><FontAwesomeIcon icon={faExpand}/>Fit To Container
			</div>
		</div>
	)
}
export default RedGradientSize
const style = {
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
	}
}
