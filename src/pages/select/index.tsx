import S from "./select.module.scss";

const Select = () => {
    return (
        <div className={S.wrap}>
            <header className={S.header}>
                <h2 className={S.title}>메인 타이틀</h2>
                <p className={S.sub_title}>서브 타이틀</p>
            </header>
            <main className={S.main}>
                <div className={S.list}></div>
                <div className={S.message}>메세지</div>
            </main>
            <footer className={S.footer}>
                <button className={S.button}>버튼</button>
            </footer>
        </div>
    );
};

export default Select;
