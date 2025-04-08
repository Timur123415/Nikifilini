import { useEffect } from "react"
import { fetchProductsOrders, selectProductsOrders } from "../store/products.slice"
import { useDispatch, useSelector } from "../store/store"

export const Orders: React.FC = () => {
    const dispatch = useDispatch()
    const productsOrders = useSelector(selectProductsOrders)

    useEffect(() => {
        dispatch(fetchProductsOrders())
    }, [fetchProductsOrders])

    return (
        <div className="content">
            <h2>История заказов</h2>
            <div className="orders">
                {productsOrders.map((obj) => (
                    <div key={obj.id} className="order">
                      <h3>Заказ #{obj.id}</h3>
                      {obj.items.map((item) => (
                        <div className="card-order" key={item.id}>
                            <img src={item.image[0]} width={150} height={200} alt="card"/>
                            <h3 style={{height: '100px'}}>{item.title}</h3>
                            <span>{item.price}₽</span>
                        </div>
                      ))}
                    </div>
                ))}
            </div>
        </div>
    )
}