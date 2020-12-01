import { instance } from '../../../s1-main/m3-dal/instance'

export const packsAPI = {
   getPacks: async (
      searchName: string,
      min?: number,
      max?: number,
      page?: number,
      pageCount?: number,
      sortProducts?: string,
      userID?: string,
   ) => {
      const response = await instance.get<ResPacksType>(
         `cards/pack?` +
            (searchName.length > 0 ? `packName=${searchName}&` : '') +
            (max ? `min=${min}&max=${max}&` : '') +
            (page ? `page=${page}&pageCount=${pageCount}&` : '') +
            (sortProducts ? `sortPacks=${sortProducts}&` : '') +
            (userID ? `user_id=${userID}&` : ''),
      )
      return response.data
   },
   createPack: async (data: CreatePackType) => {
      await instance.post('cards/pack', { cardsPack: data })
   },
   deletePack: async (pack_id: string) => {
      await instance.delete(`cards/pack?id=${pack_id}`)
   },
   updatePack: async (data: UpdatePackType) => {
      await instance.put('cards/pack', { cardsPack: data })
   },
}

export type UpdatePackType = {
   _id: string
   name?: string
}

export type CreatePackType = {
   name: string
   path: string
   grade?: number
   shots?: number
   rating?: number
   deckCover?: string
   private: boolean
   type: string
}
export type ApiPacksType = {
   _id: string
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
