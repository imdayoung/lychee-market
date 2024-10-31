/*
cookie 설정 import setCookie from ~~ 후 아래와 같이 사용
ex) setCookie("is_login", true, 10);
삭제 시 exp에 -1
ex) setCookie("is_login", true, -1);
*/

export default function setCookie(name, value, exp){
    var date = new Date();
    date.setTime(date.getTime() + exp * 24* 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + date.toUTCString() + ';path=/';
}
