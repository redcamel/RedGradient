import RedPresetItem from "./RedPresetItem";
import {useEffect, useState} from "react";
import ConstGradientType from "../../../../data/const/ConstGradientType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import DataRedGradientLayer from "../../../../data/DataRedGradientLayer";


const RedPreset = () => {
	const [activeIdx, setActiveIdx] = useState(0);
	const [activeMenuIdx, setActiveMenuIdx] = useState(0);
	const testData = {
		"label": "Layer0",
		"visibleYn": true,
		"previewBackgroundType": "transparent",
		"type": "repeating-radial",
		"repeatType": "no-repeat",
		"blendMode": "normal",
		"timeline": {
			"0": {
				"positionInfo": {
					"x": 0.83333333333333,
					"y": 0,
					"xUnit": "px",
					"yUnit": "px"
				},
				"sizeInfo": {
					"width": 67.46957637997431,
					"height": 68.54942233632863,
					"widthUnit": "%",
					"heightUnit": "%",
					"useFixedRatio": false
				},
				"stepInfoList": [
					{
						"label": "step0",
						"mode": "single",
						"start": {
							"stop": 0,
							"stopUnit": "%",
							"colorHint": "rgb(255,0,0)",
							"divideYn": false
						},
						"end": {
							"stop": 0,
							"stopUnit": "%",
							"colorHint": "black",
							"divideYn": false
						}
					},
					{
						"label": "step1",
						"mode": "single",
						"start": {
							"stop": 15.243902439024396,
							"stopUnit": "%",
							"colorHint": "transparent",
							"divideYn": false
						},
						"end": {
							"stop": 0,
							"stopUnit": "%",
							"colorHint": "black",
							"divideYn": false
						}
					}
				],
				"valueInfo": {
					"offsetInfo": {
						"value": 0,
						"unit": "%"
					},
					"angle": 180,
					"atInfo": {
						"x": 100,
						"y": 100,
						"xUnit": "%",
						"yUnit": "%"
					},
					"endingShape": "ellipse",
					"sizeType": "farthest-corner"
				}
			}
		}
	}

	const makePresetDataList = (dataList) => {
		const tList = [
			{
				label: 'All',
				list: dataList
			},
			{
				label: ConstGradientType.LINEAR,
				list: []
			},
			{
				label: ConstGradientType.RADIAL,
				list: []
			},
			{
				label: ConstGradientType.CONIC,
				list: []
			}
		]
		dataList.forEach(v => {
			switch (v['type']) {
				case ConstGradientType.LINEAR:
				case ConstGradientType.REPEATING_LINEAR:
					tList[1]['list'].push(v)
					break;
				case ConstGradientType.RADIAL:
				case ConstGradientType.REPEATING_RADIAL:
					tList[2]['list'].push(v)
					break;
				case ConstGradientType.CONIC:
				case ConstGradientType.REPEATING_CONIC:
					tList[3]['list'].push(v)
					break;
				default :
					break
			}
		})
		return tList
	}
	const systemGradientDataList = [
		testData,
	];
	const [systemPresetList] = useState(makePresetDataList(systemGradientDataList))
	const [userPresetList, setUserPresetList] = useState(makePresetDataList([]))
	useEffect(() => {
		const HD_addUserPreset = (e) => {
			const data = e?.detail
			const localList = JSON.parse(localStorage.getItem('userGradientDataList') || "[]")
			if (data) {
				localList.push(JSON.parse(JSON.stringify(data)))
				localStorage.setItem('userGradientDataList', JSON.stringify(localList))
			}
			const newUserPresetList = makePresetDataList(localList);
			setUserPresetList(newUserPresetList)
		}
		const HD_removeUserPreset = (e) => {
			const index = e?.detail
			const localList = JSON.parse(localStorage.getItem('userGradientDataList') || "[]")
			localList.splice(index, 1)
			localStorage.setItem('userGradientDataList', JSON.stringify(localList))
			const newUserPresetList = makePresetDataList(localList);
			setUserPresetList(newUserPresetList)
		}
		HD_addUserPreset()
		window.addEventListener('addUserPreset', HD_addUserPreset)
		window.addEventListener('removeUserPreset', HD_removeUserPreset)
		return () => {
			window.removeEventListener('addUserPreset', HD_addUserPreset)
			window.removeEventListener('removeUserPreset', HD_removeUserPreset)
		}
	}, [])
	const renderMenu = () => {
		const menuList = [
			{
				label: 'view',
				icon: <FontAwesomeIcon icon={faEdit}/>
			},
			{
				label: 'del',
				icon: <FontAwesomeIcon icon={faEdit}/>
			},
			{
				label: 'export',
				icon: <FontAwesomeIcon icon={faEdit}/>
			},
			{
				label: 'import',
				icon: <FontAwesomeIcon icon={faEdit}/>
			}
		]
		return <div style={{
			position: 'absolute',
			top: 0,
			right: 0,
			height: '100%',
			display: 'flex', gap: '1px', background: '#000', border: '1px solid #111'
		}}>
			{
				menuList.map((v, index) => {
					const activeYn = activeMenuIdx === index
					return <div
						key={index}
						onClick={() => {
							switch (index) {
								case 0 :
								case 1 :
									setActiveMenuIdx(index)
									break
								case 2 :
									const a = document.createElement('a');
									const file = new Blob([JSON.stringify(userPresetList[0]['list'])], {type: 'application/json'});
									a.href = URL.createObjectURL(file);
									a.download = `RedGradientUserPreset.preset.json`;
									a.click();
									URL.revokeObjectURL(a.href);
									break
								case 3 : {
									const a = document.createElement('input');
									a.setAttribute('accept', '.json');
									a.setAttribute('type', 'file');
									a.click();
									a.onchange = e => {
										let fileReader = new FileReader();
										fileReader.onload = evt => {
											const newData = evt.target.result

											const checkValidate = (checkData) => {
												let pass;
												try {
													checkData = JSON.parse(checkData)
													pass = checkData instanceof Array
												} catch (e) {
													pass = false
												}
												// TODO checkValidate
												if (pass) {
													const t0 = new DataRedGradientLayer()
													checkData.forEach(data => {

														for (const k in t0) {

															if (!data.hasOwnProperty(k)) {
																pass = false
																break
															}
														}
													})
												}

												return pass
											}
											if (checkValidate(newData)) {
												localStorage.setItem('userGradientDataList', newData);
												const newUserPresetList = makePresetDataList(JSON.parse(newData));
												setUserPresetList(newUserPresetList)

											} else {
												alert('RedGradient Preset 형식의 파일이 아닙니다.');
											}

										};
										fileReader.readAsText(e.target.files[0]);
									};
									break
								}
								default :
									break
							}
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '4px',
							padding: '5px 10px',
							height: '100%',
							background: activeYn ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : '#222',
							cursor: 'pointer'
						}}>
						{v['icon']} {v['label']}
					</div>
				})
			}
		</div>
	}

	return <div style={{
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%'
	}}>
		<div style={{
			position: "sticky",
			zIndex: 1,
			display: 'flex',
			alignItems: 'center',
			gap: '1px',
			background: 'linear-gradient(#3c3c3c, #242424)',
			borderTop: '1px solid #525252',
			borderBottom: '1px solid #101010',
			overflow: 'hidden',
			height: '36px',
			minHeight: '36px',
			// borderRadius: '0 4px 0 0'
		}}>
			<div style={{padding: '0 10px'}}>Gradient Layer Preset</div>
			<div style={{
				overflow: 'hidden',
				borderRadius: '4px',
				display: 'flex',
				alignItems: 'center',
				background: '#111',
				border: '1px solid #111',
				gap: '1px'
			}}>
				{
					systemPresetList.map((v, index) => {
						const activeYn = activeIdx === index
						return <div
							key={index}
							style={{...style, background: activeYn ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : '#222'}}
							onClick={() => setActiveIdx(index)}
						>{v['label']}</div>
					})
				}
			</div>
		</div>
		<div style={stylePresetContainer}>
			<div style={stylePresetTypeContainer}>
				<div style={styleTitle}>System Preset</div>
				<div>{
					<div
						style={styleListBox}>
						{
							systemPresetList[activeIdx]['list'].map((v, index) => <RedPresetItem data={v} key={index}/>)
						}
					</div>
				}
				</div>
			</div>
			<div style={stylePresetTypeContainer}>
				<div style={styleTitle}>User Preset
					{renderMenu()}
				</div>
				<div>
					<div
						style={styleListBox}>
						{
							userPresetList[activeIdx]['list'].length
								? userPresetList[activeIdx]['list'].map((v, index) => <RedPresetItem
									key={index}
									data={v}
									deleteMode={activeMenuIdx === 1}
									idx={index}/>)
								: <div style={{textAlign: 'center', color: '#666'}}>User preset does not exist.</div>
						}
					</div>
				</div>
			</div>
		</div>
	</div>
}
export default RedPreset

const style = {
	height: '24px',
	display: 'flex',
	alignItems: 'center',
	padding: '0 10px',
	background: '#222',
	cursor: 'pointer'
}
const styleListBox = {
	wordBreak: 'break-all', whiteSpace: 'normal',
	// justifyContent: 'space-between',
	display: 'flex',
	flexWrap: 'wrap',
	overflowY: 'auto',
	padding: '5px',
	margin: '5px',
	gap: '5px'
}
const stylePresetContainer = {
	display: 'flex',
	alignItems: 'flex-start',
	flexGrow: 1,
	overflow: 'hidden',
	gap: '1px', background: '#111'
}
const stylePresetTypeContainer = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	flexGrow: 1,
	width: '50%',
	height: '100%',
	overflowY: 'auto'
}
const styleTitle = {
	padding: '10px',
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	position: 'sticky',
	background: '#2d2d2d',
	color: '#888',
	zIndex: 1,
	borderBottom: '1px solid #222',
	boxShadow: '0 10px 10px rgba(0,0,0,0.1)',
	top: 0
}