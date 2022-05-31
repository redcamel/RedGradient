import './RedWindowRender.css'
import {useContext} from "react";
import ContextWindows from "../../contexts/window/ContextWindows.js";

const RedWindowRender = () => {
	const {state} = useContext(ContextWindows)
	return state.list.map((v, index) => {
		return <div
			key={index}
			className={'RedWindowRender'}
			style={{
				background: v['backgroundColor'] || 'transparent'
			}}
		>
			{v['contents']}
		</div>
	})
}
export default RedWindowRender