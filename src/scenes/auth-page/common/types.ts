export namespace AuthPageTypes {
    
    export interface IRegisterSchema { 
        firstName:string;
        lastName:string;
        email:string;
        password:string;
        location:string;
        occupations:string;
        picture:string;
    }

    export interface IRegisterForm {
        firstName:string;
        lastName:string;
        email:string;
        password:string;
        location:string;
        occupations:string;
        picture:null | File ;
    }

    export interface ILoginSchema { 
        email:string;
        password:string;
    }

    export interface ILoginForm {
        email:string;
        password:string;
    }

}


