import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasViewKey from "../../../../data/const/ConstCanvasViewKey.js";
import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import ConstBoxSizingType from "../../../../data/const/ConstBoxSizingType.js";
import RedSelect from "../../../basicUI/RedSelect.jsx";

/**
 * 컨테이너 box-sizing 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBoxSizing = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	if (viewKey === ConstCanvasViewKey.ALL) return null
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {boxSizing} = containerInfo
	const HD_changeBoxSizing = (e) => {
		gradientActions.updateContainerBoxSizing({
			viewKey,
			value: e.target.value
		})
	}
	return (
		<div style={style.container}>
			<RedItemTitle label={'Box Sizing'} width={'100px'}/>
			<RedSelect
				flexGrow={1}
				optionData={ConstBoxSizingType}
				value={boxSizing}
				onChange={HD_changeBoxSizing}
			/>

		</div>
	)
}
export default RedContainerBoxSizing
const style = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		gap: '5px'
	},
	item: {
		display: 'flex',
		flexGrow: 1,
		alignItems: 'center',
		whiteSpace: 'nowrap',
		gap: '5px'
	}
}