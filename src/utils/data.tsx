import axios from "axios";
export const fetchCompanyData = async () => {
  try {
    const response = await axios.get(
      "https://fakerapi.it/api/v1/companies?_quantity=50"
    );
    return response?.data?.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
