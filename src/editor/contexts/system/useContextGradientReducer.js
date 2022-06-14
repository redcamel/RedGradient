import {useReducer} from "react";
import makeActions from "../makeActions.js";
import {faBox} from "@fortawesome/free-solid-svg-icons";
import commands_system from "./commands/commands_system/index.js";
import commands_systemFrameLayoutInfo from "./commands/commands_systemFrameLayoutInfo/index.js";
import commands_history from "./commands/commands_history/index.js";
import commands_container from "./commands/commands_container/index.js";
import commands_device from "./commands/commands_device/index.js";
import commands_canvas_option from "./commands/commands_canvas_option/index.js";
import commands_group from "./commands/commands_group/index.js";

const defineInfo = {
	...commands_system,
	...commands_systemFrameLayoutInfo,
	...commands_history,
	...commands_container,
	...commands_device,
	...commands_canvas_option,
	...commands_group
}
const keyList = Object.values(defineInfo).map(v => v.description).concat([
	// view control
	// containerInfo
	{
		key: 'updateContainerMixBlendMode',
		label: 'Container BlendMode Change',
		icon: faBox
	},
])
let history = []
let maxHistoryNum = 50
const historyRedo = []
const pushHistory = function (action, data, saveHistoryYn) {
	if (saveHistoryYn) {
		const now = new Date().getTime()
		const newHistory = {
			type: action['type'],
			label: action['label'],
			icon: action['icon'],
			updateTime: now,
			data: JSON.parse(JSON.stringify(data))
		}
		if (history.length === maxHistoryNum) history.shift()
		history.push(newHistory)
		historyRedo.length = 0
		return newHistory['data']
	}
	return data
}
const undoHistory = function () {
	if (history.length > 1) {
		const redoState = history.pop()
		historyRedo.push(redoState)
		return history.slice(-1)[0]['data']
	} else {
		return history[0]['data']
	}
}
const redoHistory = () => {
	if (historyRedo.length) {
		const targetState = historyRedo.pop()
		history.push(targetState)
	}
	return history.slice(-1)[0]['data']
}
const setTargetHistoryIndex = (index) => {
	let temp = history.concat(historyRedo.reverse())
	resetHistory()
	history.push(...temp.slice(0, index + 1))
	historyRedo.push(...temp.slice(index + 1))
	historyRedo.reverse()
}
const resetHistory = () => {
	history.length = 0
	historyRedo.length = 0
}

function reducer(state, action) {
	let newData;
	const payload = action.payload
	let value
	const targetCommandInfo = defineInfo[`cmd_${action.type}`]
	console.log('action', action)
	if (targetCommandInfo) {
		return targetCommandInfo.execute(state, action, payload, {
			history,
			pushHistory,
			resetHistory,
			setTargetHistoryIndex,
			undoHistory,
			redoHistory
		})
	} else {
		switch (action.type) {
			//
			case 'updateContainerMixBlendMode':
				value = payload.value
				newData = {
					...JSON.parse(JSON.stringify(state))
				}
				newData.canvasInfo[payload.viewKey]['containerInfo']['mixBlendMode'] = value
				return pushHistory(action, newData, true)
			// end container
			// end layer
			default:
				throw new Error("Unsupported action type:", action.type);
		}
	}
}
let actions;
const useContextGradientReducer = () => {
	const [state, dispatch] = useReducer(reducer, null)
	actions = actions || makeActions(useContextGradientReducer, keyList, dispatch)
	return {
		state: state,
		history,
		historyRedo,
		actions
	}
}
export default useContextGradientReducer
