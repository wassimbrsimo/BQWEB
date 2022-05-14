import HTTPMethods from '../constants/HTTPMethods';

import * as QuizzitoConstant from '../constants/QuizzitoConstant';

import * as Request from '../constants/RequestInterceptor';

import Quiz from '../models/Quiz';
import * as axios from 'axios';


export const getReaderProfile =  async() => {
    var formData = new FormData();
    let url = QuizzitoConstant.API_URL + QuizzitoConstant.PRE_END_POINT
        + QuizzitoConstant.IS_MAIN_NEW + "/quizzito/reader/get_reader_profile_for_animation";

    let header =  await Request.getHeader(HTTPMethods.GET);
    return   fetch(url, header)
        .then(response => Request.processResponse(response))
        .then(responseData => {
            return ({ status: "succes", result: (responseData.responseJson) });
        })
        .catch(error => {
          return ({ status: "faild", result: (error) });;
        });
}

export const getReaderResults =async () => {
    var formData = new FormData();

    let url = QuizzitoConstant.API_URL + QuizzitoConstant.PRE_END_POINT
        + QuizzitoConstant.IS_MAIN_NEW + "/quizzito/reader/get_results";

    let header = await Request.getHeader(HTTPMethods.GET);

    return  fetch(url, header)
        .then(response => Request.processResponse(response))
        .then(responseData => {
            return ({ status: "succes", result: (responseData.responseJson) });
        })
        .catch(error => {
            return ({ status: "faild", result: (error) });;
        });
}

export const updateProfilChild =async (f_name,l_name,phone,gender) => {
    var formData = new FormData();

    let url = QuizzitoConstant.API_URL + QuizzitoConstant.PRE_END_POINT
        + QuizzitoConstant.IS_MAIN_NEW + "/quizzito/reader/add_battle_reader_infos";
        var formData = new FormData();
        formData.append('firstname', f_name);
        formData.append('lastname', l_name);
        formData.append('parent_phone', phone);
        formData.append('gender', gender);

    let header = await Request.getHeader(HTTPMethods.POST, formData);

    return  fetch(url, header)
        .then(response => Request.processResponse(response))
        .then(responseData => {
            return ({ status: "succes", result: (responseData.responseJson) });
        })
        .catch(error => {
            
            return ({ status: "faild", result: (error) });;
        });
}

