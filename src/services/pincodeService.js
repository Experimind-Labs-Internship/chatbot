import axios from "axios";

/**
 * Get city and state from an Indian PIN code
 * Uses the free Postal PIN Code API
 */
export const getLocationFromPincode = async (pincode) => {
  try {
    if (!pincode || pincode.length !== 6) {
      return null;
    }

    const { data } = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    if (
      data &&
      data[0].Status === "Success" &&
      data[0].PostOffice &&
      data[0].PostOffice.length > 0
    ) {
      const office = data[0].PostOffice[0];

      return {
        city: office.District,
        state: office.State,
      };
    }

    return null;
  } catch (error) {
    console.error("Pincode lookup failed:", error);
    return null;
  }
};