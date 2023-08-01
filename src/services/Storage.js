export const Storeuserdata = (data)=>{
    localStorage.setItem('idToken', data);
}

export const getuserdata = ()=>{
    return localStorage.getItem('idToken');
}

export const Removeuserdata = ()=>{
    localStorage.removeItem('idToken');
}