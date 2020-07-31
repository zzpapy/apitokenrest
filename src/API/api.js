export function getSeances () {
    const url = 'http://localhost:8000/api/seances/'
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }

  export async function getDetail (id) {
    const url = 'http://localhost:8000/api/films/'+id
    return fetch(url,{
      "headers":{
        "content-type": "application/merge-patch+json",
      }
    })
    .then((response) => response.json())
    .then(data => data)
    .catch((error) => console.error(error))
  }

  export async function update (id,data) {
    const url = 'http://localhost:8000/api/films/'+id
    console.log(url)
    return await fetch(url,{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/merge-patch+json'
      }
      })
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }

  export async function createFilm (data) {
    const url = 'http://localhost:8000/api/films'
    
    console.log(url)
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            // 'Authorization' : 'Bearer: '+
            'Content-Type': 'application/json'
        }
        })
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }
  
  





  



  