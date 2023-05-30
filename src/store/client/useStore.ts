import create from "zustand";
import createCounterSlice, { CounterSlice } from "./createCounterSlice";

export type MyState = CounterSlice;

const useStore = create<MyState>((set, get) => ({
  ...createCounterSlice(set, get),
}));

export default useStore;
