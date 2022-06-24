export const getDoctorsByPincode = async (pincode) => {
  try {
    const response = await fetch(
      `http://localhost:4001/api/get-doctors/?pincode=${pincode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result?.doctors || [];
  } catch (error) {
    console.log(error);
  }
};
