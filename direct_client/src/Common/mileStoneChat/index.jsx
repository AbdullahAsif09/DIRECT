import { ChatContextProvider } from "./context";
import ChatLayout from "./layout";

function MileStoneChat() {
  return (
    <ChatContextProvider>
      <ChatLayout />
    </ChatContextProvider>
  );
}

export default MileStoneChat;
