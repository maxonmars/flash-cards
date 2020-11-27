import { instance } from '../../../s1-main/m3-dal/instance'
// ?cardsPack_id=5eb6a2f72f849402d46c6ac7
export const cardsAPI = {
   getCards: async (cardsPack_id: string) => {
      const response = await instance.get<ResultCardsType>(`cards/card?cardsPack_id=${cardsPack_id}`)
      return response.data
   },
}

export type ApiCardsType = {
   answer: string
   question: string
   cardsPack_id?: string
   grade?: number
   rating?: number
   shots?: number
   type?: string
   user_id?: string
   created?: string
   updated: string
   __v?: number
   _id?: string
   questionImg: string
}

type ResultCardsType = {
   cards: ApiCardsType[]
   cardsTotalCount: number
   maxGrade: number
   minGrade: number
   page: number
   pageCount: number
   packUserId: string
}
