import fs from 'fs';
import csv from 'csv-parser';

//GRAPHQL OBJECTS

export const mutation_sales = `mutation submitSales(
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



export const mutation_ppr = `mutation submitPPR(
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


//Methods from manipulating GraphQL

export async function salesCsvToJsObjects(csvFilePath) {
  let rows = [];
  let rowNumber = 1; // Initialize row counter
  let earliest_date_row_index = 0;
  let earliest_date_iso = 32503680000000; //The timestamp for 3000-01-01 in milliseconds
  let latest_date_iso = 0;

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        //task #1 make the datapoints array for graphql mutation
        const [month, day, year] = data['Date'].trim().split('/').map(Number);
        const date_input = `${year}-${month}-${day}`
        const rowObject = {
          //data type validation is done here
          storeId: Number.isFinite((parseFloat(data['Store'].trim()))) ? data['Store'].trim() : null,
          //verify in the format mm/dd/yyyy, format inherited from sales app
          date: /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(data['Date'].trim()) ? date_input : null,
          salesAmount: Number.isFinite((parseFloat(data['Amount'].trim()))) ? parseFloat(data['Amount'].trim()) : null,
          currency: /^[a-zA-Z]{3}$/.test(data['Currency'].trim()) ? data['Currency'].trim() : null,
        };
        // Check if any value in rowObject is null
        if (Object.values(rowObject).includes(null)) {
          reject(new Error(`Missing or incorrect data in row #${rowNumber}: ${JSON.stringify(data)}`));
          return;
        }
        rows.push(rowObject);

        //task #2 find the smallest date to be our start date
        const dateObject = new Date(date_input);
        const utcDate = new Date(Date.UTC(dateObject.getUTCFullYear(), dateObject.getUTCMonth(), dateObject.getUTCDate()));
        const timestamp = utcDate.getTime();
        if (timestamp < earliest_date_iso) {
          earliest_date_iso = timestamp;
          earliest_date_row_index = rowNumber - 1;
        }; 
        // task #3 find the latest date to help us find how many days
        if (timestamp > latest_date_iso) {
          latest_date_iso = timestamp
        }; 

        rowNumber++;
      })
      .on('end', resolve)
      .on('error', reject);
  });

  const num_days = (latest_date_iso - earliest_date_iso) / (1000 * 60 * 60 * 24) + 1;
  return [rows, earliest_date_row_index, num_days];
}


export async function sales_mutation_variable_factory(csv_path, franchiseId = "1234") {
	
  let [datapoints_array, earliest_date_i, num_days] = await salesCsvToJsObjects(csv_path);

  return {
    startDate: datapoints_array[earliest_date_i]["date"],
    franchiseId: franchiseId,
    days: num_days,
    datapoints: datapoints_array
  }
}