import calcLayerGradient from "../../layer/calcLayerGradient";
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA";
import ContextGradient from "../../../contexts/system/ContextGradient";
import {useContext} from "react";
import {toast} from "react-toastify";
import RedToastSkin from "../../../core/RedToastSkin";

const RedBorderPresetItem = ({data, deleteMode, idx}) => {
	const {state: gradientState, actions} = useContext(ContextGradient)
	const HD_setData = () => {
		const targetView = HELPER_GET_DATA.getTargetViewInfo(gradientState)
		const {borderInfo} = targetView['containerInfo']
		const {borderGradientInfo} = borderInfo
		if (!deleteMode) {
			for (const k in data) {
				borderGradientInfo[k] = data[k]
			}
			actions.updateBorderGradientByPreset()
		}

	}
	return <div style={{cursor: 'pointer'}}>
		<div
			style={{
				...style.container,
				background: `${calcLayerGradient(data, undefined, undefined, 1, true)}, linear-gradient(#000, #000)`
			}}
			onClick={HD_setData}
		>
			<div style={{
				position: 'absolute',
				bottom: '-1px',
				left: '-1px',
				padding: '3px',
				background: '#111',
				fontSize: '10px',
				borderRadius: '0px 4px 4px 0'
			}}>{data['type'].split('-').map(v => v.charAt(0).toUpperCase())}</div>
			{deleteMode && <div style={style.styleDelete} onClick={() => {
				window.dispatchEvent(new CustomEvent('removeUserBorderPreset', {detail: idx}))
				toast.dark(
					<RedToastSkin title={'Removed custom border gradient from your presets.'} text={data['label']}/>,
					{
						position: 'bottom-left'
					}
				);
			}}>-</div>}
		</div>
		<div style={style.label}>{data['label']}</div>
	</div>
}
export default RedBorderPresetItem
const style = {
	root: {},
	container: {
		width: '50px',
		height: '50px',
		borderRadius: '6px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		border: '1px solid #111',
	},
	label: {
		fontSize: '11px',
		padding: '3px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		width: '50px',
	},
	styleDelete: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		transform: 'translate(20%,-20%)',
		width: '14px',
		height: '14px',
		borderRadius: '50%',
		background: '#fff',
		lineHeight: 1,
		color: '#000',
		fontSize: '20px',
		fontWeight: 500,
		zIndex: 1,
		border: '1px solid #000',
		boxShadow: '0px 0px 3px rgba(0,0,0,0.2)',
		cursor: 'pointer'
	}
}