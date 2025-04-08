export interface ICard {
    id: string,
    image: string[],
    title: string,
    description: string,
    price: number,
    onAdd: (obj: ICard) => void;
    onFav: (obj: ICard) => void;
}


export interface ICards {
    id: number,
    items: ICard[]
}
