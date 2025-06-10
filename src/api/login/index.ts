import request from "@/utils/http/index";
import type { LoginDto } from './types/login.dto'
import { type ResponsePromise } from "../../types/response";
export const login = (data: LoginDto): ResponsePromise => {
    return request({
        url: "/user/login",
        data,
        isToken: false,
        method: "post",
    });
};

export const getCaptcha = (): ResponsePromise => {
    return request({
        url: "/user/captcha",
        method: "get",
        isToken: false,
    });
};
export const register = (data: LoginDto): ResponsePromise => {
    return request({
        url: "/user/register",
        data,
        method: "post",
        isToken: false,
    });
}