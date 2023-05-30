import Message from "./Message";

const Messages = () => {
  return (
    <div className="w-full h-full px-2 md:px-4 pb-2  flex flex-col overflow-y-scroll overflow-x-hidden bg-teal-500/10">
      <Message />
      <Message isOwner={true} />
      <Message />
      <Message />
      <Message isOwner={true} />
      <Message isOwner={true} />

    </div>
  );
};

export default Messages;
