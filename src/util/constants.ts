export const validateEmail = (email:string):boolean => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const validatePhoneNumber = (str:string) =>{
    const re = /^[6-9]\d{9}$/gi;
    return re.test(str);
}

export const COURSE_BASE_PRICE = {
    ONLINE_SOFT_SKILLS_COURSE: {
        maxDiscount: 50,
        minDiscount: 5,
        minDiscountCode: 'YTS05',
        basePriceInRupee: 5000,
        title: 'online_soft_skills_course',
    }
}
