import React from 'react'
import axios from 'axios'
import {
  Card,
  Image,
  Header,
} from 'semantic-ui-react'

class Home extends React.Component {
  state = { books: [] }

  componentDidMount() {
    axios.get('/api/books')
      .then(res => {
        this.setState({ books: res.data })
      })
  }

  listBooks() {
    return this.state.books.map((b, i ) => {
      return (
        <Card key={i}>
          <Image src={b.image} onClick={() => window.open(b.url, "_blank")} style={{ height: '300px', width: '200px', cursor: 'pointer' }} />
          <Card.Content>
            <Card.Header>{b.title}</Card.Header>
            <Card.Meta>
              <span>Author: {b.author}</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            Avg Rating: {b.avg_rating} - {b.num_ratings} ratings - Published in {b.published}
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return(
      <>
        <Header textAlign='center'>
          Top 50 Fiction Books
        </Header>
        <Card.Group flex justifyContent='center' itemsPerRow={6}>
          {this.listBooks()}
        </Card.Group>
      </>
    )
  }
}

export default Home
