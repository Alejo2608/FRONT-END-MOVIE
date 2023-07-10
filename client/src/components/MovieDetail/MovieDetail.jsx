import React, { useEffect } from 'react';
import './MovieDetail.scss'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieShowDetail, getMovieShowDetail, removeSelectedMovieShow } from '../../features/movies/movieSlice';

const MovieDetail = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getMovieShowDetail);

    useEffect(() => {
        dispatch(fetchMovieShowDetail(imdbID))

        return () => {
            dispatch(removeSelectedMovieShow())
        }
    }, [imdbID])

    return (
        <div className='movie-section'>
            {
                Object.keys(data).length === 0 ?
                    <div>Loading...</div>
                    :
                    <>
                        <div className="section-left">
                            <div className="movie-title">{data.Title}</div>
                            <div className="movie-rating">
                                <span>
                                    IMDB Rating ⭐: {data.imdbRating}
                                </span>
                                <span>
                                    IMDB Votes 🧧: {data.imdbVotes}
                                </span>
                                <span>
                                    Runtime ⏲: {data.Runtime}
                                </span>
                                <span>
                                    Year 📅: {data.Year}
                                </span>
                            </div>
                            <div className="movie-plot">
                                {data.Plot}
                            </div>
                            <div className="movie-info">
                                <div>
                                    <span>Director</span>
                                    <span>{data.Director}</span>
                                </div>
                                <div>
                                    <span>Stars</span>
                                    <span>{data.Actors}</span>
                                </div>
                                <div>
                                    <span>Generes</span>
                                    <span>{data.Genre}</span>
                                </div>
                                <div>
                                    <span>Langugaes</span>
                                    <span>{data.Language}</span>
                                </div>
                                <div>
                                    <span>Awards</span>
                                    <span>{data.Awards}</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-right">
                            <img src={data.Poster} alt={data.Title} />
                        </div>
                    </>
            }
        </div>
    )
}

export default MovieDetail