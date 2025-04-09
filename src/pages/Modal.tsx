import { useNavigate, useParams } from "react-router"
import { useSelector } from "../store/store"
import { selectProducts } from "../store/products.slice"
import { useGlobalContext } from "../context/GlobalContext"



export const Modal: React.FC = () => {
    const {id} = useParams<{id: string}>()
    const products = useSelector(selectProducts)
    const productsItems = products.find((obj) => Number(obj.id) === Number(id))
    const navigate = useNavigate()
    const {selectedIndex} = useGlobalContext()

    const onClose = () => {
        navigate(-1)
    }

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup">
               <img src={productsItems?.image[selectedIndex]} width={700} height={800}/>
            </div>
        </div>
    )
}