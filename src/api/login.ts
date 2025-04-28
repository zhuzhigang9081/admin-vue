import request from "@/utils/http/index";
import { type LoginVo } from "../typs/login.vo";
export const login = (data: LoginVo) => {
    return request({
        url: "/user/login",
        data,
        isToken: false,
        method: "post",
    });
};

export const getCaptcha = () => {
    return request({
        url: "/user/captcha",
        method: "get",
        isToken: false,
    });
};
export const register = (data: LoginVo) => {
    return request({
        url: "/user/register",
        data,
        method: "post",
        isToken: false,
    });
}

