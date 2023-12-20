import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReward } from 'react-rewards';
import useAnimation from "hooks/useAnimation";
import cns from "classnames";

import S from "./rolling.module.scss";

const Rolling = () => {
    const location = useLocation();
    const selectArray = location.state.select;
    const winning = location.state.winning;

    const [sliderRef, startBlurAnimation] = useAnimation();
    const [sliderContainerRef, startRollingAnimation] = useAnimation();
    const [winningRef, startWinningAnimation] = useAnimation();
    const [winningIconRef, startWinningIconAnimation] = useAnimation();
    const { reward: confettiReward } = useReward("confettiReward", "confetti");
    
    const MAX_WHEEL_COUNT = 5; // 최대 바퀴 수
    const MIN_WHEEL_COUNT = 2; // 최소 바퀴 수
    const SLIDER_ITEM_GAP = 48;

    const extendedSelectArray = [
        ...selectArray.slice(-1),
        ...selectArray,
        ...selectArray.slice(0, 2)
    ];

    const slideRolling = (length: number, number: number) => {
        const rolling = [{ offset: 0, transform: 'translate3d(0, 0, 0)'}];
        const random = Math.floor(Math.random() * (MAX_WHEEL_COUNT - 1)) + MIN_WHEEL_COUNT;

        for (let i = 1; i < random; i++){
            rolling.push(
                { offset: 1 / random * i, transform: `translate3d(calc(-${100 * length}% - ${SLIDER_ITEM_GAP * length}px), 0, 0)`},
                { offset: 1 / random * i, transform: 'translate3d(0, 0, 0)'}
            )
        }

        return [...rolling, { offset: 1, transform: `translate3d(calc(-${100 * number}% - ${SLIDER_ITEM_GAP * number}px), 0, 0)`}];
    }

    useEffect(() => {
        startRollingAnimation({
                duration: 3000,
                easing: 'cubic-bezier(.41,-0.01,.63,1.24)',
                fill: 'forwards',
            }, slideRolling(selectArray.length, winning),
            () => {
                startWinningIconAnimation({
                    duration: 400,
                    fill: 'forwards',
                }, [
                    { opacity: 0, transform: 'scale(1)' },
                    { opacity: 1, transform: 'scale(1.5)' },
                ]);

                startBlurAnimation({
                    duration: 400,
                    fill: 'forwards',
                }, [
                    { filter: 'blur(0px)' },
                    { filter: 'blur(4px)' },
                ]);

                startWinningAnimation({
                    duration: 800,
                    fill: 'forwards',
                    delay: 300,
                }, [
                    { backgroundColor: 'rgba(255, 255, 255, 0)' },
                    { backgroundColor: 'rgba(255, 255, 255, 1)' },
                ]);

                setTimeout(() => {
                    confettiReward();
                }, 300);
            })
    }, [])

    return <div className={S.wrap}>
        <div className={S.slider} ref={sliderRef} style={{'--gap': `${SLIDER_ITEM_GAP}px`} as React.CSSProperties}>
            <div className={S.slider__container} ref={sliderContainerRef}>
                <div className={S.slider__list}>
                    {extendedSelectArray.map((value, index) => {
                        return (
                            <div className={cns(S.slider__item, "tossface")} key={index}>
                                {value.symbol}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        <div className={S.winning} ref={winningRef}>
            <div className={S.winning__bg}></div>
            <div className={cns(S.winning__item, "tossface")} ref={winningIconRef}>
                {selectArray[winning].symbol}
            </div>
            <span className={S.confetti} id="confettiReward"></span>
        </div>
    </div>
};

export default Rolling;