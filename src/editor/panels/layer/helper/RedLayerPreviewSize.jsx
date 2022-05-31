import './RedLayerPreviewSize.css'
import {useContext} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import ConstLayerPreviewSize from "../../../../data/const/ConstLayerSizeType.js";

/**
 * 레이어 사이즈
 * @returns {JSX.Element}
 * @constructor
 */
const RedLayerPreviewSize = () => {
	const {actions: gradientActions, state: {layerGroupViewSizeInfo}} = useContext(ContextGradient)
	const HD_setLayerPanelSize = (value) => gradientActions.updateLayerGroupViewSizeInfo({key: 'size', value})
	return (
		<div className={'RedLayerPreviewSize'}>
			{Object.values(ConstLayerPreviewSize).map((v, index) => {
				const activeYn = layerGroupViewSizeInfo['size'] === v
				return <div
					key={index}
					className={`RedLayerPreviewSize_item ${activeYn ? 'active' : ''}`}
					onClick={() => HD_setLayerPanelSize(v)}
				>{v}</div>
			})}
		</div>
	)
}
export default RedLayerPreviewSize