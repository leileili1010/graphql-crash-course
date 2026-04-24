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
    reviews: [Review!] # optional but it cannot be an array of nulls
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    game_id: ID!
    author_id: ID!
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!] # optional but it cannot be an array of nulls  
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 
  # it is not optional, it is required
  type Query {
    reviews: [Review]
    games: [Game]
    authors: [Author]
    review(id: ID!): Review # single review, id is a query variable
    game(id: ID!): Game
    author(id: ID!): Author
  }

  type Mutation {
    deleteGame(id: ID!): [Game]
    # addGame(title: String!, platform: [String!]!): Game
    # updateGame(id: ID!, title: String!, platform: [String!]!): Game
    # deleteAuthor(id: ID!): [Author]
    # addAuthor(name: String!, verified: Boolean!): Author
    # updateAuthor(id: ID!, name: String!, verified: Boolean!): Author
    # deleteReview(id: ID!): [Review]
    # addReview(rating: Int!, content: String!, game_id: ID!, author_id: ID!): Review
    # updateReview(id: ID!, rating: Int!, content: String!, game_id: ID!, author_id: ID!): Review
  }
`;


