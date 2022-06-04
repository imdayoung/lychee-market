/*
cookie 받아오기 import getCookie from ~~ 후 아래와 같이 사용
ex) 
const cookie = getCookie("is_login");
if(cookie === "true"){ ~~ }
*/

export default function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? unescape(value[2]) : null;
};