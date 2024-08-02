import { Post } from "../../interfaces/Blog";
import timeDateUtils from "../../utils/TimeDateUtils";

export default function AuthorAttribution({
  post,
}: {
  post: Post;
}): JSX.Element {
  return (
    <div className="flex space-x-1">
      <span>by</span>
      <a
        href={`/blog/author/${post?.author?.slug}`}
        className="font-semibold text-green-600"
      >
        {post?.author?.title}
      </a>
      <span>on {timeDateUtils.stringToFriendlyDate(post?.published_date)}</span>
    </div>
  );
}
