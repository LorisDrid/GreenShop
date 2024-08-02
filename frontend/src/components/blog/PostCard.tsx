import React from "react";
import { Post } from "../../interfaces/Blog";
import { Link } from "react-router-dom";
import AuthorAvatar from "./AuthorAvatar";
import AuthorAttribution from "./AuthorAttribution";
import ArrowRight from "./ArrowLeft";
import Tag from "./Tag";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div>
      {post.image && (
        <Link to={`/blog/${post.slug}`}>
          <img
            className="mb-5 h-auto w-full rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
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
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-2 text-zinc-500 md:space-y-0">
          <AuthorAvatar post={post} />
          <AuthorAttribution post={post} />
        </div>
        <div className="flex select-none justify-start space-x-2 font-bold md:hidden md:justify-end">
          {post.categories &&
            post.categories.map((category) => (
              <Tag key={category.title}>{category.title}</Tag>
            ))}
        </div>
      </div>
      <div
        className="py-6 text-zinc-500"
        dangerouslySetInnerHTML={{ __html: post.teaser ?? "" }}
      />
      <div className="flex items-center justify-between font-semibold text-green-600">
        <a href={`/blog/${post.slug}`}>
          <div className="flex items-center space-x-2">
            <span>Read more</span>
            <ArrowRight className="h-4 w-4 text-inherit" />
          </div>
        </a>
        <div className="hidden select-none justify-end space-x-2 md:flex ">
          {post.categories &&
            post.categories.map((category) => (
              <Tag key={category.title}>{category.title}</Tag>
            ))}
        </div>
      </div>
    </div>
  );
}
