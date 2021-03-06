import './RedContainerEditor.css'
import {faBorderStyle, faBox, faFillDrip, faPalette} from "@fortawesome/free-solid-svg-icons";
import RedDivision from "../../basicUI/RedDivision.jsx";
import RedContainerSize from "./cssProperty/RedContainerSize.jsx";
import HELPER_GET_DATA from "../../contexts/system/HELPER_GET_DATA.js";
import ContextGradient from "../../contexts/system/ContextGradient.js";
import {useContext} from "react"
import RedContainerPosition from "./cssProperty/RedContainerPosition.jsx";
import RedContainerBoxSizing from "./cssProperty/RedContainerBoxSizing.jsx";
import RedContainerBackgroundColor from "./cssProperty/RedContainerBackgroundColor.jsx";
import RedContainerBoxShadow from "./cssProperty/RedContainerBoxShadow.jsx";
import RedPanel from "../../basicUI/panel/RedPanel.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RedContainerFilter from "./filter/RedContainerFilter.jsx";
import RedContainerOutline from "./cssProperty/outline/RedContainerOutline.jsx";
import RedContainerBorder from "./cssProperty/border/RedContainerBorder.jsx";
import RedCssPreview from "../css/RedCssPreview.jsx";
import PARSER_CONTAINER_CSS from "../../contexts/system/PARSER_CONTAINER_CSS.js";

/**
 * RedContainerEditor
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerEditor = () => {
	const {state} = useContext(ContextGradient)
	const targetView = HELPER_GET_DATA.getActiveViewInfo(state)
	const {viewKey} = targetView

	return (
		<div className={'RedContainerEditor_container'}>
			<RedPanel
				useOnOff={false}
				titleLabel={
					<div className={'RedContainerEditor_title'}>
						<div className={'RedContainerEditor_title target'}>{viewKey}</div>
						Container Editor <FontAwesomeIcon icon={faPalette}/>
					</div>
				}
				tabFlexGrow={1}
				tabInfo={
					[
						{
							label: 'Container',
							icon: faBox,
							contents: <div>
								<div className={'RedContainerEditor_description'}>Container edit</div>
								{
									<div className={'RedContainerEditor_middle'}>
										<RedContainerSize viewKey={viewKey}/>
										<RedDivision/>
										<RedContainerPosition viewKey={viewKey}/>
										<RedDivision/>
										<RedContainerBackgroundColor viewKey={viewKey} useLabel={true}/>
										<RedDivision/>
										{/*<RedContainerMixBlendMode viewKey={viewKey}/>*/}
										{/*<RedDivision/>*/}
										<RedContainerBoxSizing viewKey={viewKey}/>
										<RedDivision/>
										<RedContainerBoxShadow viewKey={viewKey}/>
										<RedDivision/>
										<RedCssPreview
											label={`${viewKey} Container Css Preview`}
											codeStr={PARSER_CONTAINER_CSS.getPreviewCss(HELPER_GET_DATA.getActiveViewInfo(state), 'container')}
										/>
									</div>
								}
							</div>
						},
						{
							label: 'Border & Outline',
							icon: faBorderStyle,
							contents: <div>
								<div className={'RedContainerEditor_description'}>Border & Outline Edit</div>
								<RedContainerOutline viewKey={viewKey}/>
								<RedDivision/>
								<RedContainerBorder viewKey={viewKey}/>
								<RedDivision/>
								<RedCssPreview
									label={'Border & Outline Css Preview'}
									codeStr={PARSER_CONTAINER_CSS.getPreviewCss(HELPER_GET_DATA.getActiveViewInfo(state), 'border')}
								/>
							</div>
						},
						{
							label: 'Filter',
							icon: faFillDrip,
							contents: <>
								<div className={'RedContainerEditor_description'}>Filter Edit</div>
								<RedContainerFilter viewKey={viewKey}/>
								<RedDivision/>
								<RedCssPreview
									label={'Filter Css Preview'}
									codeStr={PARSER_CONTAINER_CSS.getPreviewCss(HELPER_GET_DATA.getActiveViewInfo(state), 'filter')}
								/>
							</>
						}
					]
				}
			/>
		</div>
	)
}
export default RedContainerEditor