import './RedLayerPreviewBackgroundType.css'
import {useContext} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import ConstLayerPreviewBackgroundType from "../../../../data/const/ConstLayerPreviewBackgroundType.js";
import {faCopy, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import RedToolTipIcon from "../../../basicUI/icon/RedToolTipIcon.jsx";

/**
 * 레이어 사이즈
 * @returns {JSX.Element}
 * @constructor
 */
const RedLayerPreviewBackgroundType = ({layerData, groupIdx, layerIdx}) => {
	const {actions: gradientActions} = useContext(ContextGradient)
	const HD_setLayerGroupPreviewBackgroundType = (value) => gradientActions.updateLayerByKey({
		key: 'previewBackgroundType',
		groupIndex: groupIdx,
		groupLayerIndex: layerIdx,
		value
	})
	const HD_remove = (e) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.removeLayer({
			groupIndex: groupIdx,
			groupLayerIndex: layerIdx
		})
	}
	const HD_duplicateLayer = (e) => {
		e.preventDefault()
		e.stopPropagation()
		gradientActions.duplicateLayer({
			groupIndex: groupIdx,
			groupLayerIndex: layerIdx
		})
	}
	const {previewBackgroundType} = layerData
	return (
		<div className={'RedLayerPreviewBackgroundType'}>
			<div className={'RedLayerPreviewBackgroundType_item_container'}>
				{Object.values(ConstLayerPreviewBackgroundType).map(type => {
					const activeYn = previewBackgroundType === type
					return <div
						key={type}
						className={`RedLayerPreviewBackgroundType_item ${activeYn ? 'active' : ''}`}
						onClick={() => HD_setLayerGroupPreviewBackgroundType(type)}
					>
						<div className={`RedLayerPreviewBackgroundType_item_box ${type}`}/>
					</div>
				})}
				<div className={`RedLayerPreviewBackgroundType_item`} style={{padding: '0 4px'}}>
					<RedToolTipIcon icon={faCopy} toolTip={'Duplicate Layer'} style={{fontSize: '14px'}}
													onClick={HD_duplicateLayer}
					/>
				</div>
				<div className={`RedLayerPreviewBackgroundType_item`} style={{padding: '0 4px'}}>
					<RedToolTipIcon icon={faTrashAlt} toolTip={'Remove Layer'} style={{fontSize: '14px', width: '24px'}}
													onClick={HD_remove}
					/>
				</div>
			</div>
		</div>
	)
}
export default RedLayerPreviewBackgroundType