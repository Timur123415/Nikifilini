import ReactDOM from "react-dom/client"
import React, { useReducer, useState } from "react"
import { App } from "./App"
import "./index.scss"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { BrowserRouter } from "react-router"
import { GlobalProvider } from "./context/GlobalContext"


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)





root.render(
    <React.StrictMode>
        <BrowserRouter>
        <Provider store={store}>
        <GlobalProvider>
        <App/>
        </GlobalProvider>
        </Provider>
        </BrowserRouter>
    </React.StrictMode>
)