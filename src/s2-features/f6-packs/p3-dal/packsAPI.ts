import { instance } from '../../../s1-main/m3-dal/instance'

export const packsAPI = {
   getPacks: async () => {
      const response = await instance.get<ResPacksType>('cards/pack')
      return response.data
   },
}

export type ApiPacksType = {
   _id?: string
   user_id?: string
   user_name?: string
   private?: boolean
   name: string
   path?: string
   grade?: number
   shots?: number
   cardsCount: number
   type?: string
   rating?: number
   created?: string
   updated: string
   more_id?: string
   __v?: number
   deckCover: string
}
type ResPacksType = {
   cardPacks: Array<ApiPacksType>
   page: number
   pageCount: number
   cardPacksTotalCount: number
   minCardsCount: number
   maxCardsCount: number
   token: string
   tokenDeathTime: number
}
