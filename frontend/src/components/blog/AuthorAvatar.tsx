import { Post } from "../../interfaces/Blog";

export default function AuthorAvatar({ post }: { post: Post }): JSX.Element {
  return (
    <a href={`/author/${post?.author?.slug}`}>
      <img
        className="h-8 w-8 rounded-full"
        src={require(`../../assets/blog/author/${post.author?.picture}`)}
        width={32}
        height={32}
        alt={post.title}
      ></img>
    </a>
  );
}
