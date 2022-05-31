import './RedLayerGroupPreviewBackgroundType.css'
import {useContext} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import ConstLayerPreviewBackgroundType from "../../../../data/const/ConstLayerPreviewBackgroundType.js";

/**
 * 레이어 사이즈
 * @returns {JSX.Element}
 * @constructor
 */
const RedLayerGroupPreviewBackgroundType = () => {
	const {actions: gradientActions, state: {layerGroupViewSizeInfo}} = useContext(ContextGradient)
	const {previewBackgroundType} = layerGroupViewSizeInfo
	const HD_setLayerGroupPreviewBackgroundType = (value) => gradientActions.updateLayerGroupViewSizeInfo({
		key: 'previewBackgroundType',
		value
	})
	return (
		<div className={'RedLayerGroupPreviewBackgroundType'}>
			Group Bg
			<div className={'RedLayerGroupPreviewBackgroundType_item_container'}>
				{Object.values(ConstLayerPreviewBackgroundType).map(v => {
					const activeYn = previewBackgroundType === v
					return <div
						key={v}
						className={`RedLayerGroupPreviewBackgroundType_item ${activeYn ? 'active' : ''}`}
						onClick={() => HD_setLayerGroupPreviewBackgroundType(v)}
					>
						<div className={`RedLayerGroupPreviewBackgroundType_item_box ${v}`}/>
					</div>
				})}
			</div>
		</div>
	)
}
export default RedLayerGroupPreviewBackgroundType