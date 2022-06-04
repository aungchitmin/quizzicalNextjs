import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./reducers/answerExecuter"

export const store = configureStore(
    {
        reducer: {
            counterReducer
        }
    }
)