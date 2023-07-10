import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/api/movieApi'
import { ApiKey } from '../../common/api/MovieApiKey'

const initialState = {
    movies: {},
    shows: {},
    selectedmovieShow: {},
    fetching: false,
    hasData: false,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (term) => {
    const resp = await movieApi.get(`?apikey=${ApiKey}&s=${term}&t=movie`);
    // console.log(resp.data);
    return resp.data;
});

export const fetchShows = createAsyncThunk("movies/fetchShows", async (term) => {
    const resp = await movieApi.get(`?apikey=${ApiKey}&s=${term}&t=series`);
    return resp.data;
});

export const fetchMovieShowDetail = createAsyncThunk("movies/fetchMovieShowDetail", async (id) => {
    const resp = await movieApi.get(`?apikey=${ApiKey}&i=${id}&Plot=full`);
    return resp.data;
});

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieShow: (state, action) => {
            state.selectedmovieShow = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.fetching = true;
        }).addCase(fetchShows.pending, (state) => {
            state.fetching = true;
        }).addCase(fetchMovies.fulfilled, (state, action) => {
            state.fetching = false;
            state.hasData = true;
            state.movies = action.payload;
        }).addCase(fetchShows.fulfilled, (state, action) => {
            state.fetching = false;
            state.hasData = true;
            state.shows = action.payload;
        }).addCase(fetchMovieShowDetail.fulfilled, (state, action) => {
            // console.log("fetch fulfilled", action.payload.payload);
            state.selectedmovieShow = action.payload;
        })
    }
});

export const { removeSelectedMovieShow } = movieSlice.actions;
export const isFetchingData = (state) => state.movies.fetching;
export const hasFetchedData = (state) => state.movies.hasData;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getMovieShowDetail = (state) => state.movies.selectedmovieShow;


export default movieSlice.reducer;