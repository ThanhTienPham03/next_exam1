import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const fetchPosts = async () => {
    const response = await fetch(`https://dummyjson.com/posts?skip=${(page - 1) * 10}&limit=10&q=${search}`);
    const data = await response.json();
    setPosts(data.posts);
    setTotalPages(Math.ceil(data.total / 10));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <input 
        type="text" 
        placeholder="Search posts..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>
                <h2>{post.title}</h2>
                <p>{post.body.substring(0, 50)}...</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {page < totalPages && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
}