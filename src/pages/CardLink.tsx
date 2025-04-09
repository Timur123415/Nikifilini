import { useLocation, useNavigate, useParams } from "react-router"
import { useSelector } from "../store/store"
import { selectProducts } from "../store/products.slice"
import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"


export const CardLink: React.FC = () => {
    const {id} = useParams<{id: string}>()
    const products = useSelector(selectProducts)
    const productsItems = products.find((product) => Number(product.id) === Number(id))
    //const [selectedIndex, setSelectedIndex] = useState(0)
    const {selectedIndex, setSelectedIndex} = useGlobalContext()
    const navigate = useNavigate()
    const location = useLocation()

    const handleClickImage = (id: string) => {
      navigate(`/card/${id}/img`, {state: {background: location}})
    }



    if (productsItems?.image.length === 0) {
        return <div>Нет фотографий</div>
    }

    return (
        <div className="link">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ flex: 2, marginRight: '15px' }}>
         <img
            onClick={() => handleClickImage(String(productsItems?.id))}
            src={productsItems?.image[selectedIndex]}
            alt='photo'
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          />
        </div>
        <div
          style={{
            flex: 1,
            maxHeight: '500px', // Задаём фиксированную высоту, чтобы появилась прокрутка
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {productsItems?.image.map((imgSrc, index) => (
            <img
              key={productsItems.id}
              src={imgSrc}
              alt="photo"
              onClick={() => setSelectedIndex(index)}
              style={{
                cursor: 'pointer',
                border:
                  selectedIndex === index ? '3px solid blue' : '1px solid #ccc',
                borderRadius: 4,
                width: '100%', // При необходимости можно задать фиксированную ширину
                objectFit: 'cover',
              }}
            />
          ))}
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3>{productsItems?.title}</h3>
            <p>{productsItems?.description}</p>
            <span>{productsItems?.price}₽</span>
            </div>
        </div>
    )
}