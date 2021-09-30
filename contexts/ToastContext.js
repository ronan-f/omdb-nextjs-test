import { useContext, createContext, useReducer } from "react"
import ToastList from "../components/Toast"

export const ToastContext = createContext()

const initialState = []

export const ADD = "ADD"
export const REMOVE = "REMOVE"
export const REMOVE_ALL = "REMOVE_ALL"

export const toastReducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return handleAdd(
                state,
                action.payload.content,
                action.payload.severity
            )

        case REMOVE:
            return handleRemove(state, action.payload.id)

        case REMOVE_ALL:
            return initialState

        default:
            return state
    }
}

const handleAdd = (state, content, severity) => {
    return [...state, { id: +new Date(), content, severity }]
}

const handleRemove = (state, id) => {
    return state.filter((t) => t.id !== id)
}

export const ToastProvider = (props) => {
    const [toastList, toastDispatch] = useReducer(toastReducer, initialState)
    const toastData = { toastList, toastDispatch }
    return (
        <ToastContext.Provider value={toastData}>
            {props.children}
            <ToastList toastList={toastList} />
        </ToastContext.Provider>
    )
}

export const useToastContext = () => {
    return useContext(ToastContext)
}
