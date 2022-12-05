import React, { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const UseOutsideAlerter = React.forwardRef((props, ref) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.handleFunc();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return null;
});

export default UseOutsideAlerter;