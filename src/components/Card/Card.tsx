import S from "./Card.module.scss";

const Card = () => {
    return (
        <div className={S.wrap}>
            <figure className={S.image}></figure>
            <h4 className={S.title}></h4>
            <p className={S.text}></p>
        </div>
    );
};

export default Card;
