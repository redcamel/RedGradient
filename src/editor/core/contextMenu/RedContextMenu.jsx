import {useContext, useEffect, useRef} from "react";
import ContextMenu from "../../contexts/contextMenu/ContextMenu.js";
import './RedContextMenu.css'

const RedContextMenu = () => {
	const {state, actions} = useContext(ContextMenu)
	const {x, y, data} = state
	const ref = useRef()
	useEffect(() => {
		if (ref.current && state.data) {
			const w = window.innerWidth
			const h = window.innerHeight
			const box = ref.current.getBoundingClientRect()
			let tX = x
			let tY = y
			if (box.right > w) tX = (w - box.width - 10)
			if (box.bottom > h) tY = (h - box.height - 10)
			actions.setData({
				x: tX,
				y: tY,
				data: data
			})
		}
	}, [ref.current, state.data])
	if (!data) return null;
	const testData = [
		<>컨텍스트 메뉴가 나옴 {JSON.stringify(data)}</>,
		RedContextMenu.DIVISION,
		<>컨텍스트 메뉴가 나옴 {JSON.stringify(data)}</>,
		RedContextMenu.DIVISION,
		<>컨텍스트 메뉴가 나옴 {JSON.stringify(data)}</>,
		<>컨텍스트 메뉴가 나옴 {JSON.stringify(data)}</>,
	]
	return (
		<>
			<div className={'RedContextMenu_container'}
					 style={{
						 left: x + 'px', top: y + 'px'
					 }}
					 ref={ref}

					 key={`${x}_${y}`}
					 onClick={e => {
						 e.preventDefault();
						 e.stopPropagation();
					 }}
			>
				<div className={'RedContextMenu_contextBox'}>
					{testData.map((v, index) => v === RedContextMenu.DIVISION ?
						<div className={'RedContextMenu_contextDivision'} key={index}/> :
						<div className={'RedContextMenu_contextItem'} key={index}>{v}</div>)}
				</div>
			</div>
		</>
	)
}
RedContextMenu.DIVISION = 'division'
export default RedContextMenu

