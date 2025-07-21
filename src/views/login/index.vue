<template>
    <div class="h-screen w-screen bg-gradient-to-b from-blue-400 to-transparent">
        <div class="w-full h-full flex justify-center items-center">
            <main class=" h-2/3  bg-white rounded-sm flex w-2/4 items-center px-[40px] py-[40px]">
                <div
                    class="left  w-[45%] h-full flex flex-col justify-center items-center border-r border-gray-200 px-[20px]">
                    <div class="text-[20px]">打开微信app</div>
                    <div>右上角扫一扫</div>
                    <div class="w-[150px] h-[150px] my-[20px] border border-gray-100"><img
                            src="@/assets/images/login.png" alt=""></div>
                    <div class="font-bold">扫码登录</div>
                </div>
                <div class="right w-[55%] h-full px-[20px] pl-[100px] flex flex-col justify-center ">
                    <h1 class="font-bold text-[18px] mb-[20px]">密码登录</h1>
                    <div>
                        <el-form :model="loginForm" :rules="loginRules" ref="formRef" @submit.prevent>
                            <el-form-item prop='username'>
                                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item class="mb-[20px] flex" prop="captcha">
                                <el-input v-model="loginForm.captcha" placeholder="验证码"
                                    class="pr-[10px] flex-2"></el-input>
                                <div class="flex-1" @click="handerGetCaptcha" v-html="codeUrl"></div>
                            </el-form-item>
                            <el-form-item>
                                <el-checkbox value="Online activities" name="type">
                                    记住密码
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="handelLogin" class="w-full" type="primary">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-divider class="">其他登录方式</el-divider>
                    <div class="flex justify-between px-[20%]">
                        <!--wx-->
                        <svg class="Zi Zi--WeChat Login-socialIcon" fill="#60c84d" viewBox="0 0 24 24" width="40"
                            height="40">
                            <path
                                d="M2.224 21.667s4.24-1.825 4.788-2.056C15.029 23.141 22 17.714 22 11.898 22 6.984 17.523 3 12 3S2 6.984 2 11.898c0 1.86.64 3.585 1.737 5.013-.274.833-1.513 4.756-1.513 4.756zm5.943-9.707c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272zm7.583 0c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272z"
                                fill-rule="evenodd"></path>
                        </svg>
                        <!--qq-->
                        <svg class="Zi Zi--QQ Login-socialIcon" fill="#50c8fd" viewBox="0 0 24 24" width="40"
                            height="40">
                            <path
                                d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"
                                fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { getCaptcha, login } from '@/api/login'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import type { LoginDto } from '@/api/login/types/login.dto'

const router = useRouter()

const loginForm = reactive<LoginDto>({
    username: '',
    password: '',
    captcha: '',
    id: ''
})

const loginRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
})

const formRef = ref<FormInstance>()


//获取验证码
const codeUrl = ref<string>()
const handerGetCaptcha = async () => {
    const { code, data } = await getCaptcha()
    if (200 !== code) return ElMessage.error('获取验证码失败')
    codeUrl.value = data.img
    loginForm.id = data.id

}
// 登录
const handelLogin = async () => {
    try {
        const isValid = await formRef.value?.validate()
        if (!isValid) {
            ElMessage.error('请输入正确的信息')
            return
        }

        const { code, data } = await login(loginForm)
        if (200 !== code) {
            ElMessage.error('登录失败')
            return
        }
        localStorage.setItem('token', data)

        if (isRemember.value) {
            rememberPassword(loginForm)
        } else {
            localStorage.removeItem('accent')
        }

        router.push('/')
    } finally {
        handerGetCaptcha()
    }
}

const isRemember = ref(false)
//记住密码
const rememberPassword = (loginForm: LoginDto) => {
    localStorage.setItem('accent', JSON.stringify(loginForm))
}
//获取记住的账号密码
const getRememberPassword = () => {
    const accent = localStorage.getItem('accent')
    if (accent) {
        const { username, password } = JSON.parse(accent)
        loginForm.username = username
        loginForm.password = password
        isRemember.value = true
    }
}

onMounted(() => {
    getRememberPassword()
    if (localStorage.getItem('token')) return router.push('/')
    handerGetCaptcha()
})

</script>

<style></style>