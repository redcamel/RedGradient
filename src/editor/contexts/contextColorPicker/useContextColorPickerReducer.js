import {useReducer} from "react";
import makeActions from "../makeActions.js";

const initialState = {
	openYn: false,
	color: '#ff0000',
	position: {
		x: 0,
		y: 0
	},
	getColorFunction: null,
	updateFunction: null
}
const keyList = [
	{
		key: 'openPicker'
	},
	{
		key: 'closePicker'
	}
]

function reducer(state, action) {
	switch (action.type) {
		case 'openPicker':
			return {
				...state,
				openYn: true,
				backgroundColor: action.payload,
				position: action.payload['position'],
				getColorFunction: action.payload['getColorFunction'],
				updateFunction: action.payload['updateFunction']
			}
		case 'closePicker':
			return {
				...state,
				openYn: false
			}
		default:
			throw new Error("Unsupported action type:", action.type);
	}
}

const useContextColorPickerReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const actions = makeActions(useContextColorPickerReducer, keyList, dispatch)
	return {
		state,
		actions
	}
}
export default useContextColorPickerReducer
