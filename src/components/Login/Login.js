import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(res => {
            window.location.pathname = '/order';
        })
    }

    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/'
        })
    }
   
    return (
        <div>
            
            <div className="text-center">
            { auth.user ? <button className="btn btn-success mt-5" onClick={handleSignOut}>Sign out</button> : 
                <button className="btn btn-success mt-5" onClick={handleSignIn}>Sign in with Google</button>}
            </div>

            <h1 className="text-center mt-3">or </h1>

            <div style={{width:'40%', margin:'20px auto'}} >
                <h4 className="text-center mb-4">Sign in with email</h4>
                <form>
                    <input class="form-control" name="name" type="text" placeholder="Enter your name"/>
                    <br/>
                    <input className="form-control" name="email" type="email" placeholder="Enter your email"/>
                    <br/>
                    <input type="password" name="password" className="form-control" placeholder="Enter your password"/>
                    <br/>
                    <div className="text-center">
                        <button className="btn btn-success">Sign in</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default Login;