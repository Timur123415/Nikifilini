import { Link } from "react-router";

type IHeader = {
    value: string,
    setValue: (val: string) => void;
    setIsOpen: (open: boolean) => void;
}


export const Header: React.FC<IHeader> = ({value, setValue, setIsOpen}) => {
    return (
        <div className="header">
                <h1>NIKIFILINI</h1>
                <div className="search">
                    <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Найти товар" className="input-search"/>
                    {value && <img onClick={() => setValue('')} style={{position: 'absolute', marginTop: '10px', marginLeft: '370px', cursor: 'pointer'}} src="/img/cross.png" width={20} height={20} alt="delete"/>}
                    <img style={{alignSelf: 'center'}} src="/img/search.png" width={30} height={30} alt="search"/>
                </div>
                <ul className="header__list">
                   <Link style={{textDecoration: 'none', color: 'black'}} to="/"><li className="header__item">Главная</li></Link>
                   <Link style={{textDecoration: 'none', color: 'black'}} to="/orders"><li className="header__item">Мои заказы</li></Link>
                   <Link style={{textDecoration: 'none', color: 'black'}} to="/favorites"><li className="header__item">Избранное</li></Link>
                    <li onClick={() => setIsOpen(true)} className="header__item">Корзина</li>
                   <Link style={{textDecoration: 'none', color: 'black'}} to="/profile"><li className="header__item">Профиль</li></Link>
                </ul>
            </div>
    )
}