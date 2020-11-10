import {instance} from "../../../s1-main/m3-dal/instance"

export const loginAPI = {
    getAuth: () => {
        return instance.get('auth/me')
    }
}