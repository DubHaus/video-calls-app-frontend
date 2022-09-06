import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {UserResolver} from './resolvers/UserResolver';
import {AppDataSource} from './data-source';
import cookieParser from 'cookie-parser';
import {verify} from 'jsonwebtoken';
import {User} from './entity/User';
import {createAccessToken, createRefreshToken} from './utils/auth';
import {sendRefreshToken} from './utils/sendRereshToken';

(async () => {
    const app = express();
    app.use(cookieParser());

    app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.rto;
        if (!token) {
            return res.send({ok: false, accessToken: ''});
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log(err);
            return res.send({ok: false, accessToken: ''});
        }

        // token is valid and we can send back an access token
        const user = await User.findOne({where: {id: payload.userId}});

        if (!user) {
            return res.send({ok: false, accessToken: ''});
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ok: false, accessToken: ''});
        }

        sendRefreshToken(res, createRefreshToken(user)); // refresh refresh token

        return {
            ok: true,
            accessToken: createAccessToken(user),
        };
    });

    await AppDataSource.initialize();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
        }),
        context: ({req, res}) => ({
            req,
            res,
        }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log('express server started on port 4000');
    });
})();

// AppDataSource.initialize()
//     .then(async () => {
//         console.log('Inserting a new user into the database...');
//         const user = new User();
//         user.firstName = 'Timber';
//         user.lastName = 'Saw';
//         user.age = 25;
//         await AppDataSource.manager.save(user);
//         console.log('Saved a new user with id: ' + user.id);

//         console.log('Loading users from the database...');
//         const users = await AppDataSource.manager.find(User);
//         console.log('Loaded users: ', users);

//         console.log(
//             'Here you can setup and run express / fastify / any other framework.'
//         );
//     })
//     .catch(error => console.log(error));