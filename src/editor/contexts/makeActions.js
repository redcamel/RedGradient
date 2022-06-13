const makeActions = (reducer, keyDataList, dispatch) => {
	return keyDataList.reduce((prev, v) => {
		const key = v['key']
		const label = v['label']
		const icon = v['icon']
		prev[key] = (payload) => {
			dispatch(
				{
					type: key,
					label: label,
					icon: icon,
					payload: payload
				}
			)
		}
		return prev
	}, {})
}
export default makeActions