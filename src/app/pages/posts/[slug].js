import { useRouter } from 'next/router';

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Author: {post.userId}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch('https://dummyjson.com/posts');
  const data = await response.json();
  const paths = data.posts.map(post => ({
    params: { slug: post.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`https://dummyjson.com/posts/${params.slug}`);
  const post = await response.json();

  return { props: { post } };
}