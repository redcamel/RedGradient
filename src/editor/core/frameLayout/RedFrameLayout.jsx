import {useContext, useEffect, useState} from "react";
import ContextMenu from "../../contexts/contextMenu/ContextMenu.js";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import './RedFrameLayout.css';
import SplitterLayout from "../splitterLayout/SplitterLayout.js";
import RedFrameTopStatus from "../../frame/RedFrameTopStatus";
import HELPER_GET_DATA from "../../contexts/system/HELPER_GET_DATA.js";
import ConstEditMode from "../../../data/const/ConstEditMode.js";
import {faFolder, faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import openFile from "../../openFile";
import saveFile from "../../saveFile";
import RedWindow from "../../basicUI/window/RedWindow";
import RedNewDocument from "../../start/newDocument/RedNewDocument";
import ContextWindows from "../../contexts/window/ContextWindows";

/**
 * 기본 프레임 구성
 * @param top
 * @param left
 * @param center
 * @param right
 * @param bottom
 * @param status
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameLayout = ({top, left, center, right, bottom, status}) => {
	const contextMenu = useContext(ContextMenu)
	const {state: contextMenuState, actions: contextMenuActions} = contextMenu
	const {state: contextGradientState, actions: contextGradientActions} = useContext(ContextGradient)
	const {actions: windowActions} = useContext(ContextWindows)
	const {history} = useContext(ContextGradient)
	const openLeftGroupList = [
		{
			label: 'Container Editor',
			shortcut: 'F1'
		},
		// {
		// 	label: 'Container Editor - TODO - 멀티로되게...',
		// }
	]
	const openRightGroupList = [
		{
			label: 'Gradient Editor',
			shortcut: 'F2'
		},
		// {
		// 	label: 'Container Editor - TODO - 멀티로되게...',
		// }
	]
	const [activeLeftGroupIDX, setActiveLeftGroupIDX] = useState(0)
	const [activeRightGroupIDX, setActiveRightGroupIDX] = useState(0)
	const HD_callContext = e => {
		e.button === 2 && contextMenuActions.setData({
			x: e.pageX,
			y: e.pageY,
			data: Math.random()
		})
	}
	useEffect(() => {
		const HD_keyDown = e => {
			switch (e.keyCode) {
				case 112 :
				case 113:
					e.stopPropagation()
					e.preventDefault()
					break
				default :
					break
			}
			switch (e.keyCode) {
				case 112 :
					//f1
					setActiveLeftGroupIDX(activeLeftGroupIDX === null ? 0 : activeLeftGroupIDX === 0 ? null : 0)
					break
				case 113:
					//f2
					setActiveRightGroupIDX(activeRightGroupIDX === null ? 0 : activeRightGroupIDX === 0 ? null : 0)
					break
				default :
					break
			}
		}
		document.addEventListener('keydown', HD_keyDown);
		return () => {
			document.removeEventListener('keydown', HD_keyDown);
		}
	}, [activeLeftGroupIDX, activeRightGroupIDX])
	const renderMiddleItem = (v, index, activeYn, onClick) => {
		return <div
			key={index}
			onClick={onClick}
			className={'RedFrameLayout_containerLeftRightBox'}
			style={{background: activeYn ? '#111' : '#333'}}
		><FontAwesomeIcon
			icon={activeYn ? faFolderOpen : faFolder}/> {v['label']} {v["shortcut"] ? ` - ${v['shortcut']}` : ''}
		</div>
	}
	const renderMiddle = () => {
		return <div style={{display: 'flex', flexGrow: 1}}>
			<div className={'RedFrameLayout_containerLeft'}>
				{
					openLeftGroupList.map((v, index) => {
						const activeYn = index === activeLeftGroupIDX
						return renderMiddleItem(v, index, activeYn, () => {
							if (activeLeftGroupIDX === index) setActiveLeftGroupIDX(null)
							else setActiveLeftGroupIDX(index)
						})
					})
				}
			</div>
			<div className={'RedFrameLayout_middleSet'}>
				<SplitterLayout
					vertical
					primaryMinSize={100}
					secondaryInitialSize={36} secondaryMinSize={36}
				>
					<div className={'RedFrameLayout_middleSet2'}>
						<SplitterLayout
							primaryMinSize={280}
							primaryIndex={1}
							secondaryInitialSize={280} secondaryMinSize={280}
						>
							{activeLeftGroupIDX === 0 && <div className={'RedFrameLayout_left'}>{left}</div>}
							<SplitterLayout
								primaryMinSize={100}
								secondaryInitialSize={700} secondaryMinSize={700}
								// secondaryInitialSize={300} secondaryMinSize={300}
							>
								<div className={'RedFrameLayout_center'} onMouseDown={HD_callContext}>{center}</div>
								{activeRightGroupIDX === 0 && <div className={'RedFrameLayout_right'}><RedFrameTopStatus/>{right}</div>}
							</SplitterLayout>
						</SplitterLayout>

					</div>
					{bottom && <div className={'RedFrameLayout_bottom'}>{bottom}</div>}
				</SplitterLayout>
			</div>
			<div className={'RedFrameLayout_containerRight'}>
				{
					openRightGroupList.map((v, index) => {
						const activeYn = index === activeRightGroupIDX
						return renderMiddleItem(v, index, activeYn, () => {
							if (activeRightGroupIDX === index) setActiveRightGroupIDX(null)
							else setActiveRightGroupIDX(index)
						})
					})
				}
			</div>
		</div>
	}
	/**
	 * 컨텍스트 메뉴 관련
	 */
	useEffect(() => {
		const HD_disableContextMenu = e => e.preventDefault();
		const HD_clearContextMenu = e => {
			if (e.target.tagName === 'A') {

			} else {
				e.preventDefault();
				if (contextMenuState.data) contextMenuActions.setData(null)
			}

		}
		document.addEventListener("contextmenu", HD_disableContextMenu);
		document.addEventListener("click", HD_clearContextMenu);
		return () => {
			document.removeEventListener("contextmenu", HD_disableContextMenu);
			document.removeEventListener("click", HD_clearContextMenu);
		}
	}, [contextMenuState.data])
	useEffect(() => {
		const checkUnloadEvent = () => {
			if (history.length > 1) return 'test'
		}
		window.onbeforeunload = checkUnloadEvent
		return () => {
			window.onbeforeunload = null
		}
	}, [])
	if (!window.RedKey) window.RedKey = {downList: {alt: false}, upList: {alt: false}, code2name: {}, name2code: {}}
	/**
	 * 히스토리 이벤트 처리
	 */
	useEffect(() => {
		let redKey
		redKey = window.RedKey
		let i, j, k, v
		const t1 = 'F9,120,a,65,b,66,c,67,d,68,e,69,f,70,g,71,h,72,i,73,j,74,k,75,l,76,m,77,n,78,o,79,p,80,q,81,r,82,s,83,t,84,u,85,v,86,w,87,x,88,y,89,z,90,back,8,tab,9,enter,13,shift,16,control,17,alt,18,pause,19,caps,20,esc,27,space,32,pageup,33,pagedown,34,end,35,home,36,left,37,up,38,right,39,down,40,insert,45,delete,46,numlock,144,scrolllock,145,0,48,1,49,2,50,3,51,4,52,5,53,6,54,7,55,8,56,9,57'.split(',');
		i = 0;
		j = t1.length;
		while (i < j) {
			k = t1[i++];
			v = (t1[i++]);
			redKey.name2code[k] = v;
			redKey.code2name[v] = k;
		}
		const HD_keyDown = e => {
			const stopEvent = () => {
				e.preventDefault()
				e.stopPropagation()
			}
			const prev = JSON.stringify(redKey)
			const KEYCODE = e.keyCode
			const code2name = redKey.code2name[KEYCODE]
			const downList = redKey.downList
			const CONTROL = downList.control
			const ALT = downList.alt
			const SHIFT = downList.shift
			if (code2name) downList[code2name] = 1
			if (CONTROL && KEYCODE === 79) {
				stopEvent()
				openFile(contextGradientActions)
			} else if (CONTROL && KEYCODE === 83) {
				stopEvent()
				saveFile(contextGradientState)
			} else if (ALT && KEYCODE === 78) {
				stopEvent()
				windowActions.addWindow({
					contents: <RedWindow><RedNewDocument/></RedWindow>,
					backgroundColor: 'rgba(0,0,0, 0.5)'
				})
			} else if (CONTROL && SHIFT && downList.z) {
				stopEvent()
				contextGradientActions.redo()
			} else if (CONTROL && downList.z) {
				stopEvent()
				contextGradientActions.undo()
			} else {
				if (CONTROL) {
					let editMode
					switch (code2name) {
						case '1' :
							editMode = ConstEditMode.CONTAINER
							break
						case '2' :
							editMode = ConstEditMode.GRADIENT
							break
						case '3' :
							editMode = ConstEditMode.BORDER_RADIUS
							break
						case '4' :
							editMode = ConstEditMode.NONE
							break
						default :
							break
					}
					if (editMode) {
						stopEvent()
						contextGradientActions.updateCanvasEditMode({
							viewKey: HELPER_GET_DATA.getActiveViewInfo(contextGradientState)['viewKey'],
							value: editMode
						})
					}
				}
			}

			if(prev !== JSON.stringify(redKey)) contextGradientActions.setKeyState(redKey)
		}
		const HD_keyUp = e => {
			const code2name = redKey.code2name[e.keyCode]
			if (code2name === 'alt' && redKey.downList[code2name]) {
				e.preventDefault()
			}



			if (code2name) {
				redKey.downList[code2name] = 0;
				redKey.upList[code2name] = 1
			}

			if(redKey.downList['control'] && redKey.downList['alt'] && redKey.upList['d']){
				const t0 = HELPER_GET_DATA.getActiveLayerGroupInfo(contextGradientState)
				if(t0){
					e.preventDefault()
					e.stopPropagation()
					contextGradientActions.duplicateLayer({
						groupIndex: t0.activeGroupIndex,
						groupLayerIndex: t0.activeGroupLayerIndex
					})
				}

			}

			contextGradientActions.setKeyState(redKey)
		}
		// const HD_keyPress = e => {
		// 	e.preventDefault()
		// 	e.stopPropagation()
		// }
		document.addEventListener('keydown', HD_keyDown);
		document.addEventListener('keyup', HD_keyUp);
		return () => {
			document.removeEventListener('keydown', HD_keyDown);
			document.removeEventListener('keyup', HD_keyUp);
		}
	}, [contextGradientState])
	return (
		<div className={'RedFrameLayout_container'}>
			<div className={'RedFrameLayout_top'}>{top}</div>
			{renderMiddle()}
			<div className={'RedFrameLayout_bottomSet'}>
				{status && <div className={'RedFrameLayout_status'}>{status}</div>}
			</div>
		</div>
	)
}
export default RedFrameLayout