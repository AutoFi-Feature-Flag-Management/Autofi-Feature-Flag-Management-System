import { JSON } from "mysql/lib/protocol/constants/types";

async function handler(req) {
  try {
    const response = await fetch(req.url, {
      method: req.method ? req.method : "",
      body: req.body ? JSON.stringify(req.body) : null,
      headers: req.headers ? req.headers : {},
    });
    if (!response.ok) {
      throw new Error("Unsuccesful Execution!");
    }
    const data = await response.json();
    return { status: true, statusText: "Successful", data };
  } catch (err) {
    return { status: false, statusText: err.message };
  }
}
// let response = await fetch("https://swapi.dev/api/people/1");
// const data = await response.json();
// return response;
// try {
//   const response = await fetch("https://swapi.dev/api/people/1");
//   if (!response.ok) {
//     console.log("error");
//     throw new Error("Request failed please review console log.");
//   }
//   console.log("hi");
//   console.log(response);

//   // return new Promise({ status: 201, value: response });
// } catch (err) {
//   // return new Promise({ status: 404 });
// }

export default handler;
// console.log(response);
// .then((response) => response.json())
// .then((data) => {
//   return data;
// });
