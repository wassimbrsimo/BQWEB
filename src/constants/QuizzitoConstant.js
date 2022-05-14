import HTTPMethods from '../constants/HTTPMethods';
export  const API_URL_UPLOAD = TEST_MODE ? "http://test.quizzito.com/parents/uploads/img/" :
            "http://www.quizzito.com/quizzito/parents/uploads/img/";
export  const TEST_MODE   = false;

export const  API_URL  =TEST_MODE ?  "http://192.168.1.2" : "https://www.quizzito.com";

export const PRE_END_POINT  = TEST_MODE ? "/quizzito_showcase" : "";;


export const IS_MAIN_NEW = TEST_MODE ? "" : "/main";

export const getHeader = (method: string, body = {}) => {
    let httpHeader = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-app':'Animation',
            'x-lang':'en',
            'x-type-device':'Android'
        }
        /*.header("x-user-id", session.getUserId())
                .header("x-type-device", "Android")
                //.header("x-hash", hash)
                .header("x-lang", session.getLanguage())
                .header("Cookie", "ci_session=" + session.getSessionID())
                .header("x-battle-id", session.getBattleId())*/
    }
    switch(method) {
        default:
        case HTTPMethods.GET:
            httpHeader.method = HTTPMethods.GET;
            break;
        case HTTPMethods.POST:
            httpHeader.method = HTTPMethods.POST;
            httpHeader.body = body;
            break;
        case HTTPMethods.PUT:
            httpHeader.method = HTTPMethods.PUT;
            httpHeader.body = body;
            break;
        case HTTPMethods.DELETE:
            httpHeader.method = HTTPMethods.DELETE;
            break;
    }

    return httpHeader;
}