import { ChatContextProvider } from "./context";
import ChatLayout from "./layout";

function DirectRooms({ isAdmin }) {
  return (
    <ChatContextProvider isAdmin={isAdmin}>
      <ChatLayout />
    </ChatContextProvider>
  );
}

export default DirectRooms;
