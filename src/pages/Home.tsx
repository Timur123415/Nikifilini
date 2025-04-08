import { Card } from "../components/Card"
import { ICard } from "../types/data"

type IHome = {
    products: ICard[],
    value: string,
    onClickAddToCart: (obj: ICard) => void;
    onClickAddToFavorites: (obj: ICard) => void;
}

export const Home: React.FC<IHome> = ({products, value, onClickAddToCart, onClickAddToFavorites}) => {
    return (
     <div className="content">
        <h2>Товары</h2>
        <div className="cards">
        {products.filter((product) => product.title.toLowerCase().includes(value.toLowerCase())).map((product) => <Card onFav={onClickAddToFavorites} onAdd={onClickAddToCart} id={product.id} image={product.image} title={product.title} description="" price={product.price}/>)}
        </div>
    </div>
    )
}