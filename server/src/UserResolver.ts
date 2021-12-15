import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { User } from "./entity/User";

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

    @Query(() => [User])
    users() {
        return User.find()
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
        @Arg('password') password: string
    ): Promise<LoginResponse> {
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw new Error("could not find user.");
        }

        const valid = await compare(password, user.password)

        if (!valid) {
            throw new Error("bad passowrd.");
        }
        
        return {
            accessToken: sign({userId: user.id}, 'vsdkjvsdnvkd', {
                expiresIn: "15m"
            })
        }
    }
}