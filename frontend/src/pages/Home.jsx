import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
// import { WorkoutContextProvider } from './context/WorkoutContext';

const Home = () => {
  const { state, dispatch } = useWorkoutContext();
  const { workouts } = state;


  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts');
      const json = await response.json();

      if (response.ok) {
        console.log(json); // Debug log
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
      
      {/* {workouts && workouts.map(w => <div key={w._id}>{w.title}</div>)} */}
    </div>
  );
};

export default Home;
