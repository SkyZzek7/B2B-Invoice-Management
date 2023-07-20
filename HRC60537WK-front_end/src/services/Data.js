import axios from "axios";

// export const getData = async () => {
//   let response = await axios.get("http://localhost:8080/Hrc_1930102/Fetch");
//   let data = response.data.s;
//   console.log(data);
//   data.map((s, index) => ({ ...s, id: index }));
//   return data;
// };

// export const getData = async () => {
//   let response = await axios.get("http://localhost:8080/Hrc_1930102/Fetch");
//   let data = response.data.invoiceData;
//   console.log(data);
//   data.map((invoiceData, index) => ({ ...invoiceData, id: index }));
//   return data;
// };

export const getData = async () => {
  let response = await axios.get("http://localhost:8080/Hrc_1930102/Fetch");
  console.log(response.data.invoiceData);
  // return response.data.invoiceData;
  let data = response.data.invoiceData;
  data.map((invoice, index) => ({ ...invoice, id: index }));
  return data;
};

export const GetSearchData = async (cust_number) => {
  console.log(cust_number);
  let searchResponse = await axios.get(
    "http://localhost:8080/Hrc_1930102/Search" +
      "?" +
      "cust_number=" +
      cust_number
  );
  let searchData = searchResponse.data.searchObj;
  console.log(searchData);
  searchData.map((searchObj, index) => ({ ...searchObj, id: index }));
  return searchData;
};

// http://localhost:8080/HRC/AdvancedSearch?cust_number=200020431&buisness_year=2019&doc_id=1928576325&invoice_id=1928576325
export const GetAdvancedSearchData = async (
  doc_id,
  invoice_id,
  cust_number,
  buisness_year
) => {
  let advancedSearchResponse = await axios.get(
    "http://localhost:8080/Hrc_1930102/AdvancedSearch" +
      "?" +
      "cust_number=" +
      cust_number +
      "&buisness_year=" +
      buisness_year +
      "&doc_id=" +
      doc_id +
      "&invoice_id=" +
      invoice_id
  );
  let advanceSearchData = advancedSearchResponse.data.advanceSearchObj;
  console.log(advanceSearchData);
  advanceSearchData.map((advanceSearchObj, index) => ({
    ...advanceSearchObj,
    id: index,
  }));
  return advanceSearchData;
};
