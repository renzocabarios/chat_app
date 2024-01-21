"use client";
import { Button, InputField } from "@/components";
import { get, post } from "@/config";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useAuthStore, useMessageStore } from "@/states";
import { SOCKET } from "@/socket";

export default function Home() {
  const messageStore = useMessageStore() as any;
  const authStore = useAuthStore() as any;
  const [formData, setFormData] = useState({ content: "" });
  const params = useParams();

  useEffect(() => {
    function onClientConnected(data: any) {
      authStore.fetchClientId(data.clientId);
    }

    SOCKET.on("clientConnected", onClientConnected);

    return () => {
      SOCKET.off(`clientConnected`, onClientConnected);
    };
  }, []);

  useEffect(() => {
    function onCreateMessage(data: any) {
      messageStore.addMessage(data.data);
    }

    SOCKET.on(`createdMessage/${params.id}`, onCreateMessage);

    fetchMessages();

    return () => {
      SOCKET.off(`createdMessage/${params.id}`, onCreateMessage);
    };
  }, [messageStore.messages, params.id, authStore.clientId]);

  const fetchMessages = async () => {
    const { data } = await get(`messages/?find={"group": "${params.id}"}`);
    messageStore.fetchMessages(data.data);
  };

  const handleInput = (event: any) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = async () => {
    await post(`messages`, {
      ...formData,
      group: params.id,
      clientId: authStore.clientId,
    });

    setFormData({ content: "" });
  };

  return (
    <main className="flex flex-col h-full">
      <p>{authStore.clientId ?? "NULL"}</p>
      <div className={style.messages_container}>
        {messageStore.messages.map((e: any) => (
          <div
            key={e._id}
            className={`flex ${
              e?.clientId && e?.clientId == authStore?.clientId
                ? "justify-end"
                : ""
            }`}
          >
            <p>{e.content}</p>
          </div>
        ))}
      </div>
      <div className={style.reply_container}>
        <InputField
          value={formData.content}
          name="content"
          onChange={handleInput}
        />
        <Button title="Send Message" onClick={handleForm} />
      </div>
      {/* <div className="h-11/12 bg-red-950 w-full">1</div>
      <div className="h-1/12 bg-red-950 w-full">1</div> */}
    </main>
  );
}
