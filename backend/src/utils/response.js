
export const success = (response,msg) => {
    console.log("Success:", response); 
    return {
      status:response.status,
      message:response.data.message || msg || 'Request was successful!',
      data:response.data,
      statusMessage:'success',
      statusText:response.statusText,
    };
  };
  
  export const errors = (error,msg) => {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Status:', error.response.status);
      console.error('Error Headers:', error.response.headers);
      return {
        status: error.response.status,
        message: error.response.data.error || msg  || 'Something went wrong on the server!',
        statusMessage:'error',
        statusText:error.response.statusText,
      };
    } else if (error.request) {
      console.error('Error Request Data:', error.request);
      return {
        status:500,
        statusMessage: 'error',
        message: msg || 'No response from the server. Please check your network or try again later.',
      };
    } else {
      console.error('Error Message:', error.message);
      return {
        status:500,
        statusMessage: 'error',
        message: error.message || msg || 'An unknown error occurred!',
      };
    }
  };
  
  export const warning = (message,msg) => {
    console.warn('Warning:', message);
    return {
      status: 'warning',
      message: message|| msg || 'Something might be wrong. Please check!',
    };
  };
  