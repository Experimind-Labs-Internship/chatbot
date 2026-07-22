import { useEffect, useState } from "react";
import {
  getAllMessages,
  deleteMessage,
} from "../../firebase/contactService";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    const data = await getAllMessages();
    setMessages(data);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) return;

    await deleteMessage(id);

    loadMessages();
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-serif mb-8">
        Contact Messages
      </h1>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center">
          No messages yet.
        </div>
      ) : (

        <div className="space-y-6">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className="bg-white rounded-2xl shadow-sm border p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-semibold">
                    {msg.name}
                  </h2>

                  <p className="text-gray-500">
                    {msg.email}
                  </p>

                  <p className="text-gray-500">
                    {msg.phone}
                  </p>

                </div>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>

              </div>

              <div className="mt-6">

                <p className="font-medium">
                  Message
                </p>

                <p className="mt-2 text-gray-600">
                  {msg.message}
                </p>

              </div>

              <div className="mt-6 text-sm text-gray-400">
                {msg.createdAt?.toDate().toLocaleString()}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}