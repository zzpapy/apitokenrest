
export function loginUser(data){
    const url = 'http://localhost:8000/api/login_check'
    
    return fetch(url,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getPosts(token){
    const url = 'http://localhost:8000/api/post'
    
    return fetch(url, {
      method:"GET",
      headers: {
        "Authorization": "Bearer "+token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}