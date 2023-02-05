

// Custom hook to handle HTTP requests
export const useHttp = () => {

    
    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        

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
            
            // Re-throw the error so it can be caught in the component
            throw e;
        }
    };

  
    // Return the request function and process state
    return {request}
}
