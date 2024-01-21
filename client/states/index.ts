import { create } from "zustand";

export const useGroupsStore = create((set) => ({
  groups: [],
  selectedGroup: null,
  fetchGroups: (groups: any[]) => set(() => ({ groups: groups })),
  changeSelected: (group: any) => set(() => ({ selectedGroup: group })),
  addGroup: (group: any) =>
    set((state: any) => ({ messages: [group, ...state.groups] })),
}));

export const useMessageStore = create((set) => ({
  messages: [],
  fetchMessages: (messages: any[]) => set(() => ({ messages: messages })),
  addMessage: (message: any) =>
    set((state: any) => ({ messages: [message, ...state.messages] })),
}));

export const useAuthStore = create((set) => ({
  clientId: null,
  fetchClientId: (clientId: string) => set(() => ({ clientId: clientId })),
}));
