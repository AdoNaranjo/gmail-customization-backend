import axios from "axios";
import querystring from "querystring";
import { accountModel } from "root/providers";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "root/config";
import { ContactsQueryRequest } from "root/requests/api/contacts";

export const getContact = async (queries: ContactsQueryRequest) => {
  const account = await accountModel().findOne({ email: queries.email });

  const url = "https://oauth2.googleapis.com/token";
  const values = {
    refresh_token: account.refreshToken,
    grant_type: "refresh_token",
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
  };

  try {
    const { data: tokenData } = await axios.post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { data: contactsData } = await axios.get(
      `https://people.googleapis.com/v1/people/me/connections?personFields=emailAddresses&access_token=${tokenData.access_token}`
    );
    const result = (contactsData.connections ? contactsData.connections : [])
      .filter((datum: any) => datum.emailAddresses)
      .map((email: any) => {
        const values = email.emailAddresses.map((address: { value: any }) => address.value);
        return { emails: values };
      });
    return result;
  } catch (error) {
    console.error("Failed to fetch ==== ", error);
    throw new Error(error);
  }
};
