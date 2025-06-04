import request from "@/utils/http/index";
import { type LoginVo } from "../types/login.vo";
import { type ResponsePromise } from "../types/response";
export const login = (data: LoginVo): ResponsePromise => {
    return request({
        url: "/api/user/login",
        data,
        isToken: false,
        method: "post",
    });
};

export const getCaptcha = (): ResponsePromise => {
    return request({
        url: "/api/user/captcha",
        method: "get",
        isToken: false,
    });
};
export const register = (data: LoginVo): ResponsePromise => {
    return request({
        url: "/api/user/register",
        data,
        method: "post",
        isToken: false,
    });
}