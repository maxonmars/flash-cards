import { instance } from '../../../s1-main/m3-dal/instance'

export const cardsAPI = {
   getCards: async (cardsPack_id: string) => {
      const response = await instance.get<ResultCardsType>(`cards/card?cardsPack_id=${cardsPack_id}`)
      return response.data
   },
   createCard: async (data: CreateCardType) => {
      await instance.post('cards/card', { card: data })
   },
   deleteCard: async (id: string) => {
      await instance.delete(`cards/card?id=${id}`)
   },
   updateCard: async (data: UpdateCardType) => {
      await instance.put('cards/card', { card: data })
   },
}

export type UpdateCardType = {
   _id: string
   question: string
   comments: string
}

export type CreateCardType = {
   cardsPack_id: string
   question: string
   answer: string
   grade: number
   shots: number
   rating: number
   answerImg: string
   questionImg: string
   questionVideo: string
   answerVideo: string
   type: string
}

export type ApiCardsType = {
   answer: string
   question: string
   cardsPack_id: string
   grade?: number
   rating?: number
   shots?: number
   type?: string
   user_id?: string
   created?: string
   updated: string
   __v?: number
   _id: string
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
