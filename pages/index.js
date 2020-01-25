import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

const QUERY = gql`
  query Posts {
    posts {
      nodes {
        id
        title
      }
    }
  }
`

const Index = () => {
  const { loading, data } = useQuery(QUERY)

  if (loading || !data) {
    return <h1>loading...</h1>
  }
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.posts.nodes.map((post, key) => (
          <li key={key}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Index
