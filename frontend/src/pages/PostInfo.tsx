import React, { useEffect } from "react";
import AuthorAvatar from "../components/blog/AuthorAvatar";
import AuthorAttribution from "../components/blog/AuthorAttribution";
import SuggestedPostCard from "../components/blog/SuggestedPostCard";
import { Post } from "../interfaces/Blog";
import axios from "axios";
import ArrowLeft from "../components/blog/ArrowLeft";
import Tag from "../components/blog/Tag";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

async function getPost(slug: string): Promise<Post> {
  try {
    // Get post
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${slug}`,
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching post ${slug} :`, error);
  }
  return Promise.resolve({} as Post);
}

async function getRelatedPosts(slug: string): Promise<Post[]> {
  try {
    // Get suggested posts
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${slug}/related`,
    );
    const suggestedPosts: Post[] = response.data;
    return Promise.resolve(suggestedPosts);
  } catch (error) {
    console.log(`Error fetching related posts ${slug} :`, error);
  }
  return Promise.resolve([]);
}

const PostInfo = () => {
  const [post, setPost] = React.useState<Post | null>(null);
  const [suggestedPosts, setSuggestedPosts] = React.useState<Post[] | null>(
    null,
  );
  const { slug } = useParams() as { slug: string };

  useEffect(() => {
    getPost(slug).then((post) => setPost(post));
    getRelatedPosts(slug).then((posts) => setSuggestedPosts(posts));
    console.log(suggestedPosts);
  }, [slug]);

  const cleanHTML = DOMPurify.sanitize(post?.content || "");

  return (
    <>
      {post && post.image && (
        <img
          className="mb-5 h-auto w-full bg-no-repeat object-cover object-center"
          src={require(`../assets/blog/post/${post.image}`)}
          width={2000}
          height={640}
          alt={post.title}
        />
      )}
      <main className="mx-auto flex flex-col justify-center">
        <div className="mx-auto flex w-full flex-col items-start justify-center px-4 md:flex-row">
          <div className="mt-4 flex justify-start pb-4 md:justify-center md:pb-0 md:pr-20">
            <a
              href="/blog"
              className="rounded-full border border-zinc-100 bg-white p-2 text-zinc-700 shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
          <div className="mr-20 flex w-full max-w-3xl flex-col justify-start md:w-3/4">
            <h2>
              {!post && <div className="text-center">Post Not found</div>}
              {post && <a href={`/blog/${post.slug}`}>{post.title}</a>}
            </h2>
            {post && (
              <>
                <div className="flex flex-col justify-between space-y-4 pb-8 md:flex-row md:space-y-0">
                  <div className="flex items-center space-x-2 text-zinc-500  md:space-y-0">
                    <AuthorAvatar post={post} />
                    <AuthorAttribution post={post} />
                  </div>
                  <div className="flex select-none justify-start space-x-2 md:justify-end">
                    {post.categories &&
                      post.categories.map((category) => (
                        <Tag key={category.title}>{category.title}</Tag>
                      ))}
                  </div>
                </div>
                <hr className="w-full border-t border-zinc-300 pb-8 " />
                <div
                  dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
                ></div>
              </>
            )}
            <div className="mx-auto mt-8 w-full">
              <hr className="w-full border-t border-zinc-300 pb-8 " />
              {suggestedPosts && (
                <div className="flex w-full flex-col px-4 lg:px-0">
                  <h3 className="pb-3 text-xl font-semibold text-zinc-800 ">
                    Suggested Posts
                  </h3>
                  <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    {suggestedPosts.slice(0, 2).map((post) => {
                      return <SuggestedPostCard key={post.id} post={post} />;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PostInfo;
