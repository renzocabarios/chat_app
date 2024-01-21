"use client";
import { get } from "@/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import Button from "../Button";
import { useGroupsStore } from "@/states";
import { SOCKET } from "@/socket";

export default function Sidenav() {
  const groupStore = useGroupsStore() as any;
  const router = useRouter();

  useEffect(() => {
    fetchGroups();
  }, [groupStore.groups]);

  useEffect(() => {
    function onCreatedGroup(data: any) {
      console.log(data);

      groupStore.addGroup(data[0]);
    }

    SOCKET.on("createdGroup", onCreatedGroup);

    return () => {
      SOCKET.off(`createdGroup`, onCreatedGroup);
    };
  }, []);

  const fetchGroups = async () => {
    const { data } = await get("groups");
    groupStore.fetchGroups(data.data);
  };

  const goToCreateGroup = () => {
    router.push("create");
  };

  const goToGroup = (_id: string) => {
    router.push(`${_id}`);
  };

  return (
    <div className={style.container}>
      <Button title="Create Group" onClick={goToCreateGroup}></Button>

      <div className="flex flex-col">
        {groupStore.groups.map((e: any) => (
          <div
            key={e._id}
            className={style.group_container}
            onClick={() => {
              goToGroup(e._id);
            }}
          >
            <p>{e.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
