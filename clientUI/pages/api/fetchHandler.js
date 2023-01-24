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

export default handler;
