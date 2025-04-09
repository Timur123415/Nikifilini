import { createContext, ReactNode, useContext, useState } from "react"

interface GlobalContextProps {
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}


const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

interface GlobalProviderProps {
    children: ReactNode
}


export const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    return (
        <GlobalContext.Provider value={{selectedIndex, setSelectedIndex}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("error")
    }
    return context
}

