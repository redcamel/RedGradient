const makeActions = (reducer, keyDataList, dispatch) => {
	// console.log('make actions',keyDataList)
	return keyDataList.reduce((prev, v) => {
		const key = v['key']
		const label = v['label']
		const icon = v['icon']
		prev[key] = (payload) => {
			// const groupName = `${reducer.name}.${key}`
			// console.group(groupName)
			// console.table(payload)
			// console.groupEnd(groupName)
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