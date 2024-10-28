
export const mutation_sales = `
mutation submitSales(
    $startDate: AWSDate!
    $franchiseId: String!
    $days: Int!
    $datapoints: [SalesDatapoint!]!
  ) {
    submitSales(
      input: {
        startDate: $startDate
        franchiseId: $franchiseId
        days: $days
        datapoints: $datapoints
      }
    ) {
      status
      errors {
        reasons
        id
      }
    }
  }
`


export const dummy_sales_variables = {
	startDate: "2024-08-05",
	franchiseId: "1234",
	days: 2,
	datapoints: [
		{
			storeId: "1234",
			date: "2024-08-05",
			salesAmount: 1,
			currency: "USD"
		}
	]
}

export const mutation_ppr = `
mutation submitPPR(
    $startDate: AWSDate!
    $datapoints: [PPRDatapoint!]!
  ) {
    submitPPR(
      input: {
        startDate: $startDate
        datapoints: $datapoints
      }
    ) {
      status
      errors {
        reasons
        id
      }
    }
  }
`

export const dummy_ppr_variables = {
	startDate: "2024-08-05",
	datapoints: [
		{
			franchiseId: "",
			date: "2024-08-05",
			genericId: "",
			styleName: "",
			sellingPerson: "",
			landingPrice: 0.0,
			originalUnitPrice: 0.0,
			currentUnitPrice: 0.0,
			receptionWH: "",
			receptionStore: "",
			totalUnitsSTD: 0,
			totalUnitsLTM: 0,
			onHandStore: 0,
			onHandWH: 0,
			salesQty: 0,
			salesAmount: 0.0,
			currency: "",
			bmTotalQty: 1,
			ecomTotalQty: 1
		}
	]
}