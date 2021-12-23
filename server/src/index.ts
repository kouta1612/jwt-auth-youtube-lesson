import "dotenv/config"
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser"
import {verify} from "jsonwebtoken";
import {User} from "./entity/User";
import {createAccessToken, createRefreshToken} from "./auth";
import {sendRefreshToken} from "./sendRefreshToken";
import cors from 'cors'

(async () => {
    const app = express()
    app.use(cookieParser())
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }))
    app.get('/', (_req, res) => res.send('hello'))

    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid
        if (!token) {
            return res.send({ ok: false, access_token: "" })
        }
        let payload: any = null
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch (error) {
            console.log(error)
            return res.send({ ok: false, access_token: "" })
        }
        const user = await User.findOne({ id: payload.userId })
        if (!user) {
            return res.send({ ok: false, access_token: "" })
        }
        if (user.tokenVersion != payload.tokenVersion) {
            return res.send({ ok: false, access_token: "" })
        }

        sendRefreshToken(res, createRefreshToken(user))

        return res.send({ ok: true, access_token: createAccessToken(user) })
    })

    await createConnection()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({req, res}) => ({req, res})
    })
    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(4000, () => console.log('express server started.'))
})()
