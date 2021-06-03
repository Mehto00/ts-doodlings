import React from 'react';
import { useAxios } from 'use-axios-client';

interface Comment{
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
}

const App: React.FC = () => {
  const { data, error, loading } = useAxios<Comment[]>('http://jsonplaceholder.typicode.com/comments'); return (
    <div className="App">
      <h1>hello world</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {data && data.map((item) => <p>{item.name}</p>)}
    </div>
  );
};

export default App;
