import './RedGrid.css'

const RedGrid = ({viewScale = 1, viewOffset = {x: 0, y: 0}}) => {
	const backgroundPosition = `calc(50% + ${viewOffset.x + viewScale * 5}px ) calc(50% + ${viewOffset.y + viewScale * 5}px)`
	const backgroundSize = `${viewScale * 10}px ${viewScale * 10}px`
	return <div className={'RedGridContainer'} style={{
		backgroundPosition,
		backgroundSize
	}}></div>
}

export default RedGrid