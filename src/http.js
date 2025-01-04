export async function fetchMeals() {
  const response = await fetch("http://localhost:3001/meals");

  const resData = response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch to server.");
  }

  return resData;
}

export async function fetchOrders(data) {
  const response = await fetch("http://localhost:3001/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  const resData = response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong when submit the form!"
    );
  }

  return resData;
}
