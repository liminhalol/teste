const albumGrid = document.querySelector(".album-grid")
const apiBase = "http://ws.audioscrobbler.com/2.0/?"

const xisde = new URLSearchParams(window.location.search)
console.log(xisde)

async function requestApi(user, method, unique){
    const parameters = {
        user,
        method,
        api_key: "434d4bfa1b0f8028c7a2cbe80c947f6a",
        format: "json",
        ...unique
    }

    const response = await fetch(apiBase + new URLSearchParams(parameters).toString())
    return response
}

async function getUserInfo(user){
    const response = await requestApi(user, 'user.getinfo')
    const data = await response.json()

    console.log(data.user)
    return data.user
}

async function getUserTopAlbums(user, period, limit) {
    const response = await requestApi(user, "user.gettopalbums", {period, limit})
    const data = await response.json()

    return data.topalbums.album
}

async function renderTopAlbums(user, period, limit) {
    const albums = await getUserTopAlbums(user, period, limit)

    for (const album of albums){
        const albumImage = album.image[2]["#text"]
        albumGrid.insertAdjacentHTML("afterbegin", `<img src="${albumImage}" class="album-image">`)
    }
}

getUserInfo("limelolxd")
renderTopAlbums("caioempessoa", "1month", 49)