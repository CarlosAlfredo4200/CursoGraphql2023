import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {v1 as uuid} from 'uuid';

const users = [
  {
    id: 1,
    name: "Juan",
    surname: "Gómez",
    street: "Calle Principal",
    zipcode: 12345,
    city: "Ciudad A",
    phone: 987654321
  },
  {
    id: 2,
    name: "María",
    surname: "López",
    street: "Avenida Central",
    zipcode: 54321,
    city: "Ciudad B",
    phone: 123456789
  },
  {
    id: 3,
    name: "Carlos",
    surname: "Martínez",
    street: "Calle Secundaria",
    zipcode: 67890,
    city: "Ciudad C",
    phone: 456789012
  },
  {
    id: 4,
    name: "Laura",
    surname: "Rodríguez",
    street: "Calle Tranquila",
    zipcode: 13579,
    city: "Ciudad D",
    phone: 789012345
  },
  {
    id: 5,
    name: "Pedro",
    surname: "Sánchez",
    street: "Avenida Rápida",
    zipcode: 24680,
    city: "Ciudad E",
    phone: 321098765
  }
]


const typeDefs = `
  type User {
    id: ID!
    name: String!
    surname: String!
    zipcode: Int!
    street:String!
    phone: String!
    city: String,
    address: String
  }

  type Query{
    allUsers: [User]
    userCount: Int!
    findUserByName(name:String!): user
    findUserByid(id:ID!): user
  }

  type Mutation{
    addUser(
    name: String!,
    surname: String!,
    zipcode: Int!,
    street:String!
    phone: String
    city: String,
     ): User
  }
`


const resolvers = {
  User: {
    address:((parent) => `Calle: ${parent.street}, ${parent.zipcode}, ${parent.city}`)
  }, 
  Query:{
    allUsers: ()=> users,
    userCount: ()=> users.length,
    findUserByName: (parent, args)=> users.find((user) => user.name ===args.name),
    findUserByid:(parent, args) => users.find((user) => user.id === parseInt(args.id))
  },
  Mutation:{
    addUser:(parent, args) =>{
      const user = {...args, id: uuid()}
      users.push(user)
      return user
    }
  }


}



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
