import { useState } from "react"
import { ICard } from "../types/data"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router"


export const Card: React.FC<ICard> = ({id, image, title, price, onAdd, description, onFav}) => {
    const [currentImage, setCurrentImage] = useState(0)
    const [isFav, setIsFav] = useState(false)
    const navigate = useNavigate()

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const {clientX, currentTarget} = e;
        const {width, left} = currentTarget.getBoundingClientRect()
        const offsetX = clientX - left
        const persentage = offsetX / width

        const newIndex = Math.floor(persentage * image.length)
        setCurrentImage(Math.min(newIndex, image.length - 1))
    }

    const onClickAdd = () => {
        onAdd({id, image, title, description, price, onAdd, onFav})
    }

    const onClickFav = () => {
        onFav({id, image, title, description, price, onAdd, onFav})
        setIsFav(true)
    }

    const handleClickLink = () => {
        navigate(`/card/${id}`)
    }

    return (
        <div className="card" key={id}>
            <img onClick={handleClickLink} onMouseMove={handleMouseMove} src={image[currentImage]} width={300} height={400} alt="card"/>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                {image.map((_,index) => (
                    <div style={{
                        width: '150px',
                        height: '5px',
                        backgroundColor: currentImage === index ? "black" : "gray"
                    }}>
                    </div>
                ))}
            </div>
            <h3 style={{height: '50px'}}>{title}</h3>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{price}₽</span>
            <div style={{display: 'flex', gap: '20px'}}>
            <Button onClickAdd={onClickAdd}/>
            {isFav ? <img src="/img/favorited.png" width={30} height={30} alt="favorited" style={{alignSelf: 'center'}}/> : <img onClick={onClickFav} style={{cursor: "pointer", alignSelf: 'center'}} src="/img/favorite.png" width={30} height={30} alt="favorite"/>}
            </div>
            </div>
        </div>
    )
}