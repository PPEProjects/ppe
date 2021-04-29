import { useEffect, useMemo } from 'react';

const observerConfig = {
    attributes: true,
    characterData: true,
    attributeOldValue: true,
    subtree: true
};

const useMutationObserver = (callback) => {
    const observer = useMemo(() => new MutationObserver(callback), [callback]);
    useEffect(
        () => {
            [...Array(4)].map((item, key) => {
                let el = document.getElementById(`filesType_${key}`)
                if(el){
                    observer.observe(el, observerConfig);
                }
                return () => observer.disconnect();
            })
        },
        [observer]
    );
};
export default useMutationObserver