import React from "react";
import {Link} from "react-router-dom";
import {useMeQuery} from "../generated/graphql";

export const Header: React.FC = () => {
    const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' })
    return (
        <div>
            <header>
                <div>
                    <Link to="/">home</Link>
                </div>
                <div>
                    <Link to="/register">register</Link>
                </div>
                <div>
                    <Link to="/login">login</Link>
                </div>
                <div>
                    <Link to="/hey">hey</Link>
                </div>
                { data && data.me ? <div>Your are logged in as: { data.me.email }</div> : null }
            </header>
        </div>
    )
}
