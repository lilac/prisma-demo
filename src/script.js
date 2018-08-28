const { Prisma } = require("prisma-binding")

const prisma = new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: "http://localhost:4466"
})

prisma.mutation
    .createUser({ data: { name: "Alice" } }, "{ id name }")
    .then(console.log)
    // { id: 'cjhcidn31c88i0b62zp4tdemt', name: 'Alice' }
    .then(() => prisma.query.users(null, "{ id name }"))
    .then(response => {
        console.log(response)
        // [ { id: 'cjhcidn31c88i0b62zp4tdemt', name: 'Alice' } ]
        return prisma.mutation.createPost({
            data: {
                title: "Prisma rocks!",
                content: "Prisma rocks!",
                author: {
                    connect: {
                        id: response[0].id
                    }
                }
            }
        })
    })
    .then(response => {
        console.log(response)
        /*
          { id: 'cjhcidoo5c8af0b62kv4dtv3c',
            title: 'Prisma rocks!',
            content: 'Prisma rocks!',
            published: false }
        */
        return prisma.mutation.updatePost({
            where: { id: response.id },
            data: { published: true }
        })
    })
    .then(console.log)
    /*
      { id: 'cjhcidoo5c8af0b62kv4dtv3c',
        title: 'Prisma rocks!',
        content: 'Prisma rocks!',
        published: true }
    */
    .then(() => prisma.query.users(null, "{ id posts { title } }"))
    .then(console.log)
    // [ { id: 'cjhcidn31c88i0b62zp4tdemt', posts: [ [Object] ] } ]
    .then(() => prisma.mutation.deleteManyPosts())
    .then(console.log)
    // { count: 1 }
    .then(() => prisma.mutation.deleteManyUsers())
    .then(console.log)
// { count: 1 }
