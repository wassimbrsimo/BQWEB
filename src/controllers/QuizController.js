import HTTPMethods from '../constants/HTTPMethods';

import * as QuizzitoConstant from '../constants/QuizzitoConstant';

import * as Request from '../constants/RequestInterceptor';

import Quiz from '../models/Quiz';
import * as axios from 'axios';


export const initQuiz = async(playMode, quizId, battleId) => {

    var formData = new FormData();
    formData.append('play_mode', playMode);
    formData.append('quiz_id', quizId);
    formData.append('battle_id', battleId);
   
    let url = QuizzitoConstant.API_URL + QuizzitoConstant.PRE_END_POINT + QuizzitoConstant.IS_MAIN_NEW + "/quizzito/playquiz/load_quiz_playground/";
   
    let header = await Request.getHeader(HTTPMethods.POST, formData);
    return fetch(url, header)
        .then(response => Request.processResponse(response))
        .then(responseData => {
            return ({ status: "succes", result: (responseData.responseJson) });
        })
        .catch(error => {
            return ({ status: "faild", result: (error) });;
        });


    /* let header = Request.getHeader(HTTPMethods.POST,
          JSON.stringify({
              play_mode: playMode,
              quiz_id: quizId,
              battle_id: battleId
          }));
*/
    /* return  axios({
     method: 'post',
     url: url,
     data: formData,
     config: { headers: {
         'x-lang': 'fr',
         'x-type-device': 'Android',
         'x-user-id': '7g5VYbv3voGDKmo6',
         'x-battle-id': '6ePQ1pzarNMw4Lxj'
     }}
     })
    .then(function (response) {
             alert(JSON.stringify(response));
             return ({ result: response.data ,message:"succes" });        
         })
         .catch(function (error) {
             alert(error);
             return ({ result: error ,message:"faild" });    
         });  */
}


export const nextQuestion = async(answserID, quizId) => {

    var formData = new FormData();
    formData.append('ans', answserID);
    formData.append('quiz_id', quizId);
  
    let url = QuizzitoConstant.API_URL + QuizzitoConstant.PRE_END_POINT + QuizzitoConstant.IS_MAIN_NEW + "/quizzito/playquiz/next_question2";

    let header =await Request.getHeader(HTTPMethods.POST, formData);
   
    return fetch(url, header)
        .then(response => Request.processResponse(response))
        .then(responseData => {
            return ({ status: "succes", result: (responseData.responseJson) });
        })
        .catch(error => {
            return ({ status: "faild", message: (error) });;
        });
}
