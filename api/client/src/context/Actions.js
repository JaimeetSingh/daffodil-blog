export const LoginStart = (userCredentials)=>({
   type: "LOGIN_START" 
});

export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = ()=>({
    type:"LOGIN_FAILURE",
});

export const Logout = ()=>({
    type:"LOGOUT",
});

export const UpdateStart = (user) => ({
    type:"UPDATE_START",
    payload:user,
});

export const UpdateSuccess = (user) => ({
    type:"UPDATE_SUCCESS",
    payload:user,
});

export const UpdateFailure = (user) => ({
    type:"UPDATE_FAILURE",
    payload:user,
});
