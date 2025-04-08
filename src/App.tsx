import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { Drawer } from "./components/Drawer"
import { useDispatch, useSelector } from "./store/store"
import { fetchProducts, fetchProductsAddToCart, fetchProductsAddToFavorites, selectError, selectLoading, selectProducts } from "./store/products.slice"
import { Card } from "./components/Card"
import { ICard } from "./types/data"
import { Route, Routes } from "react-router"
import { Home } from "./pages/Home"
import { Favoriites } from "./pages/Favorites"
import { Orders } from "./pages/Orders"
import { NotFound } from "./pages/NotFound"
import { CardLink } from "./pages/CardLink"


export const App: React.FC = () => {
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const products = useSelector(selectProducts)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)


    useEffect(() => {
        dispatch(fetchProducts())
    }, [fetchProducts])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto"


        return () => {
            document.body.style.overflow = "auto"
        }
    })

    const onClickAddToCart = (obj: ICard) => {
        dispatch(fetchProductsAddToCart({obj: obj}))
    }

    const onClickAddToFavorites = (obj: ICard) => {
        dispatch(fetchProductsAddToFavorites({obj: obj}))
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="wrapper">
            {isOpen ? <Drawer setIsOpen={setIsOpen}/> : null}
            <Header setIsOpen={setIsOpen} value={value} setValue={setValue}/>
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/" element={<Home onClickAddToFavorites={onClickAddToFavorites} products={products} value={value} onClickAddToCart={onClickAddToCart}/>}/>
                <Route path="/favorites" element={<Favoriites/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/card/:id" element={<CardLink/>}/>
            </Routes>
        </div>
    )
}