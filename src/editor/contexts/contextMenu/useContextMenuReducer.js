import {useReducer} from "react";
import makeActions from "../makeActions.js";

const initialState = {
	event: null,
	data: null,
}
const keyList = [{
	key: 'setData',
	label: '컨텍스트 메뉴'
}]

function reducer(state, action) {
	switch (action.type) {
		case 'setData':
			return {
				...action.payload
			}
		default:
			throw new Error("Unsupported action type:", action.type);
	}
}

const useContextMenuReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const actions = makeActions(useContextMenuReducer, keyList, dispatch)
	return {
		state,
		actions
	}
}
export default useContextMenuReducer
