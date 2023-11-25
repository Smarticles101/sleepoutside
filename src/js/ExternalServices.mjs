const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json(); // Convert response to JSON first
  if (res.ok) {
    return jsonResponse;
  } else {
    // Throw a custom error object with more details
    throw { name: "servicesError", message: jsonResponse };
  }
}


export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `${baseURL}products/search/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    return fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
}
