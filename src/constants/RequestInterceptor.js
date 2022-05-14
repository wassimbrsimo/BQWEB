import HTTPMethods from "../constants/HTTPMethods";

import * as Session from "../prefs/Session";
import AsyncStorage from "@react-native-async-storage/async-storage";

var header = {
  "x-lang": "fr",
  "x-type-device": "Android",
  "x-user-id": "-1",
  "x-battle-id": "-1",
  Cookie: "ci_session=",
};
export const getHttpHeader = () => {
  let httpHeader = {
    headers: header,
  };
  return httpHeader;
};

export const getHeader = async (method: string, data = {}) => {
  let userId = (await Session.getUserId()) || "-1";
  let battleid = (await Session.getBattleId()) || "-1";
  let sessionId = (await Session.getSessionId()) || "";
  header["x-user-id"] = userId;
  header["x-battle-id"] = battleid;
  header["Cookie"] = "ci_session=" + sessionId;
  let httpHeader = {
    method: HTTPMethods.POST,
    headers: header,
    // body:(data)
    /*.header("x-user-id", session.getUserId())
                .header("x-type-device", "Android")
                //.header("x-hash", hash)
                .header("x-lang", session.getLanguage())
                .header("Cookie", "ci_session=" + session.getSessionID())
                .header("x-battle-id", session.getBattleId())*/
  };
  switch (method) {
    default:
    case HTTPMethods.GET:
      httpHeader.method = HTTPMethods.GET;
      break;
    case HTTPMethods.POST:
      httpHeader.method = HTTPMethods.POST;
      httpHeader.body = data;
      break;
    case HTTPMethods.PUT:
      httpHeader.method = HTTPMethods.PUT;
      httpHeader.body = data;
      break;
    case HTTPMethods.DELETE:
      httpHeader.method = HTTPMethods.DELETE;
      break;
  }
  //alert(JSON.stringify(httpHeader));
  return httpHeader;
};

export const checkIfResponseValids = (responseStatus: number) => {
  return responseStatus == 200;
};

export const processResponse = (response: Response) => {
  //alert(JSON.stringify(response));
  if (response.status != 200)
    return {
      responseJson: "Invalid response",
      responseStatus: response.status,
    };

  return response
    .json()
    .then((json) => ({ responseJson: json, responseStatus: response.status }));
};
