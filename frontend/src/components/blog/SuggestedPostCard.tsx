import React from "react";
import { Post } from "../../interfaces/Blog";
import { Link } from "react-router-dom";
import AuthorAvatar from "../../components/blog/AuthorAvatar";
import AuthorAttribution from "../../components/blog/AuthorAttribution";

export default function SuggestedPostCard({ post }: { post: Post }) {
  return (
    <div>
      {post.image && (
        <Link to={`/blog/${post.slug}`}>
          <img
            className="mb-5 rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            src={require(`../../assets/blog/post/${post.image}`)}
            width={1400}
            height={340}
            alt={post.title}
          />
        </Link>
      )}
      <h2 className="pb-3 text-xl font-semibold text-zinc-800 ">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className="flex items-center space-x-2 text-zinc-500 ">
        <AuthorAvatar post={post} />
        <AuthorAttribution post={post} />
      </div>
    </div>
  );
}
