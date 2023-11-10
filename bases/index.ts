import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone';
import { parentPort } from "worker_threads";

/*
*Estructura de proyecto
 * Origen de datos
 */



    const books = [
        {
          "id": 1,
          "title": "La sombra del viento",
          "author": "Carlos Ruiz Zafón",
          "publishedYear": 2001
        },
        {
          "id": 2,
          "title": "Cien años de soledad",
          "author": "Gabriel García Márquez",
          "publishedYear": 1967
        },
        {
          "id": 3,
          "title": "1984",
          "author": "George Orwell",
          "publishedYear": 1949
        },
        {
          "id": 4,
          "title": "El Gran Gatsby",
          "author": "F. Scott Fitzgerald",
          "publishedYear": 1925
        },
        {
          "id": 5,
          "title": "Matar a un ruiseñor",
          "author": "Harper Lee",
          "publishedYear": 1960
        }
      ]
/**
 *  Definicion de tipos
 
 */

const typeDefs = `

      type Book {
        id:ID!
        title: String
        author: String
      }

      type Query {
        books:[Book]
        book:(id:ID!): Book
      }
`
/**
 * Solucionadores
 */

const resolvers = {
    Query:{
      books: () => books
      book:(parent, args) => return books.find(book)
    }
}


/**
 * Mutaciones
 */



/**
 * Suscripciones
 */

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);