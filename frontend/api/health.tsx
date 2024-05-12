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

export { getFood };
