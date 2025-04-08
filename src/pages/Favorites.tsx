import { useEffect } from "react"
import { fetchProductsDeleteFromFavorites, fetchProductsFavorites, selectProductsFavorites } from "../store/products.slice"
import { useDispatch, useSelector } from "../store/store"

export const Favoriites: React.FC = () => {
    const dispatch = useDispatch()
    const productsFavorites = useSelector(selectProductsFavorites)


    useEffect(() => {
        dispatch(fetchProductsFavorites())
    }, [fetchProductsFavorites])

    const onClickDeleteFromFavorites = (id: string) => {
        dispatch(fetchProductsDeleteFromFavorites({id: id}))
    }

    return (
        <div className="content">
            <h2>Избранное</h2>
            <div className="cards">
            {productsFavorites.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image[0]} width={300} height={400} alt="card"/>
                    <h3 style={{height: '40px'}}>{product.title}</h3>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>{product.price}₽</span>
                    <img onClick={() => onClickDeleteFromFavorites(product.id)} style={{cursor: 'pointer'}} src="/img/favorited.png" width={30} height={30} alt="favorited"/>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}