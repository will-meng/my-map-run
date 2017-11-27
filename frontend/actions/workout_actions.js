import * as WorkoutAPIUtils from '../utils/workout_apil_util';
import { startLoading, stopLoading } from './loading_actions';

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS';
export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT';
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT';
export const RECEIVE_WORKOUT_ERRORS = 'RECEIVE_WORKOUT_ERRORS';

const receiveWorkouts = payload => ({
  type: RECEIVE_WORKOUTS,
  payload
});

const receiveWorkout = workout => ({
  type: RECEIVE_WORKOUT,
  workout
});

const removeWorkout = workoutId => ({
  type: REMOVE_WORKOUT,
  workoutId
});

const receiveWorkoutErrors = errors => ({
  type: RECEIVE_WORKOUT_ERRORS,
  errors
});

export const requestWorkouts = () => dispatch => {
  dispatch(startLoading());
  return WorkoutAPIUtils.fetchWorkouts()
    .then(payload => dispatch(receiveWorkouts(payload)), console.log);
};

export const requestUserWorkouts = userId => dispatch => {
  dispatch(startLoading());
  return WorkoutAPIUtils.fetchUserWorkouts(userId)
    .then(workouts => dispatch(receiveWorkouts(workouts)), console.log);
};

export const requestWorkout = workoutId => dispatch => {
  dispatch(startLoading());
  return WorkoutAPIUtils.fetchWorkout(workoutId)
    .then(workout => dispatch(receiveWorkout(workout)), console.log);
};

export const createWorkout = workoutForm => dispatch => {
  dispatch(startLoading());
  return WorkoutAPIUtils.createWorkout(workoutForm)
    .then(workout => dispatch(receiveWorkout(workout)),
      errors => dispatch(receiveWorkoutErrors(errors.responseJSON)));
};

export const updateWorkout = workoutForm => dispatch => {
  dispatch(startLoading());
  return WorkoutAPIUtils.updateWorkout(workoutForm)
    .then(workout => dispatch(receiveWorkout(workout)),
      errors => dispatch(receiveWorkoutErrors(errors.responseJSON)));
};

export const deleteWorkout = workoutId => dispatch => (
  WorkoutAPIUtils.deleteWorkout(workoutId)
    .then(workout => dispatch(removeWorkout(workout.id)), console.log)
);