export default class User{

     UserName: String ;
     Password: String;
     Email : String;
     ClassLevel :Number;
     
     constructor(data: any) {
        this.UserName = data['username'];
        this.Password = data['password'];
        this.Email = data['email'];
        this.ClassLevel = data['classLevel'];

    }


    clone() {
        return new User({ UserName: this.UserName, Password: this.Password, Email: this.Email, ClassLevel :this.ClassLevel});
    }

}