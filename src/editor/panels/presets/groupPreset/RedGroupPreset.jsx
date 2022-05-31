import RedGroupPresetItem from "./RedGroupPresetItem";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import DataRedGradientLayerGroup from "../../../../data/DataRedGradientLayerGroup";


const RedGroupPreset = () => {

	const [activeMenuIdx, setActiveMenuIdx] = useState(0);
	const testData = {
		"label": "Group8",
		"openYn": true,
		"visibleYn": true,
		"children": [
			{
				"label": "Copy_Layer8",
				"visibleYn": true,
				"previewBackgroundType": "white",
				"type": "radial",
				"repeatType": "repeat",
				"blendMode": "normal",
				"timeline": {
					"0": {
						"positionInfo": {
							"x": 0,
							"y": 0,
							"xUnit": "px",
							"yUnit": "px"
						},
						"sizeInfo": {
							"width": 128,
							"height": 128,
							"widthUnit": "px",
							"heightUnit": "px",
							"useFixedRatio": false
						},
						"stepInfoList": [
							{
								"label": "step16",
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
								"label": "step16",
								"mode": "single",
								"start": {
									"stop": 5,
									"stopUnit": "%",
									"colorHint": "rgb(97,28,28)",
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
								"label": "step17",
								"mode": "single",
								"start": {
									"stop": 5,
									"stopUnit": "px",
									"colorHint": "rgba(255,0,0,0)",
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
							"angle": 180,
							"atInfo": {
								"x": 50,
								"y": 50,
								"xUnit": "%",
								"yUnit": "%"
							},
							"endingShape": "ellipse",
							"sizeType": "farthest-corner"
						}
					}
				}
			},
			{
				"label": "Copy_Copy_Layer8",
				"visibleYn": true,
				"previewBackgroundType": "transparent",
				"type": "radial",
				"repeatType": "repeat",
				"blendMode": "multiply",
				"timeline": {
					"0": {
						"positionInfo": {
							"x": 0,
							"y": 0,
							"xUnit": "%",
							"yUnit": "%"
						},
						"sizeInfo": {
							"width": 128,
							"height": 128,
							"widthUnit": "px",
							"heightUnit": "px",
							"useFixedRatio": false
						},
						"stepInfoList": [
							{
								"label": "step16",
								"mode": "single",
								"start": {
									"stop": 5,
									"stopUnit": "%",
									"colorHint": "rgba(0,0,0,0.24)",
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
								"label": "step17",
								"mode": "single",
								"start": {
									"stop": 23.928571428571427,
									"stopUnit": "%",
									"colorHint": "rgba(255,0,0,0)",
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
							"angle": 180,
							"atInfo": {
								"x": 50,
								"y": 50,
								"xUnit": "%",
								"yUnit": "%"
							},
							"endingShape": "ellipse",
							"sizeType": "farthest-corner"
						}
					}
				}
			},
			{
				"label": "Copy_Copy_Copy_Copy_Layer8",
				"visibleYn": true,
				"previewBackgroundType": "transparent",
				"type": "repeating-linear",
				"repeatType": "repeat",
				"blendMode": "normal",
				"timeline": {
					"0": {
						"positionInfo": {
							"x": 0,
							"y": 0,
							"xUnit": "px",
							"yUnit": "px"
						},
						"sizeInfo": {
							"width": 100,
							"height": 100,
							"widthUnit": "%",
							"heightUnit": "%",
							"useFixedRatio": false
						},
						"stepInfoList": [
							{
								"label": "step16",
								"mode": "single",
								"start": {
									"stop": 25,
									"stopUnit": "%",
									"colorHint": "rgba(0,0,0,0.24)",
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
								"label": "step17",
								"mode": "single",
								"start": {
									"stop": 50,
									"stopUnit": "%",
									"colorHint": "rgba(255,0,0,0)",
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
							"angle": 135,
							"atInfo": {
								"x": 50,
								"y": 50,
								"xUnit": "%",
								"yUnit": "%"
							},
							"endingShape": "ellipse",
							"sizeType": "farthest-corner"
						}
					}
				}
			},
			{
				"label": "Copy_Copy_Copy_Layer8",
				"visibleYn": true,
				"previewBackgroundType": "transparent",
				"type": "repeating-linear",
				"repeatType": "repeat",
				"blendMode": "normal",
				"timeline": {
					"0": {
						"positionInfo": {
							"x": 0,
							"y": 0,
							"xUnit": "px",
							"yUnit": "px"
						},
						"sizeInfo": {
							"width": 100,
							"height": 100,
							"widthUnit": "%",
							"heightUnit": "%",
							"useFixedRatio": false
						},
						"stepInfoList": [
							{
								"label": "step16",
								"mode": "single",
								"start": {
									"stop": 25,
									"stopUnit": "%",
									"colorHint": "rgba(0,0,0,0.24)",
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
								"label": "step17",
								"mode": "single",
								"start": {
									"stop": 50,
									"stopUnit": "%",
									"colorHint": "rgba(255,0,0,0)",
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
							"angle": 45,
							"atInfo": {
								"x": 50,
								"y": 50,
								"xUnit": "%",
								"yUnit": "%"
							},
							"endingShape": "ellipse",
							"sizeType": "farthest-corner"
						}
					}
				}
			},
			{
				"label": "Layer8",
				"visibleYn": true,
				"previewBackgroundType": "transparent",
				"type": "linear",
				"repeatType": "repeat",
				"blendMode": "normal",
				"timeline": {
					"0": {
						"positionInfo": {
							"x": 0,
							"y": 0,
							"xUnit": "px",
							"yUnit": "px"
						},
						"sizeInfo": {
							"width": 100,
							"height": 100,
							"widthUnit": "px",
							"heightUnit": "px",
							"useFixedRatio": false
						},
						"stepInfoList": [
							{
								"label": "step16",
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
								"label": "step17",
								"mode": "single",
								"start": {
									"stop": 100,
									"stopUnit": "px",
									"colorHint": "rgb(255,0,0)",
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
							"angle": 180,
							"atInfo": {
								"x": 50,
								"y": 50,
								"xUnit": "%",
								"yUnit": "%"
							},
							"endingShape": "ellipse",
							"sizeType": "farthest-corner"
						}
					}
				}
			}
		]
	}


	const systemGradientDataList = [
		testData,
	];
	const [systemPresetList] = useState(systemGradientDataList)
	const [userGroupPresetList, setUserGroupPresetList] = useState([])
	useEffect(() => {
		const HD_addUserGroupPreset = (e) => {
			const data = e?.detail
			const localList = JSON.parse(localStorage.getItem('userGradientGroupDataList') || "[]")
			if (data) {
				localList.push(JSON.parse(JSON.stringify(data)))
				localStorage.setItem('userGradientGroupDataList', JSON.stringify(localList))
			}
			const newUserGroupPresetList = localList;
			setUserGroupPresetList(newUserGroupPresetList)
		}
		const HD_removeUserGroupPreset = (e) => {
			const index = e?.detail
			const localList = JSON.parse(localStorage.getItem('userGradientGroupDataList') || "[]")
			localList.splice(index, 1)
			localStorage.setItem('userGradientGroupDataList', JSON.stringify(localList))
			const newUserGroupPresetList = localList;
			setUserGroupPresetList(newUserGroupPresetList)
		}
		HD_addUserGroupPreset()
		window.addEventListener('addUserGroupPreset', HD_addUserGroupPreset)
		window.addEventListener('removeUserGroupPreset', HD_removeUserGroupPreset)
		return () => {
			window.removeEventListener('addUserGroupPreset', HD_addUserGroupPreset)
			window.removeEventListener('removeUserGroupPreset', HD_removeUserGroupPreset)
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
									const file = new Blob([JSON.stringify(userGroupPresetList)], {type: 'application/json'});
									a.href = URL.createObjectURL(file);
									a.download = `RedGradientUserGroupPreset.groupPreset.json`;
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
											console.log(evt.target.result)
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
													const t0 = new DataRedGradientLayerGroup()
													checkData.forEach(data => {
														console.log(data)
														for (const k in t0) {
															console.log('k', k)
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
												localStorage.setItem('userGradientGroupDataList', newData);
												const newUserGroupPresetList = JSON.parse(newData);
												setUserGroupPresetList(newUserGroupPresetList)
											} else {
												alert('RedGradient Group Preset 형식의 파일이 아닙니다.');
											}

										};
										fileReader.readAsText(e.target.files[0]);
									};
									break
								}
								default :
									break;
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
			<div style={{padding: '0 10px'}}>Gradient Group Preset</div>

		</div>
		<div style={stylePresetContainer}>
			<div style={stylePresetTypeContainer}>
				<div style={styleTitle}>System Group Preset</div>
				<div>{
					<div
						style={styleListBox}>
						{
							systemPresetList.map((v, index) => <RedGroupPresetItem data={v} key={index}/>)
						}
					</div>
				}
				</div>
			</div>
			<div style={stylePresetTypeContainer}>
				<div style={styleTitle}>User Group Preset
					{renderMenu()}
				</div>
				<div>
					<div
						style={styleListBox}>
						{
							userGroupPresetList.length
								? userGroupPresetList.map((v, index) => <RedGroupPresetItem
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
export default RedGroupPreset

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