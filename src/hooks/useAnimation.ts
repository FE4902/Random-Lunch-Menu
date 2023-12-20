import { useRef, MutableRefObject } from 'react';

export const useAnimation = (): [
    MutableRefObject<HTMLDivElement | null>, any
] => {
    const ref = useRef<HTMLDivElement | null>(null);

    const startAnimation = (
        option: any,
        style: any,
        callback: any
    ) => {
        const animation = ref.current?.animate(style, option);

        animation?.finished.then(() => {
            animation?.commitStyles();
            animation?.cancel();
            
            callback && callback();
        })
    }
    
    return [ref, startAnimation];
}

export default useAnimation;