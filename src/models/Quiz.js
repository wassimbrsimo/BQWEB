import stringAr from "../res/value/res_string/string-ar"

export default class Quiz {

    
        id_quiz: String;
        question: String;
        answers: Array<>;
       question_order:String;
        quiz_id: String;
       quiz_title: String;
        quiz_level: String;
        quiz_img: String;
        session_id: String;
        nbr_sec_per_question: String;
        nbr_questions_per_quiz: String;
        answers_status_table: Array<>;
        status: String;
        message:String
    constructor() {

    }

}