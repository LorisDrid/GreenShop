import React from "react";
import { Post } from "../../interfaces/Blog";
import timeDateUtils from "../../utils/TimeDateUtils";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div>
      {post.image && (
        <a href={`/blog/${post.slug}`}>
          <img
            className="mb-5 rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            src={`${post.image}?w=1400&auto=format`}
            width={1400}
            height={340}
            alt={post.title}
          />
        </a>
      )}
      <h2 className="pb-3 text-xl font-semibold text-zinc-800 ">
        <a href={`/blog/${post.slug}`}>{post.title}</a>
      </h2>
      <div className="flex items-center space-x-2 text-zinc-500 ">
        <a href={`/author/${post.author?.slug}`}>
          <img
            className="h-8 w-8 rounded-full"
            src={`${post.author?.picture}?w=100&auto=format`}
            width={32}
            height={32}
            alt={post.title}
          ></img>
        </a>
        <div>
          <span>
            by{" "}
            <a
              href={`/author/${post.author?.slug}`}
              className="font-semibold text-green-600"
            >
              {post.author?.title}
            </a>{" "}
            on {timeDateUtils.stringToFriendlyDate(post.published_date)}
          </span>
        </div>
      </div>
    </div>
  );
}
