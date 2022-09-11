import HTTPMethods from "../constants/HTTPMethods";

import * as QuizzitoConstant from "../constants/QuizzitoConstant";

import * as Request from "../constants/RequestInterceptor";

import Message from "../models/Message";

import Book from "../models/Book";

export const listBook = async (Search) => {
  let msg = new Message();
  msg.result = [];

  // formData.append('gcm_id', 'eT6Ugc1bbH0%3AAPA91bHk6ukbeeuL2MvGObuG6NJFnmW2C9Afb8Em
  //EAfAf2RRzuh0FFLhR5HOALA3-HKmv8Usg07geujXIs7zjKcmJYjDxebsAP1Bq4swm8sOnD4GbjIOTRrKmzgP4Vl78kTF18Esb83U');
  let url =
    QuizzitoConstant.API_URL +
    QuizzitoConstant.PRE_END_POINT +
    QuizzitoConstant.IS_MAIN_NEW +
    "/quizzito/reader/get_kitab_list_for_animation?iDisplayStart=0&iDisplayLength=25&sSearch=" +
    Search +
    "&bSearchable_2=true";
  let header = await Request.getHeader(HTTPMethods.GET);
  console.log("hada ktab ", url, header);
  return fetch(url, header)
    .then((response) => Request.processResponse(response))
    .then((responseData) => {
      var books = [];
      responseData.responseJson.aaData.forEach((item) =>
        books.push(new Book(item[0], item[2], item[3], item[10], item[7], [8]))
      );
      return { result: books, message: "succes" };
    })
    .catch((error) => {
      var books = [];
      msg.result = false;
      msg.message = `${error.message}`;
      return { result: books, message: msg.message };
    });
};

export const getDetailBook = async (bookId) => {
  let msg = new Message();
  msg.result = [];

  // formData.append('gcm_id', 'eT6Ugc1bbH0%3AAPA91bHk6ukbeeuL2MvGObuG6NJFnmW2C9Afb8Em
  //EAfAf2RRzuh0FFLhR5HOALA3-HKmv8Usg07geujXIs7zjKcmJYjDxebsAP1Bq4swm8sOnD4GbjIOTRrKmzgP4Vl78kTF18Esb83U');
  let url =
    QuizzitoConstant.API_URL +
    QuizzitoConstant.PRE_END_POINT +
    QuizzitoConstant.IS_MAIN_NEW +
    "/quizzito/reader/get_kitab_for_animation?id=" +
    bookId;
  let header = await Request.getHeader(HTTPMethods.GET);
  console.log("hada ktab ", url, header);

  return fetch(url, header)
    .then((response) => Request.processResponse(response))
    .then((responseData) => {
      return { result: responseData.responseJson, status: "succes" };
    })
    .catch((error) => {
      return { status: "fail", result: error };
    });
};
