// A schema defines the shape of the graph and data availale on it
// typeDefs define types of data, game, author, review etc. similar to the data you have in the database
// schema is a collection of type definitions (typeDefs)
// int, float, string, boolean, ID(unique identifier graphql uses)

export const typeDefs = `#graphql
  # e.g., Game type defines the queryable fields for every game in our data source
  type Game {
    id: ID! # ! means it is required, otherwise means optional, allowed to be null
    title: String!
    platform: [String!]! # [] means it is a list, ! means it is required to have an array, and inside array can't be null
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 
  # it is not optional, it is required
  type Query {
    reviews: [Review]
    games: [Game]
    authors: [Author]
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// Handle requests/queries based on typeDefs
const resolvers = {
  
};
