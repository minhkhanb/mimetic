/** 
 * Set Root Font Size.
 */
const setRootFontSizePartial = (resizeRootFontSize) => {
    let requestId;
    let outerWidth;
    let outerHeight;
    const windowRef = window;
    const documentRef = windowRef.document;
    return (settings) => {
        /** 
         * Destructured settings.
         */
        const {
            rootElement,
            rootFontSize,
            initialOuterHeight,
            initialOuterWidth,
            relativeDesignWidth,
            mobileWidth,
            cutOffWidth,
            enableScale,
            preserveDevicePixelRatio,
            onScale,
            onZoom,
            onResize,
            mobileWidthPX,
            cutOffWidthPX
        } = settings;


        /** 
         * Get Real time values.
         */
        const windowWidth = windowRef.innerWidth;
        const windowOuterWidth = windowRef.outerWidth;
        const windowOuterHeight = windowRef.outerHeight;
        const cliWidth = documentRef.documentElement.clientWidth;
        const outerPerClient = windowOuterWidth / cliWidth;
        const opcR = outerPerClient < 1.05 && outerPerClient > 0.95 ? 1 : outerPerClient;
        const safarIDPR = Number((opcR).toFixed(5));
        const safarIDPRRounded = Number(safarIDPR.toFixed(1));
        const iEDPR = Number(screen.deviceXDPI / screen.logicalXDPI);
        const devicePixelRatioRound = Math.abs(iEDPR ? iEDPR : devicePixelRatio === 1 ? safarIDPR : devicePixelRatio);
        const windowResize = windowOuterWidth !== outerWidth && windowOuterHeight !== outerHeight;
        const clientWidth = parseInt(cliWidth * devicePixelRatioRound);
        const defaultDevicePixelRatio = Math.round(cliWidth * devicePixelRatioRound / windowOuterWidth);


        /** 
         * Set variable inital values if not yet set.
         */
        if (outerWidth === undefined) {
            outerWidth = initialOuterWidth;
            outerHeight = initialOuterHeight;
        }


        /**
         * The window width compared to the design width.
         */
        const designWidthRatio = windowWidth / relativeDesignWidth;


        /**
         * Check to see if the window is at the default zoom level.
         */
        const isDevicePixelRatioDefault = defaultDevicePixelRatio === devicePixelRatioRound;


        /** 
         * The minimum veiwport size to not react to.
         */
        const cutOff = cutOffWidthPX > mobileWidthPX ? cutOffWidthPX : mobileWidthPX;


        /**
         * Mutate on next available frame.
         */
        resizeRootFontSize({
            windowWidth,
            windowOuterWidth,
            isDevicePixelRatioDefault,
            relativeDesignWidth,
            cutOff,
            rootElement,
            designWidthRatio,
            devicePixelRatioRound,
            rootFontSize,
            enableScale,
            preserveDevicePixelRatio,
            onScale,
            onZoom,
            onResize,
            clientWidth,
            defaultDevicePixelRatio
        })


        /**
         * Updated Outer browser dimensions.
         */
        outerWidth = windowOuterWidth;
        outerHeight = windowOuterWidth;
    }
}


export default setRootFontSizePartial;