import S from "./Card.module.scss";

type CardType = {
    symbol: string;
    store: string;
    menu: string;
};

const Card = (props: CardType): JSX.Element => {
    const { symbol, store, menu } = props;

    return (
        <div className={S.wrap}>
            <div className={S.symbol}>{symbol}</div>
            <h4 className={S.store}>{store}</h4>
            <p className={S.menu}>{menu}</p>
        </div>
    );
};

export default Card;
