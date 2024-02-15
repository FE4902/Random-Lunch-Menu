import { useState } from "react";
import cns from "classnames";

import S from "./Card.module.scss";
import { DataType } from "types/types";

interface CardProps extends DataType {
    onClick: () => void;
}

const Card = (props: CardProps): JSX.Element => {
    const { symbol, store, menu, onClick } = props;
    const [isActive, setIsActive] = useState(false);

    return (
        <button
            className={cns(S.wrap, isActive && S.active)}
            onClick={() => {
                setIsActive(!isActive);
                onClick();
            }}
        >
            <div className={cns(S.symbol, "tossface")}>{symbol}</div>
            <h4 className={S.store}>{store}</h4>
            <p className={S.menu}>{menu}</p>
        </button>
    );
};

export default Card;
