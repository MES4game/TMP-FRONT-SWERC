import { FC, ReactNode, useEffect, useState, useRef } from "react";
import { useGeneralVars } from "@/shared/contexts/common/general.context";
import { login, register } from "@/api/auth.api";
import { useReRender } from "@/shared/utils/common/hook.util";
import "@/ui/pages/user/user.page.css";

const UserPage: FC = (): ReactNode => {
    const { token, lang, user } = useGeneralVars();
    const reRender = useReRender();
    const [mode, setMode] = useState(false);
    const [fetching, setFetching] = useState(false);

    const email = useRef<HTMLInputElement | null>(null);
    const pseudo = useRef<HTMLInputElement | null>(null);
    const firstname = useRef<HTMLInputElement | null>(null);
    const lastname = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);

    function handleRegister() {
        setFetching(true);

        register(
            email.current?.value ?? "",
            pseudo.current?.value ?? "",
            firstname.current?.value ?? "",
            lastname.current?.value ?? "",
            password.current?.value ?? "",
        )
            .then((value) => { token.current = value; })
            .then(() => { setFetching(false); })
            .catch(alert);
    }

    function handleLogin() {
        setFetching(true);

        console.log(`Log in with email_pseudo: "${pseudo.current?.value ?? ""}" and password: "${password.current?.value ?? ""}"`);
        login(pseudo.current?.value ?? "", password.current?.value ?? "")
            .then((value) => { token.current = value; })
            .then(() => { setFetching(false); })
            .catch(alert);
    }

    useEffect(() => {
        console.log("Loaded: UserPage");

        const unsubscribers: (() => void)[] = [];

        unsubscribers.push(token.subscribe((_prev, _curr) => { reRender(); }, true));
        unsubscribers.push(user.subscribe((_prev, _curr) => { reRender(); }, true));

        return () => { unsubscribers.forEach((fn) => { fn(); }) };
    }, []);

    useEffect(() => {
        console.log("Rendered: UserPage");
    });

    return (
        <>
            <h1>User</h1>
            <hr />
            {
                user.current.id < 1
                ? (
                    <div className='connect'>
                        <div className='connect-switch'>
                            <button onClick={() => { setMode(true) }} style={{ backgroundColor: mode ? '' : 'transparent'}}>Login</button>
                            <button onClick={() => { setMode(false) }} style={{ backgroundColor: mode ? 'transparent' : ''}}>Register</button>
                        </div>
                        <div className='connect-input'>
                            <input type='text' ref={pseudo} placeholder='' autoComplete='username' required />
                            <label>Pseudo{mode ? ' or Email' : ''}</label>
                        </div>
                        <div className='connect-input' style={{ display: mode ? 'none' : ''}}>
                            <input type='email' ref={email} placeholder='' autoComplete='email' required />
                            <label>Email</label>
                        </div>
                        <div className='connect-input' style={{ display: mode ? 'none' : ''}}>
                            <input type='text' ref={firstname} placeholder='' required />
                            <label>Firstname</label>
                        </div>
                        <div className='connect-input' style={{ display: mode ? 'none' : ''}}>
                            <input type='text' ref={lastname} placeholder='' required />
                            <label>Lastname</label>
                        </div>
                        <div className='connect-input'>
                            <input type='password' ref={password} placeholder='' autoComplete='new-password' required />
                            <label>Password</label>
                        </div>
                        <button disabled={fetching} onClick={mode ? handleLogin : handleRegister}>{fetching ? '...' : (mode ? 'Login' : 'Register')}</button>
                    </div>
                )
                : (
                    <div className='connect'>
                        <p>ID : {user.current.id}</p>
                        <p>Pseudo : {user.current.pseudo}</p>
                        <p>Email : {user.current.email}</p>
                        <p>Firstname : {user.current.firstname}</p>
                        <p>Lastname : {user.current.lastname}</p>
                        <p>Created on: {user.current.created_on.toUTCString()}</p>
                        <button onClick={() => { lang.current = lang.current === "en" ? "fr" : "en" }}>Selected lang: {lang.current}</button>
                        <button disabled={fetching} onClick={() => { token.current = "none" }}>{fetching ? '...' : 'Logout'}</button>
                    </div>
                )
            }
        </>
    );
}

export default UserPage;
