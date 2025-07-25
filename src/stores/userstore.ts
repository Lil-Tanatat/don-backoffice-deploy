import { create } from "zustand";

interface UserFilterState {
  keyword: string;
  selectedUserId: string | null;
  usernameFilter: string;
  setKeyword: (k: string) => void;
  setSelectedUserId: (id: string | null) => void;
  setUsernameFilter: (username: string) => void;
  clearFilters: () => void;
}

export const useUserStore = create<UserFilterState>((set) => ({
  keyword: "",
  selectedUserId: null,
  usernameFilter: "",
  setKeyword: (k) => set({ keyword: k }),
  setSelectedUserId: (id) => set({ selectedUserId: id }),
  setUsernameFilter: (username) => set({ usernameFilter: username }),
  clearFilters: () =>
    set({
      keyword: "",
      selectedUserId: null,
      usernameFilter: "",
    }),
}));
