import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl, BASE_API_REPORT_URL} from "./api-url/api-urls";
import {createAsyncThunk} from "@reduxjs/toolkit";

interface IPlan {
    year: number;
    id: number;
    name?: string;
    messageApi: any;
}

// Создание API
export const fetchIndPlanReport = createAsyncThunk(
    'report/fetchIndPlanReport',
    async ({year, id, name, messageApi}: IPlan, thunkAPI) => {
        try {
            const response = await fetch(apiUrl.getPlan(year, id), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `ИндивидуальныйПлан${year}_${name}.xlsx`;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            messageApi.open({
                key: 'updatable',
                type: 'success',
                content: 'Отчёт получен',
                duration: 2,
            });
        } catch (error) {
            messageApi.open({
                key: 'updatable',
                type: 'error',
                content: 'Произошла ошибка при генерации отчёта',
                duration: 2,
            });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
