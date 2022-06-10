import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedSelect from "../../../basicUI/RedSelect.jsx";
import ConstBlendModeType from "../../../../data/const/ConstBlendModeType.js";

/**
 * 컨테이너 MixBlendMode 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerMixBlendMode = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {mixBlendMode} = containerInfo
	const HD_changeBlendMode = (e) => {
		gradientActions.updateContainerMixBlendMode({
			viewKey,
			value: e.target.value
		})
	}
	return (
		<div style={style.container}>
			<RedItemTitle label={'MixBlendMode'} width={'100px'}/>
			<RedSelect
				flexGrow={1}
				optionData={ConstBlendModeType}
				value={mixBlendMode}
				onChange={HD_changeBlendMode}
			/>

		</div>
	)
}
export default RedContainerMixBlendMode
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