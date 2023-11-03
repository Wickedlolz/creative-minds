import { MessageProps } from "../types";

const Message = ({ children, post }: MessageProps) => {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-2">
        <img src={post?.avatar} className="w-10 h-10 rounded-full" />
        <h2 className="font-bold">{post?.username}</h2>
      </div>
      <div className="py-4">
        <p>{post?.description}</p>
      </div>
      {children}
    </div>
  );
};

export default Message;
