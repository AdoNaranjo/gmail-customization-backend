/* eslint-disable array-bracket-spacing */

import axios from "axios";
import querystring from "querystring";
import { GOOGLE_CLIENT_ID, APP_URI, GOOGLE_CLIENT_SECRET } from "root/config";
import { accountModel } from "root/providers";
import { AuthQueryResultRequest } from "root/requests/auth";
import { AccountProps } from "root/models";

const redirectURI = "auth/google/success";

export const getGoogleAuthURL = (): string => {
  const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${APP_URI}/${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/contacts.readonly",
    ].join(" "),
  };

  return `${rootURL}?${querystring.stringify(options)}`;
};

export const saveAuthCode = async (queries: AuthQueryResultRequest): Promise<AccountProps> => {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code: queries.code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: `${APP_URI}/${redirectURI}`,
    grant_type: "authorization_code",
  };

  try {
    const { data: tokenData } = await axios.post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(" ===== ", tokenData);

    const { data: userData } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenData.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.id_token}`,
        },
      }
    );

    let account = await accountModel().findOne({ email: userData.email });
    if (!account) {
      account = await accountModel().create({
        email: userData.email,
        refreshToken: tokenData.refresh_token,
        code: queries.code,
      });
      await account.save();
    } else {
      account = await accountModel().findOneAndUpdate(
        {
          email: account.email,
        },
        {
          $set: {
            email: userData.email,
            refreshToken: tokenData.refresh_token,
            code: queries.code,
          },
        },
        { new: true }
      );
    }
    return account;
  } catch (error) {
    console.error("Failed to fetch auth tokens");
    throw new Error(error);
  }
};
