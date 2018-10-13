import React from 'react'
import axios from 'axios'
import {
  Card,
  Image,
  Header,
  Container,
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
           <Card.Meta>Average Rating: {b.avg_rating}</Card.Meta> 
           <Card.Meta>{b.num_ratings} Ratings</Card.Meta>
           <Card.Meta>Published in {b.published}</Card.Meta>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return(
      <>
        <Container>
          <Header textAlign='center'>
            Top 50 Fiction Books
            <Header.Subheader>
              Brought to you by 'GoodReads'
            </Header.Subheader>
          </Header>
          <Card.Group flex justifyContent='center' itemsPerRow={5}>
            {this.listBooks()}
          </Card.Group>
        </Container>
      </>
    )
  }
}

export default Home
