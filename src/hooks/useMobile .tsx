import { useState, useEffect, useCallback } from 'react';
import { MOBILE_BREAKPOINT } from '../constants/constants';

const useMobile = (breakpoint: number = MOBILE_BREAKPOINT) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= breakpoint);

    const handleWindowSizeChange = useCallback(() => {
        setIsMobile(window.innerWidth <= breakpoint);
    }, [breakpoint]); // Memoize with 'breakpoint' as a dependency

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, [handleWindowSizeChange]);

    return isMobile;
};

export default useMobile;
