import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '../constants/constants';

const useMobile = (breakpoint: number = MOBILE_BREAKPOINT) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= breakpoint);

    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth <= breakpoint);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return isMobile;
};

export default useMobile;
