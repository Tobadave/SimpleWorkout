import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';

export const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault() //stops the default action when the submit action triggered (page refresh)
        
        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {

            method : 'POST',
            body : JSON.stringify(workout),
            headers : {
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json()
        
        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.setEmptyFields)
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }


    return (
    <>
        <form className='create' action="" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label> Excercise Title </label>
            <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={emptyFields.includes('title') ? 'error' : ''}
             />

            <label> Load(in kg) :</label>
            <input 
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className={emptyFields.includes('load') ? 'error' : ''}
             />

            <label> Reps: </label>
            <input 
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className={emptyFields.includes('reps') ? 'error' : ''}
             />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    </>
  )
}

export default WorkoutForm;
