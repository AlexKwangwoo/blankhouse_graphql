require("dotenv").config();
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
// import { ApolloServer } from "apollo-server";
// import schema from "./schema";
// import { getUser } from "./users/users.utils";
// import { typeDefs, resolvers } from "./schema";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { getUser, protectedResolver } from "./users/users.utils";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import logger from "morgan";
import { createServer, Server } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import schema from "./schema";

// express server를 결국 이용했다.. 사진올리기 위해서!
const PORT = process.env.PORT;
const startServer = async () => {
  const app = express();

  // ****************************************************
  //logger은 맨위에 써줘야함 그러면 websoket이 작동되는지 몇초마다 로그를 찍어냄
  // app.use(logger("tiny"));
  // ****************************************************

  app.use(graphqlUploadExpress());
  app.use(express.static("uploads"));

  // pubsub
  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      // typeDefs,
      // resolvers,
      execute,
      subscribe,
      // 첫번째 인자로 http header에 담긴 요소를 볼수있음
      onConnect: async ({ token }, webSocket, context) => {
        // 유저가 연결됐을때 뭔갈 할수있다
        console.log("token", token);
        if (!token) {
          throw new Error("You can't listen.");
        }
        const loggedInUser = await getUser(token);
        console.log("Connected!");

        // 여기서 return을 하면 subscribe의 context로 갈것임!
        return { loggedInUser };
      },
      onDisconnect(webSocket, context) {
        console.log("Disconnected!");
      },
    },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    context: async (ctx) => {
      // console.log("ctx", ctx);
      if (ctx.req) {
        // console.log("come req");
        // 여기는 소켓과 다르게 일반 request에 보내는 context가될것임
        return {
          loggedInUser: await getUser(ctx.req.headers.token),
        };
      }
    },

    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  httpServer.listen(process.env.PORT, () =>
    console.log(
      `🚀 Server: http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  );
};

startServer();
