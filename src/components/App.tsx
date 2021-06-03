import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

http://jsonplaceholder.typicode.com/comments
interface Comment{
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
}

const CommentCard = styled.div`
  box-sizing: border-box;
  background-color: #bdbdbd;
  margin: 1rem 0;
  padding: 1rem 2rem;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
`

const App: React.FC = () => {
  const defaultComments:Comment[] = [];
  const [comments, setComments] = useState<Comment[]>(defaultComments);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  
  useEffect(() => {
    axios.get<Comment[]>("http://jsonplaceholder.typicode.com/comments", {
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
      setComments(response.data.slice(0, 5));
      setLoading(false);
    }).catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      setError(error);
      setLoading(false);
    });
}, []);

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {comments && comments.map((item) => 
      <CommentCard>
        <p><strong>{item.name}</strong></p>
        <p>{item.body}</p>
        <p>{item.email}</p>
      </CommentCard>
      )
      }
    </div>
  );
};

export default App;
