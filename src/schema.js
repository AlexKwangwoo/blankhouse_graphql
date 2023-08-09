import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { IResolvers } from "@graphql-tools/utils";
import { DocumentNode, GraphQLSchema } from "graphql";

// subscribe가 잘작동되지않아 schema대신 schema2를 사용함
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`); //type을 다모아주고
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`); //resolver를 다모아준다!

const mergedTypeDefs = mergeTypeDefs(loadedTypes);
const mergedResolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

// console.log("schema", schema);

export default schema;
