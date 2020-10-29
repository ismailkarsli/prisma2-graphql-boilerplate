const express = require("express")
const path = require("path")
const { graphqlHTTP } = require("express-graphql")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { loadFilesSync } = require("@graphql-tools/load-files")
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge")
const prisma = require("./prisma")

const app = express()
const port = process.env.PORT || 4000

const schemaFiles = loadFilesSync(path.join(__dirname, "./schema"), {
  exportNames: [],
})

const typeDefs = mergeTypeDefs(schemaFiles.map((file) => file.typeDefs))
const resolvers = mergeResolvers(schemaFiles.map((file) => file.resolvers))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.use(
  "/",
  graphqlHTTP((request) => {
    return {
      schema,
      graphiql: process.env.NODE_ENV === "production" ? false : true,
      context: { request, ...prisma },
    }
  })
)

app.listen(port)
console.log("Server running.")
