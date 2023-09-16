import cns from "classnames";
import S from "./Card.module.scss";
import { useState } from "react";

type CardType = {
    symbol: string;
    store: string;
    menu: string;
};

const Card = (props: CardType): JSX.Element => {
    const { symbol, store, menu } = props;
    const [isActive, setIsActive] = useState(false);

    return (
        <button
            className={cns(S.wrap, isActive && S.active)}
            onClick={() => setIsActive(!isActive)}
        >
            <div className={cns(S.symbol, "tossface")}>{symbol}</div>
            <h4 className={S.store}>{store}</h4>
            <p className={S.menu}>{menu}</p>
        </button>
    );
};

export default Card;
