const {Prisma} = require("prisma-binding");
const fs = require('fs');
const papa = require('papaparse');

const env = process.env.NODE_ENV || 'development'
const prisma = new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: `http://localhost:4466/qa/${env}`
})

function parseCsv(file) {
    const text = fs.readFileSync(file, 'utf8');
    const data = papa.parse(text, {header: true})
    if (data.data) {
        return data.data
    } else {
        throw new Error(data.errors)
    }
}

function collectQuestionAnswers(data) {
    const map = new Map()
    for (const record of data) {
        const cls = record['class']
        if (map.has(cls)) {
            const r = map.get(cls)
            r['questions'].push(record['question'])
        } else {
            const r = {
                title: record.question,
                content: record.answer,
                questions: [record.question]
            }
            map.set(cls, r)
        }
    }
    return map
}

function qaToMutation(map) {
    let posts = []
    for (const entry of map.values()) {
        posts.push({
            title: entry.title,
            content: entry.content,
            questions: {
                create: entry.questions.map(title => {
                    return {title}
                })
            }
        })
    }
    return {
        create: posts
    }
}

const file = process.argv[2]
if (!file) process.exit(1)

const data = parseCsv(file)
const qa = collectQuestionAnswers(data)
const postMutation = qaToMutation(qa)

prisma.mutation
    .createAgent({data: {name: "Alice", posts: postMutation}}, "{ id name }")
    .then(console.log)
    // { id: 'cjhcidn31c88i0b62zp4tdemt', name: 'Alice' }
    .then(() => prisma.query.agents(null, "{ id name posts {title content questions {title}} }"))
    .then(response => {
        console.log(response)
    })
    .catch(console.error)
