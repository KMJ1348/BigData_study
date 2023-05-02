import axios from "axios"

async function addressToCoord(data) {
    const res = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
        params: {
            query : data.address,
        },
        headers : {
            Authorization: 'KakaoAK 4501c6c33be7eaef662c76ba0f970ce4'
        }
    })

    let lng, lat = 0

    if(res.data.documents.length > 0) {
        lng = res.data.documents[0].address.x
        lat = res.data.documents[0].address.y
    }

    data.lng = lng   
    data.lat = lat

    return data
}

export {
    addressToCoord
}