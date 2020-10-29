exports.typeDefs = /* GraphQL */ `
  type User {
    id: Int!
    email: String!
    name: String
  }

  type Query {
    user(id: Int!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(data: UpdateUserInput!, id: Int!): User!
    deleteUser(id: Int!): User!
  }

  input CreateUserInput {
    email: String!
    name: String
  }

  input UpdateUserInput {
    email: String
    name: String
  }
`

exports.resolvers = {
  Query: {
    user: (parent, args, { prisma, parseInfo }, info) => {
      return prisma.user.findOne({ ...parseInfo(info), where: { id: args.id } })
    },
    users: (parent, args, { prisma, parseInfo }, info) => {
      return prisma.user.findMany(parseInfo(info))
    },
  },

  Mutation: {
    createUser: (parent, args, { prisma, parseInfo }, info) => {
      return prisma.user.create({ ...parseInfo(info), data: args.data })
    },

    updateUser: (parent, args, { prisma, parseInfo }, info) => {
      return prisma.user.update({
        ...parseInfo(info),
        where: { id: args.id },
        data: args.data,
      })
    },

    deleteUser: (parent, args, { prisma, parseInfo }, info) => {
      return prisma.user.delete({ ...parseInfo(info), where: { id: args.id } })
    },
  },
}
