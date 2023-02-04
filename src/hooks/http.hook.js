import { useCallback } from "react";

// Custom hook to handle HTTP requests
export const useHttp = () => {
    // State to store the process of the request (waiting, loading, error)
    // const [process, setProcess] = useState('waiting');

    // useCallback hook to ensure the function is only created once and does not recreate on every render
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        // setProcess('loading');

        try {
            // Perform the HTTP request using fetch API
            const response = await fetch(url, {method, body, headers});

            // If the response is not okay, throw an error with a custom message
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            // Get the data from the response as JSON
            const data = await response.json();

            // Return the data
            return data;
        } catch(e) {
            // setProcess('error');
            // Re-throw the error so it can be caught in the component
            throw e;
        }
    }, []);

    // A callback function to clear the error state
    // const clearError = useCallback(() => {
        // setProcess('loading');
    // }, []);

    // Return the request function and process state
    return {request, 
            // clearError, 
            // process, 
            // setProcess
        }
}
