import React, { useEffect } from "react";
import PostCard from "../components/blog/PostCard";
import axios from "axios";
import { Author, Post } from "../interfaces/Blog";
import { useParams } from "react-router-dom";
import ArrowLeft from "../components/blog/ArrowLeft";
import DOMPurify from "dompurify";

async function getAuthor(slug: string) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/posts/author/${slug}`,
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching author ${slug} :`, error);
  }
  return Promise.resolve(null);
}

async function getAuthorPosts(slug: string) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/posts/author/${slug}/posts`,
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching posts for author ${slug} :`, error);
  }
  return Promise.resolve([]);
}

const AuthorInfo = () => {
  const [posts, setPosts] = React.useState<Post[] | null>(null);
  const [author, setAuthor] = React.useState<Author | null>(null);
  const { slug } = useParams() as { slug: string };

  useEffect(() => {
    getAuthorPosts(slug).then((posts) => setPosts(posts));
    getAuthor(slug).then((author) => setAuthor(author));
  }, [slug]);

  if (!posts || !author) {
    return <div>Loading...</div>;
  }

  const cleanHTML = DOMPurify.sanitize(author.description || "");

  return (
    <>
      <div className="w-fit flex absolute mt-10 left-10 max-sm:left-5 max-sm:mt-1">
        <a
          href="/blog"
          className="rounded-full border border-zinc-100 bg-white p-2 text-zinc-700 shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
        </a>
      </div>
      <div className="mx-auto my-10 flex gap-6 items-center justify-center w-full max-w-6xl max-xl:flex-wrap-reverse">
        <div>
          <h1 className="text-green-600">{author.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        </div>
        <img
          src={require(`../assets/blog/author/${author.picture}`)}
          alt={author.title}
          className="h-128 w-128 rounded-full"
        />
      </div>
      <main className="mx-auto w-full max-w-3xl flex-col px-4 lg:px-0">
        <h1 className="my-4 text-4xl font-bold leading-tight tracking-tight text-zinc-700 ">
          Posts by {author.title}
        </h1>

        <div className="space-y-16">
          {!posts && "You must add at least one Post to your Bucket"}
          {posts &&
            posts.map((post: Post, index: number) => {
              return (
                <div key={index}>
                  <PostCard post={post} />
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default AuthorInfo;
