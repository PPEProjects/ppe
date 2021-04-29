import React from 'react';
import Cookies from "universal-cookie";

function Auth() {
    const cookies = new Cookies()
    let url = new URL(window.location.href)
    let logout = url.searchParams.get('logout');
    if(logout){
        cookies.remove('access_token')
        cookies.remove('user')
        window.location.assign(`${window.$home}`)
        return
    }
    let access_token = url.searchParams.get('access_token');
    cookies.set('access_token', access_token, { path: '/' });
    window.location.assign(`/UsersPage`);
    return (
        <React.Fragment>
            <div className="flex items-center justify-center mt-32">
                <button
                    type="button"
                    className=" text-white h-10 w-32 rounded hover:opacity-75 flex items-center justify-center spinner overflow-hidden"
                >
                </button>
            </div>
        </React.Fragment>
    )
}

export default Auth;
