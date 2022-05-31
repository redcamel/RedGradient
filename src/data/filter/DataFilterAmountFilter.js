const DataFilterAmountFilter = function (type, amount = 0, amountKey = 'amount') {
	return {
		type: type,
		visibleYn: true,
		setting: {
			[amountKey]: amount
		}
	}
}
export default DataFilterAmountFilter