import calcLayerGradient from "../../layer/calcLayerGradient";
import ContextGradient from "../../../contexts/system/ContextGradient";
import {useContext} from "react";
import {toast} from "react-toastify";
import RedToastSkin from "../../../core/RedToastSkin";

const RedGroupPresetItem = ({data, deleteMode, idx}) => {
	const {actions} = useContext(ContextGradient)
	// console.log(data)
	const HD_setData = () => {
		if (!deleteMode) {
			actions.addGroup(JSON.parse(JSON.stringify(data)))
		}

	}
	return <div style={{cursor: 'pointer'}}>
		<div
			style={{
				...style.container,
				background: data['children'].map((v2, layerIndex) => {
					// console.log(v2)
					return v2['visibleYn'] ? calcLayerGradient(v2) : null
				}).filter(Boolean).join(','),
			}}
			onClick={HD_setData}
		>
			{deleteMode && <div style={style.styleDelete} onClick={() => {
				window.dispatchEvent(new CustomEvent('removeUserGroupPreset', {detail: idx}))
				toast.dark(
					<RedToastSkin title={'Removed custom Group from your presets.'} text={data['label']}/>,
					{
						position: 'bottom-right'
					}
				);
			}}>-</div>}
		</div>
		<div style={style.label}>{data['label']}</div>
	</div>
}
export default RedGroupPresetItem
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