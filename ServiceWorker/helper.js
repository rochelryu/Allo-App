import axios from 'axios';
const api = "http://allosanteexpress.com:8080/API/V1/focus/";
export function login(email,password) {
    const ele = {
        email: email,
        password: password
    };
    return new Promise(async next=>{
        await axios.post(`${api}login`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
            console.log("err \n" +err)
            next(err)
        })
    })
}
export function signin(email,password,numero,address,date,name) {
    const ele = {
        email: email,
        password: password,
        numero:numero,
        address:address,
        date:date,
        name:name
    };
    return new Promise(async next=>{
        await axios.post(`${api}signin`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                console.log("err \n" +err)
                next(err)
            })
    })
}
export function getAllVille() {
    return new Promise(next=>{
        fetch(`${api}ville`)
            .then((response) => response.json())
            .then((responseJson) => {
                next(responseJson.info.ville)
            })
            .catch((error) =>{
                console.error(error);
                next(error)
            });
    })
}

export function history(ident) {
    return new Promise(next=>{
        fetch(`${api}account/${ident}`)
            .then((response) => response.json())
            .then((responseJson) => {
                next(responseJson)
            })
            .catch((error) =>{
                console.error(error);
                next(error)
            });
    })
}