import { instance } from '../../../s1-main/m3-dal/instance'

export const gradesAPI = {
   updateGrade: (data: RequestGradeType) => {
      return instance.put<ResponseGradeType>('/cards/grade', data)
   },
}

export type RequestGradeType = {
   grade: number // 1..5 !!!
   card_id: string
}

export type ResponseGradeType = {
   updatedGrade: {
      _id?: string
      cardsPack_id?: string
      card_id: string
      user_id?: string
      grade: number
      shots: number
   }
}
