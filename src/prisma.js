const { PrismaClient } = require("@prisma/client")
const { PrismaSelect } = require("@paljs/plugins")

const prisma = new PrismaClient()

const parseInfo = (info) => new PrismaSelect(info).value

module.exports = {
  prisma,
  parseInfo,
}
