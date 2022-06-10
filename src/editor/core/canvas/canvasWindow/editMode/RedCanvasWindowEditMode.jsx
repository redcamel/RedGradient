import './RedCanvasWindowEditMode.css'
import ConstEditMode from "../../../../../data/const/ConstEditMode";
import ConstCanvasViewKey from "../../../../../data/const/ConstCanvasViewKey";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faEyeSlash, faMagnet, faPalette} from "@fortawesome/free-solid-svg-icons";

const RedCanvasWindowEditMode = ({
																	 viewKey,
																	 value,
																	 valueWithView,
																	 valueVisibleGradientEditor,
																	 valueSnapToContainer,
																	 onChangeMode,
																	 onWithViewChange,
																	 onVisibleGradientEditor,
																	 onSnapToContainer
																 }) => {
	return (
		<div className={'RedCanvasWindowEditMode'}>
			<>Transform Mode</>
			<div className={'RedCanvasWindowEditMode_item_container'}>
				{Object.values(ConstEditMode).map((v, index) => {
					const activeYn = value === v
					return <div
						key={index}
						className={`RedCanvasWindowEditMode_item ${activeYn ? 'active' : ''}`}
						onClick={() => onChangeMode(v)}
					>
						<FontAwesomeIcon icon={activeYn ? faEdit : faEdit} fixedWidth={true} size={'1x'}/>
						{v}
						<div className={`RedCanvasWindowEditMode_item_toolTip`}>
							<div className={'RedToolTipIcon_toolTip_shortCut'}>{`Ctr + ${index + 1}`}</div>
						</div>
					</div>
				})}

			</div>
			<>View</>
			<div className={'RedCanvasWindowEditMode_item_container'}>
				{Object.values(ConstCanvasViewKey).map((v, index) => {
					const activeYn = valueWithView.includes(v)
					if (v === viewKey) return null
					return <div
						key={index}
						className={`RedCanvasWindowEditMode_item ${activeYn ? 'active' : ''}`}
						onClick={() => onWithViewChange(v)}>
						<FontAwesomeIcon icon={activeYn ? faEye : faEyeSlash} fixedWidth={true} size={'1x'}/>{v}
					</div>
				})}
			</div>
			<label style={{display: 'flex', alignItems: 'center', cursor: 'pointer',gap:'5px'}} onClick={onVisibleGradientEditor}>
				<FontAwesomeIcon icon={faPalette}/> Use Visual Gradient Editor <input type={'checkbox'} key={Math.random()} checked={valueVisibleGradientEditor}
																					style={{cursor: 'pointer'}} onChange={() => {
			}}/>
			</label>
			{
				value === ConstEditMode.GRADIENT && <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer',gap:'5px'}} onClick={onSnapToContainer}>
					<FontAwesomeIcon icon={faMagnet}/> Snap To Container <input type={'checkbox'} key={Math.random()} checked={valueSnapToContainer}
																	 style={{cursor: 'pointer'}} onChange={() => {
				}}/>
				</label>
			}

		</div>
	)
}
export default RedCanvasWindowEditMode