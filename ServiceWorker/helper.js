import axios from 'axios';
const api = "http://127.0.0.1:8080/API/V1/focus/"; //144.91.99.109

export const socketLink = "http://127.0.0.1:8080";

export function login(email,password) {
    const ele = {
        numero: email,
        password: password
    };
    return new Promise(async next=>{
        await axios.post(`${api}login`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                next(err)
            })
    })
}

export function delSer(token,code) {
    const ele = {
        token,
        code
    };
    return new Promise(async next=>{
        await axios.post(`${api}changeSer`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                
                next(err)
            })
    })
}
export function ChangePass(ident,oldPass,newPass) {
    const ele = {
        ident,
        oldPass,
        newPass
    };
    return new Promise(async next=>{
        await axios.post(`${api}changePassword`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                
                next(err)
            })
    })
}

export function searchMedecin(pays,specialite) {
    const ele = {
        pays: pays,
        specialite: specialite
    };
    return new Promise(async next=>{
        await axios.post(`${api}search`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                
                next(err)
            })
    })
}
export function searchMedecinPays(pays) {
    const ele = {
        pays: pays,
    };
    return new Promise(async next=>{
        await axios.post(`${api}searchPays`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                
                next(err)
            })
    })
}
export function signin(email,password,numero,address,date,name, sexe,prefix) {
    const ele = {
        email: email,
        password: password,
        numero:numero,
        address:address,
        sexe:(parseInt(sexe,10) === 0)? "Homme":"Femme",
        prefix:prefix,
        date:date,
        name:name
    };
    return new Promise(async next=>{
        await axios.post(`${api}signin`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                
                next(err)
            })
    })
}

export function verifNumber(numero) {
    const ele = {
        
        numero:numero,
        
    };
    return new Promise(async next=>{
        await axios.post(`${api}verifNumber`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                
                next(err)
            })
    })
}

export function verifNumberFinal(code,newPass,ident) {
    const ele = {
        ident:ident,
        code:code,
        newPass:newPass,
        
    };
    return new Promise(async next=>{
        await axios.post(`${api}verifNumberFinal`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                
                next(err)
            })
    })
}

export function editProfil(email,password,numero,address,dates,name, profil,ident, donee) {
    const ele = {
        email: email,
        password: password,
        numero:numero,
        address:address,
        date:dates,
        name:name,
        profil:(donee == 1) ? profil.uri : "",
        ident:ident
    };
    return new Promise(async next=>{
        await axios.post(`${api}editProfil`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                
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
                console.error("ici de ",error);
                next(error)
            });
    })
}

export function getAllMedoc() {
    return new Promise(next=>{
        fetch(`${api}medoc`)
            .then((response) => response.json())
            .then((responseJson) => {
                next(responseJson.info)
            })
            .catch((error) =>{
                console.error("ici de ",error);
                next(error)
            });
    })
}



export function autre(ident) {
    return new Promise(next=>{
        fetch(`${api}autre/${ident}`)
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
export function getAllPharma() {
    return new Promise(next=>{
        fetch(`${api}pharma`)
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

export function getAllPharmaBraza() {
    return new Promise(next=>{
        fetch(`${api}pharma/braza`)
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

export function getAllPharmaBurkina() {
    return new Promise(next=>{
        fetch(`${api}pharma/burkina`)
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

export function getAllPharmaParis() {
    return new Promise(next=>{
        fetch(`${api}pharma/paris`)
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

export function getAllPharmaYaounde() {
    return new Promise(next=>{
        fetch(`${api}pharma/yaounde`)
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