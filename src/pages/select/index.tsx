import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "components/Card/Card";
import Button from "components/Button/Button";
import { DataType } from '../../types/types'
import datas from "db/db.json";

import S from "./select.module.scss";

const Select = () => {
    const navigate = useNavigate();
    const [selectArray, setSelectArray] = useState<DataType[]>([]);
    const reversedData = selectArray?.slice(0, 3).reverse();

    const renderList = () => {
        const result = [];

        for (let i = 0; i < 3; i++){
            result.push (
                <li className={S.select_item} key={i}>
                    {reversedData[i] ? reversedData[i].symbol : <span>?</span>}
                    {i === 0 && selectArray.length > 3 && <span className={S.select__overlay}>+{selectArray.length - 3}</span>}
                </li>
            )
        }

        return <ul className={S.select_list}>{result.reverse()}</ul>;
    }

    const handleSubmit = () => {
        if (selectArray.length >= 3) {
            navigate("/rolling", {state: {select: selectArray, winning: Math.floor(Math.random() * selectArray.length)}});
        }
    }

    const handleCardClick = (data: DataType) => {
        const newSelectArray = selectArray.includes(data) 
            ? selectArray.filter((value) => value !== data)
            : [...selectArray, data];
        
        setSelectArray(newSelectArray);
    }

    return (
        <div className={S.wrap}>
            <header className={S.header}>
                <h2 className={S.title}>
                    오늘의 점심 <br/>
                    어떤 메뉴를 원하세요?
                </h2>
                <p className={S.sub_title}>
                    지금 가장 먹고 싶은 메뉴들을 선택해주세요. <br/>
                    그 중 하나를 추천해드릴게요.
                </p>
            </header>
            <main className={S.body}>
                <div className={S.list}>
                    {datas.map((data) => {
                        return (
                            <Card
                                key={data.id}
                                symbol={data.symbol}
                                store={data.store}
                                menu={data.menu}
                                onClick={() => {handleCardClick(data)}}
                            ></Card>
                        );
                    })}
                </div>
                <div className={S.message}>선택한 메뉴는 앞으로 더욱 맞춤화된 서비스를 위해 활용됩니다.</div>
            </main>
            <footer className={S.footer}>
                <div className={S.footer__container}>
                    <Button leftSlot={renderList()} disabled={selectArray.length < 3} fullWidth={true} onClick={handleSubmit}>
                        {selectArray.length < 3 ? "3가지 이상 선택해주세요." : "선택 완료!"}
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default Select;

