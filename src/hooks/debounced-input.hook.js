import {useEffect, useState} from "react";

const useDebouncedInput = (inputValue, cb, debounceTime = 500) => {
    const [timeoutId, setTimeoutId] = useState();

    useEffect(() => {
        clearTimeout(timeoutId);

        setTimeoutId(
            setTimeout(async () => {
                cb();
            }, debounceTime)
        );
    }, [inputValue]);
};

export default useDebouncedInput;
