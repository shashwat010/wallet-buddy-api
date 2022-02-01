export const validateEmail = (email:string):boolean => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const validatePhoneNumber = (str:string) =>{
    const re = /^[6-9]\d{9}$/gi;
    return re.test(str);
}
