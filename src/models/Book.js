export default class Book {
    id: string;
    author: string;
    ISBN: string;
    urlImage: string;
    title: string;
    description: string;
    edition: string;
    type: string;
    language: string;
    niveau: int;

    constructor(
        id:String,
        title: string,
        description: string,
        urlImage: string,
        language:string,
        level:String,

    ) {
        this.id=id;
        this.title = title;
        this.urlImage = urlImage;
        this.description = description;
        this.language=language;
        this.level =level;
    }
}