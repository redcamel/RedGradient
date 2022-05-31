import {useReducer} from "react";
import makeActions from "../makeActions.js";

const initialState = {
	list: []
}
const keyList = [
	{
		key: 'addWindow'
	},
	{
		key: 'removeWindow'
	},
	{
		key: 'removeLastWindow'
	},
]

function reducer(state, action) {
	console.log(state, action)
	switch (action.type) {
		case 'addWindow':
			state.list.push(action.payload)
			return {
				...state
			}
		case 'removeWindow':
			state.list.splice(action.payload)
			return {
				...state
			}
		case 'removeLastWindow':
			state.list.pop()
			return {
				...state
			}
		default:
			throw new Error("Unsupported action type:", action.type);
	}
}

const useContextWindowReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const actions = makeActions(useContextWindowReducer, keyList, dispatch)
	return {
		state,
		actions
	}
}
export default useContextWindowReducer
