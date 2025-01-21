import React, { useEffect, useRef, useState } from "react";

const Chat = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const websocket = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      // Connect to WebSocket
      const websocketUrl = `ws://localhost:8000/ws/chat/${selectedUser.id}/`;

      websocket.current = new WebSocket(websocketUrl);

      websocket.current.onopen = () => {
        console.log("WebSocket connection established.");
      };

      websocket.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      websocket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      };

      fetchMessages();

      return () => {
        if (websocket.current) {
          websocket.current.close();
        }
      };
    }
  }, [selectedUser]);

  const fetchMessages = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/messages/${selectedUser.id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && websocket.current) {
      websocket.current.send(
        JSON.stringify({
          message: newMessage,
          recipient: selectedUser.id,
        })
      );
      setNewMessage("");
    }
  };

  return (
    <main className="flex flex-col p-4 h-full">
      {selectedUser ? (
        <>
          {/* <div className="flex flex-col space-y-4"> */}
          <div className="messages space-y-4 flex-grow max-h-[100vh] overflow-y-auto p-4 bg-gray-100 rounded-lg drop-shadow-2xl mt-10">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.sender === localStorage.getItem("username")
                    ? "bg-blue-200 self-end"
                    : "bg-gray-200 self-start"
                } p-2 rounded-lg max-w-[80%]`}
              >
                <p>{message.content}</p>
                <small className="block text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex mt-4 space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </form>
        </>
      ) : (
        <div className="text-center text-gray-600 mt-20">
          Select a user to start chatting.
        </div>
      )}
    </main>
  );
};

export default Chat;
