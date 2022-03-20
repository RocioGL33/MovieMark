import React from "react";
import { useState, useEffect } from "react";
import { getMovies, getAvailables, postAvailable } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";

/* NO FUNCIONA EL ERROR */

export default function CreateAvailable() {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);
    const availables = useSelector((state) => state.availables)

    useEffect(() => {
        dispatch(getMovies());
    }, []);

    useEffect(() => {
        dispatch(getAvailables());
    }, []);


    console.log("MOVIES", movies)

    const horarioFunciones = ["18:30", "19:30", "21", "22"]
    let horarios = horarioFunciones
    let error = ""


    function handleHalls(){
        setInput({
            ...input,
            hall: e.target.value
        })
    }


    const [input, setInput] = useState({
        name: "",
        date: "",
        hour: "",
        hall: "",
        hallTickets: 48,
    })

    function handleSelectMovie(e) {
        e.preventDefault();
        setInput({
            ...input,
            name: e.target.value
        })
    }

    function handleDate(e) {
        if (availables.map(r => r.date === e.target.value)) {
            error = ""
            console.log("INPUT", input.date)
            let movieSameDate = availables.filter(r => r.date === e.target.value);
            console.log("MOVIES IN THE SAME DATE", movieSameDate)

            if (movieSameDate.length === 4) {
                error = "All functions taken, try with another Date"
                console.log(error)
            }

            if (movieSameDate.length < 4) {
                error = ""
                for (let i = 0; i < movieSameDate.length; i++) {
                    horarios = horarios.filter(e => e !== movieSameDate[i].hour)
                }
                console.log("FINNNNNDD", horarios)

                setInput({
                    ...input,
                    date: e.target.value
                })
            }
        }
    }


    function handleSelectHour(e) {
        e.preventDefault();
        setInput({
            ...input,
            hour: e.target.value
        })
    }


    function handleSubmit(e) {
        console.log("FINAL", input)
        if (input.name && input.date && input.hour && input.hall) {
            e.preventDefault();
            dispatch(postAvailable(input));
            alert("Function created");
            setInput({
                name: "",
                date: "",
                hour: "",
                hall: null,
                hallTickets: 48,
            });
    } else {
        e.preventDefault();
        alert("You should check name, date and hour fields!");
    }
}


return (
    <div >
        <h1>Add a function</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <div>
                    <label>Movie:</label>
                    <select onChange={e => handleSelectMovie(e)}>
                        <option>Choose</option>
                        {movies?.map((movie) => {
                            return <option value={movie.title}>{movie.title}</option>
                        })
                        }
                    </select>
                </div>
                <div>
                    <label>Choose a date</label>
                    <input value={input.date} type="date" name="date"
                        min="2022-03-18" onChange={e => handleDate(e)}>
                    </input>
                    {
                        input.date ?
                            <div>
                                {error.length > 0 ?
                                    <p>All functions taken, try with another Date</p> :
                                    <div>
                                        <div>
                                            <label>Select hour</label>
                                            <select onChange={e => handleSelectHour(e)} name="hour">
                                                <option>Select hour</option>
                                                {
                                                    horarios.map(e => <option value={e} name="hour">{e}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            {
                                                (input.hour === "") ?
                                                    <div></div> :
                                                    (input.hour === "18:30" || input.hour === "21") ?
                                                        <div>
                                                            <label>Hall:</label>
                                                            <h3>1</h3>
                                                        </div>
                                                        :
                                                        <div>
                                                            <label>Hall:</label>
                                                            <h3>2</h3>
                                                        </div>
                                            }
                                        </div>
                                    </div>
                                }
                            </div> : <div></div>
                    }
                </div>
            </div>
            <button type="submit">Add function</button>
        </form>
    </div>

)
}