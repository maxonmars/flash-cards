import {InferActionsType} from "../../../s1-main/m2-bll/actions";
import {Reducer} from "redux";
import {AppThunk} from "../../../s1-main/m3-dal/thunks";

type InitialStateType = typeof initialState

type ActionTypes = InferActionsType<typeof actions>

const initialState = {}

export const loginReducer: Reducer<InitialStateType, ActionTypes> = (state, action): InitialStateType => {
    switch (action.type) {
        case "SOME2":
            return {...state}
        default:
            return {...state}
    }
}

const actions = {
    someAC: () => ({type: "SOME2"})
}

const thunks = {
    someTC: (): AppThunk => dispatch => {

    }
}