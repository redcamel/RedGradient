import {useContext, useEffect, useState} from "react";
import './RedNewDocument.css';
import RedPanelTitle from "../../basicUI/panel/RedPanelTitle.jsx";
import RedDivision from "../../basicUI/RedDivision.jsx";
import ConstDevicePreset from "../../../data/const/ConstDevicePreset.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faLink, faLinkSlash, faMobileAlt, faPalette} from "@fortawesome/free-solid-svg-icons";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import DataRedGradient from "../../../data/DataRedGradient.js";
import DataRedSizeInfo from "../../../data/DataRedSizeInfo.js";
import ContextWindows from "../../contexts/window/ContextWindows.js";
import RedTextField from "../../basicUI/RedTextField.jsx";
import RedItemTitle from "../../basicUI/RedItemTitle.jsx";
import RedNumberField from "../../basicUI/RedNumberField.jsx";
import RedColorPickerButton from "../../basicUI/RedColorPickerButton.jsx";
import ConstLayerPreviewBackgroundType from "../../../data/const/ConstLayerPreviewBackgroundType.js";
import RedSelect from "../../basicUI/RedSelect.jsx";
import {toast} from "react-toastify";
import RedToastSkin from "../../core/RedToastSkin";

/**
 * 시작화면
 * @returns {JSX.Element}
 * @constructor
 */
const RedNewDocument = () => {
	const {actions: gradientActions} = useContext(ContextGradient)
	const {actions: windowActions} = useContext(ContextWindows)
	const [useFixedRatio, setUseFixedRatio] = useState(false)
	const [activeIDX, setActiveIDX] = useState(null)
	const [settingSizeInfo, setSettingSizeInfo] = useState(null)
	const [backgroundColor, setBackgroundColor] = useState(ConstLayerPreviewBackgroundType.TRANSPARENT)
	const [projectName, setProjectName] = useState()
	const deviceList = Object.values(ConstDevicePreset)
	const HD_setData = (index) => {
		setActiveIDX(index)
		setSettingSizeInfo(JSON.parse(JSON.stringify(deviceList[index]['sizeInfo'])))
	}
	useEffect(() => {
		HD_setData(0)
		setProjectName('Untitled Project')
	}, [])
	const activeDeviceData = deviceList[activeIDX]
	if (!activeDeviceData) return null
	const HD_newDocument = (deviceInfo) => {
		windowActions.removeLastWindow()
		deviceInfo['sizeInfo'] = settingSizeInfo
		gradientActions.loadData(
			new DataRedGradient(
				projectName,
				deviceInfo,
				new DataRedSizeInfo(settingSizeInfo['width'], settingSizeInfo['height']),
				backgroundColor
			))
		toast.dark(
			<RedToastSkin title={'New Gradient Project'} text={''}/>,
			{
				position: 'bottom-right'
			}
		);
	}
	const HD_changeSize = (value, key) => {
		if (useFixedRatio) {
			const ratio = value / settingSizeInfo[key]
			if (key === 'width') {
				settingSizeInfo['height'] = +(settingSizeInfo['height'] * ratio).toFixed(0)

			} else {
				settingSizeInfo['width'] = +(settingSizeInfo['width'] * ratio).toFixed(0)
			}
		}
		settingSizeInfo[key] = value
		setSettingSizeInfo(JSON.parse(JSON.stringify(settingSizeInfo)))
	}
	return (
		<div className={'RedNewDocument_container'}>
			<RedPanelTitle label={'New Gradient'} useOnOff={false} openYn={true}/>
			{/*<div className={'RedNewDocument_top'}>*/}
			{/*	top*/}
			{/*</div>*/}
			{/*<RedDivision margin={0}/>*/}
			<div className={'RedNewDocument_middle'}>
				<div className={'RedNewDocument_left'}>
					{deviceList.map((v, index) => {
						const activeYn = activeIDX === index
						return <div
							key={`device_${index}`}
							className={`RedNewDocument item ${activeYn ? 'active' : ''}`}
							onClick={() => {
								HD_setData(index)
							}}
						>
							{/*{`device_${index}`}*/}
							<FontAwesomeIcon
								icon={v['type'] === 'mobile' ? faMobileAlt : v['type'] === 'custom' ? faPalette : faDesktop}
								style={{fontSize: '30px'}}/>
							<div className={'RedNewDocument title'}>{v['deviceName']}</div>
							<div className={'RedNewDocument sizeInfo'}>{v['sizeInfo']['width']} x {v['sizeInfo']['height']}</div>
						</div>
					})}
				</div>
				<RedDivision margin={0} verticalYn={true}/>
				<div className={'RedNewDocument_right'}>
					<div style={{display: 'flex', gap: '5px'}}>
						<RedItemTitle label={'Project Name'}/>
						<RedTextField
							placeholder={'project name'}
							value={projectName}
							onInput={setProjectName}
						/>
					</div>
					<RedDivision/>
					<div className={'RedNewDocument_setItemBox'}>
						<RedItemTitle label={'Size Setting'}/>
						<div style={{display: 'flex', alignItems: 'center'}}>
							<div style={{...style.link, opacity: useFixedRatio ? 1 : 0.25, transition: 'opacity 0.2s'}}
									 onClick={() => setUseFixedRatio(!useFixedRatio)}>
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
								<div className={'RedNewDocument_setItemBox_item'}>
									<div style={style.label}>width :</div>
									<RedNumberField value={settingSizeInfo.width} width={'100%'} flexGrow={1}
																	step={1}
																	dragStep={1}
																	min={0}
																	onInput={(value, saveHistoryYn) => HD_changeSize(value, 'width', saveHistoryYn)}
									/>
								</div>
								<div className={'RedNewDocument_setItemBox_item'}>
									<div style={style.label}>height :</div>
									<RedNumberField value={settingSizeInfo.height} width={'100%'} flexGrow={1}
																	min={0}
																	step={1}
																	dragStep={1}
																	onInput={(value, saveHistoryYn) => HD_changeSize(value, 'height', saveHistoryYn)}
									/>

								</div>
							</div>
						</div>
					</div>
					<RedDivision/>
					<RedItemTitle label={'Background Color'}/>
					<div className={'RedNewDocument_setItemBox_item'} style={{paddingTop: '5px'}}>
						<RedSelect
							optionData={Object.assign({CUSTOM: 'custom'}, ConstLayerPreviewBackgroundType)}
							value={backgroundColor}
							onChange={e => setBackgroundColor(e.target.value)}
						/>
						<RedColorPickerButton
							getColorFunction={() => backgroundColor}
							updateFunction={v => {
								setBackgroundColor(v['value'])
							}}
						/>
						{ConstLayerPreviewBackgroundType[backgroundColor] ? '' : <div style={style.label}>{backgroundColor}</div>}
					</div>
					<RedDivision/>
					<div className={'RedNewDocument_setItemBox_item'} style={{width: '100%', display: 'flex'}}>
						<div
							className={'RedNewDocument_make_button'}
							onClick={e => HD_newDocument(activeDeviceData)}>
							생성
						</div>
						<div
							className={'RedNewDocument_make_button'}
							onClick={e => windowActions.removeLastWindow()}>
							닫기
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}
export default RedNewDocument
const style = {
	label: {
		minWidth: '38px'
	},
	link: {
		display: 'flex',
		fontSize: '13px',
		padding: '1px 9px 0 11px',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		transition: 'opacity 0.2s'
	},
}
