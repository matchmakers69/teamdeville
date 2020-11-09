import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
  query PostsData {
    posts {
      nodes {
        id
        databaseId
        title
        slug
        date
        content
        author {
          name
        }
      }
    }
  }
`;

export const homePageContentQuery = gql`
  query getPageBySlug($slug: String!) {
    page: pageBy(uri: $slug) {
      id
      slug
      content
    }
  }
`;

export const slidesQuery = gql`
  {
    slides {
      nodes {
        id
        content
        featuredImage {
          altText
          mediaItemUrl
        }
      }
    }
  }
`;

export const deliveryQuery = gql`
  {
    delivery {
      nodes {
        id
        title
        content
      }
    }
  }
`;

export const MENU_QUERY = gql`
  query menu($id: ID!) {
    menu(id: $id) {
      id
      slug
      menuItems {
        nodes {
          id
          url
          label
        }
      }
    }
  }
`;

export const SIGN_IN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(
      input: {
        clientMutationId: "uniqueId"
        username: $username
        password: $password
      }
    ) {
      authToken
      user {
        id
        name
      }
    }
  }
`;
