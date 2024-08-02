import React from "react";
import PostCard from "../components/blog/PostCard";
import axios from "axios";
import { Author, Post } from "../interfaces/Blog";

export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const author = await getAuthor({ params });
  return {
    title: `${author.title} posts | Simple React Blog`,
  };
}

async function getAuthor({ params }: { params: { id: string; slug: string } }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/author/${params.id}`,
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching author ${params.id} :`, error);
  }
  return Promise.resolve({} as Author);
}

async function getAuthorPosts({ authorId }: { authorId: string }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/author/${authorId}/posts`,
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching posts for author ${authorId} :`, error);
  }
  return Promise.resolve([]);
}

export default async ({ params }: { params: { id: string; slug: string } }) => {
  const author = await getAuthor({ params });
  const posts = await getAuthorPosts({ authorId: author.id });

  return (
    <main className="mx-auto w-full max-w-3xl flex-col px-4 lg:px-0">
      <h1 className="my-4 text-4xl font-bold leading-tight tracking-tight text-zinc-700 ">
        Posts by {author.title}
      </h1>
      <div className="space-y-16">
        {!posts && "You must add at least one Post to your Bucket"}
        {posts &&
          posts.map((post: Post) => {
            return (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            );
          })}
      </div>
    </main>
  );
};
