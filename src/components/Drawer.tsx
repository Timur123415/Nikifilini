import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../store/store";
import { fetchProductsAddToOrders, fetchProductsCart, fetchProductsDeleteFromCart, selectProductsCart } from "../store/products.slice";

type IDrawer = {
    setIsOpen: (open: boolean) => void;
}


export const Drawer: React.FC<IDrawer> = ({setIsOpen}) => {
    const [status, setStatus] = useState(false)

    const dispatch = useDispatch()
    const productsCart = useSelector(selectProductsCart)


     const onClickDeleteFromCart = (id: string) => {
        dispatch(fetchProductsDeleteFromCart({id: id}))
     }


    useEffect(() => {
        dispatch(fetchProductsCart())
    }, [fetchProductsCart])

    useEffect(() => {
        function closeByEsc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        }
        document.addEventListener('keyup', closeByEsc)
        return () => {
            document.removeEventListener('keyup', closeByEsc)
        }
    }, [])


    const onClickMakeOrder = () => {
        dispatch(fetchProductsAddToOrders({obj: productsCart}))
        productsCart.forEach((product) => {
            dispatch(fetchProductsDeleteFromCart({id: product.id}))
        })
        setStatus(true)
    }
    return (
        <div className="overlay">
            <div className="drawer">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Корзина</h3>
                    <img onClick={() => setIsOpen(false)} style={{cursor: 'pointer', alignSelf: 'center'}} src="/img/cross.png" width={30} height={30} alt="close"/>
                </div>
                {status ? <div style={{marginTop: '200px', fontSize: '20px', textAlign: 'center'}}>Ваш заказ находится в сборке.<br/>Скоро вам позвонит оператор</div> : <>{!productsCart.length ? <div style={{marginTop: '200px', fontSize: '20px', textAlign: 'center'}}>Сейчас в вашей корзине пусто.<br/> Добавтье товары чтобы сделать заказ</div> : <><div className="carts">
                    {productsCart.map((product) => (
                        <div className="cart" key={product.id}>
                            <img src={product.image[0]} width={200} height={300} alt="cart"/>
                            <h3>{product.title}</h3>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span>{product.price}₽</span>
                            <img onClick={() => onClickDeleteFromCart(product.id)} style={{cursor: 'pointer'}} src="/img/delete.png" width={30} height={30} alt="delete"/>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="order-box">
                    <div onClick={onClickMakeOrder} className="order-btn">Оформить</div>
                    <p>Итого..........................................{productsCart.reduce((acc,obj) => acc + obj.price, 0)}₽</p>
                </div>
                </>}</>}
            </div>
        </div>
    )
}