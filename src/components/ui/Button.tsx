import { useState } from "react"


type IButton = {
    onClickAdd: () => void;
}


export const Button: React.FC<IButton> = ({onClickAdd}) => {
    const [status, setStatus] = useState('buy')

    const onClickBuy = () => {
        if (status === 'buy') {
            setStatus('loading')
        }
        setTimeout(() => {
            setStatus('checkout')
        }, 1200)
    }
    return (
        <>
        {status === 'loading' ? (<div className="add"><span className="spin"></span></div>) : status === 'buy' ? (<div onClick={onClickBuy}><div onClick={onClickAdd} className="add">В корзину</div></div>) : (<div className="added">В корзине</div>)}
        </>
    )
}