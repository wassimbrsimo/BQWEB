import HTTPMethods from "../constants/HTTPMethods";

import * as QuizzitoConstant from "../constants/QuizzitoConstant";

import * as Request from "../constants/RequestInterceptor";

import Message from "../models/Message";

export const login = async (username, password) => {
  var formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  let url =
    QuizzitoConstant.API_URL +
    QuizzitoConstant.PRE_END_POINT +
    QuizzitoConstant.IS_MAIN_NEW +
    "/quizzito/login/app";
  let header = await Request.getHeader(HTTPMethods.POST, formData);
  return fetch(url, header)
    .then((response) => Request.processResponse(response))
    .then((responseData) => {
      return { status: "succes", result: responseData.responseJson };
    })
    .catch((error) => {
      return { status: "fail", result: error };
    });
};
export const getTest = () => {
  let msg = new Message();
  msg.result = [];
  var formData = new FormData();
  formData.append("username", "quizzito1168b0");
  formData.append("password", "quizzito88d5d");
  // formData.append('gcm_id', 'eT6Ugc1bbH0%3AAPA91bHk6ukbeeuL2MvGObuG6NJFnmW2C9Afb8Em
  //EAfAf2RRzuh0FFLhR5HOALA3-HKmv8Usg07geujXIs7zjKcmJYjDxebsAP1Bq4swm8sOnD4GbjIOTRrKmzgP4Vl78kTF18Esb83U');
  let url = "http://www.quizzito.com/main/quizzito/login/app";
  let header = Request.getHeader(HTTPMethods.POST, formData);
  // alert(JSON.stringify(header));
  return fetch(url, header)
    .then((response) => Request.processResponse(response))
    .then((responseData) => {
      // alert(JSON.stringify(responseData))
      return { status: "succes", result: responseData.responseJson };
    })
    .catch((error) => {
      return { status: "fail", result: error };
    });
};
