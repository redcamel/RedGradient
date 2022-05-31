import ContextGradient from "../../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasViewKey from "../../../../../data/const/ConstCanvasViewKey.js";
import RedItemTitle from "../../../../basicUI/RedItemTitle.jsx";
import RedContainerBorderRadius from "./widthAndRadius/RedContainerBorderRadius.jsx";
import RedContainerBorderWidth from "./widthAndRadius/RedContainerBorderWidth.jsx";
import RedContainerBorderStyle from "./RedContainerBorderStyle.jsx";
import RedContainerBorderColor from "./RedContainerBorderColor.jsx";
import RedDivision from "../../../../basicUI/RedDivision.jsx";
import ConstBoxBorderModeType from "./ConstBoxBorderModeType.js";
import RedContainerBorderImageOutset from "./image/RedContainerBorderImageOutset.jsx";
import RedContainerBorderImageRepeat from "./image/RedContainerBorderImageRepeat.jsx";
import RedContainerBorderImageSlice from "./image/RedContainerBorderImageSlice.jsx";
import RedContainerBorderGradient from "./RedContainerBorderGradient";

/**
 * 컨테이너 border 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBorder = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	if (viewKey === ConstCanvasViewKey.ALL) return null
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {containerInfo} = targetView
	const {borderInfo} = containerInfo
	const {mode} = borderInfo
	const HD_changeBorderMode = (v) => {
		gradientActions.update_borderModeType(v)
	}
	return (
		<div style={style.container}>
			<div style={style.titleContainer2}>
				<RedItemTitle label={'Border'} width={'100px'}/>
				<div style={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
					{
						Object.values(ConstBoxBorderModeType).map((v, index) => {
							const activeYn = v === mode
							return <div
								key={index}
								style={{
									display: 'flex',
									flexGrow: 1,
									justifyContent: 'center',
									padding: '6px 10px',
									background: activeYn ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : 'linear-gradient(rgb(30, 30, 30), rgb(0 0 0 / 45%))',
									borderRadius: index ? '0 4px 4px 0' : '4px 0 0 4px',
									border: `1px solid ${activeYn ? '#000' : '#000'}`,
									borderRight: index ? '1px solid #000' : 'none',
									cursor: 'pointer'
								}}
								onClick={() => HD_changeBorderMode(v)}
							>
								{v}
							</div>
						})
					}
				</div>
			</div>
			<div>
				<RedContainerBorderRadius viewKey={viewKey}/>
				<RedDivision/>
				<RedContainerBorderWidth viewKey={viewKey}/>
				<RedDivision/>
				{
					mode === ConstBoxBorderModeType.GRADIENT ? <>
							<RedContainerBorderImageOutset viewKey={viewKey}/>
							<RedDivision/>
							<RedContainerBorderImageSlice viewKey={viewKey}/>
							<RedDivision/>
							<RedContainerBorderImageRepeat viewKey={viewKey}/>
							<RedDivision/>
							<RedContainerBorderGradient viewKey={viewKey}/>
						</>
						: <>
							<RedContainerBorderColor viewKey={viewKey}/>
							<RedDivision/>
							<RedContainerBorderStyle viewKey={viewKey}/>
							<RedDivision/>
						</>
				}

			</div>
		</div>
	)
}
export default RedContainerBorder
const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px'
	},
	titleContainer2: {
		display: 'flex',
		flexDirection: 'row',
		gap: '5px'
	}
}