export function checkTokenExpiry(accessToken) {
    if (!accessToken) {
      return true;
    }
  
    const expirationTime = localStorage.getItem("accessTokenExpiration");
    if (!expirationTime) {
      return true;
    }
  
    const currentTime = Date.now();
    return currentTime > expirationTime;
  }


