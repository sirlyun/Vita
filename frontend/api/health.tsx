import { localAxios } from "@/util/axios";

async function getFood(formData: FormData) {
  return localAxios
    .post("/health/food", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

async function daily(
  smoke: { type: string; quantity: string } | null,
  drink: { type: string; quantity: string } | null
) {
  const requestBody = {
    smoke,
    drink,
  };
  return localAxios
    .post("/health/daily", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export { getFood, daily };
