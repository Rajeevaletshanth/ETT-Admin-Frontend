
export default function getAccessToken () {
    if(localStorage.getItem('admin')){
        let auth = JSON.parse(localStorage.getItem('admin')).auth
        let token = JSON.parse(auth).session.token;
        // return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYXZhdGFyIjoiL2ltZy9hdmF0YXJzL3RodW1iLTEuanBnIiwidXNlcm5hbWUiOiJMVFcgVGVjaCIsImVtYWlsIjoiYWRtaW5AbHR3dGVjaC5pdCIsImF1dGhvcml0eSI6IntcInJvbGVcIjpbXCJhZG1pblwiLFwidXNlclwiXX0iLCJpYXQiOjE2NjcyODIwODEsImV4cCI6MTY2NzI4NTY4MX0.rhaNnPM7BkpLwOaK8XELVHzHN2qYTgYJY8qRS_AyV1I`
        return token;
    }else{
        return 0;
    }
}