import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useRegisterMutation } from '../generated/graphql'

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register] = useRegisterMutation()
    return <div>
        <form onSubmit={async e => {
            e.preventDefault()
            console.log(email, password)
            const response = await register({ 
                variables: { 
                    email,
                    password
                }
            })
            console.log(response)
        }}>
            <div>
                <input value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button>submit</button>            
        </form>
    </div>
}