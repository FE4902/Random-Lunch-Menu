import cns from "classnames";
import { forwardRef, useState } from "react";
import { DataType } from '../../types/types';

import S from "./Card.module.scss";

interface CardProps extends DataType{
    onClick: () => void;
};

const Card = forwardRef<HTMLButtonElement, CardProps>((props, ref): JSX.Element => {
    const { symbol, store, menu, onClick } = props;
    const [isActive, setIsActive] = useState(false);

    return (
        <button
            className={cns(S.wrap, isActive && S.active)}
            onClick={() => {
                setIsActive(!isActive);
                onClick();
            }}
            ref={ref}
        >
            <div className={cns(S.symbol, "tossface")}>{symbol}</div>
            <h4 className={S.store}>{store}</h4>
            <p className={S.menu}>{menu}</p>
        </button>
    );
});

export default Card;
