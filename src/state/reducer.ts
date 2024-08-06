import { createAction, createReducer } from "@reduxjs/toolkit";
import { setupApplication } from "../sheep/setup";
import { Sheep, SheepModelType } from "../sheep/sheep";

export const sheep: Sheep = await setupApplication();

export type SheepData = {
    name: string
    body: string
    wool: string
}

export const defaultSheepData: SheepData = {
    name: "Sheep",
    body: sheep.defaultSrc.body,
    wool: sheep.defaultSrc.wool,
}

export const initialState = {
    woolEnabled: sheep.woolEnabled,
    sheep: defaultSheepData as SheepData
}

export type SheepState = typeof initialState

type SetTexture = { type: SheepModelType, src: string }
export const setCurrentTexture = createAction<SetTexture>("setStateTexture");
export const setCurrentName = createAction<string>("setCurrentName");
export const setStateWoolEnabled = createAction<boolean>("setStateWoolEnabled");
export const resetStateTexture = createAction<SheepModelType | undefined>("resetStateTexture");

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setCurrentTexture, (state, action) => {
            const { type, src } = action.payload;
            sheep.setSheepTextureFromUrl(type, src);
            state.sheep[type] = src;
        })
        .addCase(setStateWoolEnabled, (state, action) => {
            state.woolEnabled = action.payload;
            sheep.woolEnabled = action.payload;
        })
        .addCase(resetStateTexture, (state, action) => {
            const type = action.payload;
            sheep.resetSheepTexture(type);
            if (type) {
                state.sheep[type] = sheep.defaultSrc[type];
            }
            else {
                state.sheep.body = sheep.defaultSrc.body;
                state.sheep.wool = sheep.defaultSrc.wool;
            }
        })
        .addCase(setCurrentName, (state, action) => {
            state.sheep.name = action.payload;
        })
})