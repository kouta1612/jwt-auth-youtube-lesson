import { compare, hash } from "bcryptjs";
import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int } from "type-graphql";
import {getConnection} from "typeorm";
import { createAccessToken, createRefreshToken } from "./auth";
import { User } from "./entity/User";
import {isAuth} from "./isAuth";
import { MyContext } from "./MyContext";
import {sendRefreshToken} from "./sendRefreshToken";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return "hi"
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    hey(@Ctx() { payload }: MyContext) {
        return `your user id is: ${payload!.userId}`
    }

    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number) {
        await getConnection().getRepository(User).increment({ id: userId }, 'tokenVersion', 1)
        return true
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const hashedPassword = await hash(password, 12)
        
        try {
            await User.insert({
                email,
                password: hashedPassword
            })
        } catch (error) {
            console.log(error)
            return false
        }
        return true
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new Error("could not find user.");
        }

        const valid = await compare(password, user.password)

        if (!valid) {
            throw new Error("bad passowrd.");
        }

        sendRefreshToken(res, createRefreshToken(user))
        
        return {
            accessToken: createAccessToken(user)
        }
    }
}