const { default: axios } = require("axios");

const getGooglePlace=(category,radius,lat,lng)=>axios.get('/api/google-place?'+
'category='+category+'&radius='+radius+'&radius='+lat+'&lng='+lng)

export default{
    getGooglePlace
}