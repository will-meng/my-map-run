import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions';
import { RECEIVE_ROUTES, REMOVE_ROUTE } from '../actions/route_actions';
import { RECEIVE_WORKOUTS, RECEIVE_WORKOUT } from '../actions/workout_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let userId, newUsers;

  switch (action.type) {
    case RECEIVE_USER:
      userId = Object.keys(action.payload.users)[0];
      const user = action.payload.users[userId];
      newUsers = merge({}, state, action.payload.users);
      newUsers[userId].recent_route_ids = user.recent_route_ids;
      newUsers[userId].recent_workout_ids = user.recent_workout_ids;
      return newUsers;
    case RECEIVE_USERS:
    case RECEIVE_WORKOUTS:
    case RECEIVE_WORKOUT:
      return merge({}, state, action.payload.users);
    case RECEIVE_ROUTES:
      if (action.payload.users) {
        return merge({}, state, action.payload.users);
      }
      return state;
    case REMOVE_ROUTE:
      newUsers = merge({}, state);
      newUsers[action.route.creator_id].routeIds = 
        newUsers[action.route.creator_id].routeIds.filter(el => el !== action.route.id)
      return newUsers;
    default:
      return state;
  }
};

export default usersReducer;