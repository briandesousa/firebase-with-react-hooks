import { useState, useCallback } from 'react';

// Custom hook for retrieving and updating a specific query parameter in the query string
function useQueryString(key) {

    const [value, setValue] = useState(getQueryParamValue(key));

    const onSetValue = useCallback(
        newValue => {
            setValue(newValue);
            updateQueryStringWithoutReload(newValue ? `${key}=${newValue}` : null);
        },
        [key]
    );

    function getQueryParamValue(key) {
        return new URLSearchParams(window.location.search).get(key);
    }

    function updateQueryStringWithoutReload(queryString) {
        const { protocol, host, pathname } = window.location;
        const newUrl = `${protocol}//${host}${pathname}${queryString ? '?' : ''}${queryString}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }


    return [value, onSetValue];
}

export default useQueryString;