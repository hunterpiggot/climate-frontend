import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { IAppDispatch, IRootState } from "../store/root";

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

type DispatchFunc = () => IAppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
