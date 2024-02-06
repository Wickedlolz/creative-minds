import { MessageType } from "../types.ts";

type MessageItemType = {
    message: MessageType;
}

const MessageItem = ({ message }: MessageItemType) => {
    return (
        <div
            className='bg-white p-4 my-4 border-2'
            key={message.time}
        >
            <div className='flex items-center gap-2 mb-4'>
                <img
                    width={40}
                    height={40}
                    className='w-10 h-10 rounded-full'
                    src={message.avatar}
                    alt={message.message}
                    loading='lazy'
                />
                <h2 className='font-bold'>
                    {message.userName}
                </h2>
            </div>
            <h2>{message.message}</h2>
        </div>
    );
}

export default MessageItem;
