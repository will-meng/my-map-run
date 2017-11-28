import * as RouteAPIUtils from '../utils/route_api_util';
import { startLoading } from './loading_actions';

export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';
export const RECEIVE_ROUTE_ERRORS = 'RECEIVE_ROUTE_ERRORS';

const receiveRoutes = payload => ({
  type: RECEIVE_ROUTES,
  payload
});

const receiveRoute = route => ({
  type: RECEIVE_ROUTE,
  route
});

const removeRoute = routeId => ({
  type: REMOVE_ROUTE,
  routeId
});

const receiveRouteErrors = errors => ({
  type: RECEIVE_ROUTE_ERRORS,
  errors
});

export const requestRoutes = () => dispatch => {
  dispatch(startLoading());
  return RouteAPIUtils.fetchRoutes()
    .then(payload => dispatch(receiveRoutes(payload)), console.log);
};

export const requestUserRoutes = userId => dispatch => {
  dispatch(startLoading());
  return RouteAPIUtils.fetchUserRoutes(userId)
    .then(routes => dispatch(receiveRoutes(routes)), console.log);
};

export const requestRoute = routeId => dispatch => {
  dispatch(startLoading());
  return RouteAPIUtils.fetchRoute(routeId)
    .then(route => dispatch(receiveRoute(route)), console.log);
};

export const createRoute = routeForm => dispatch => {
  dispatch(startLoading());
  return RouteAPIUtils.createRoute(routeForm)
    .then(route => dispatch(receiveRoute(route)),
      errors => dispatch(receiveRouteErrors(errors.responseJSON)));
};

export const updateRoute = routeForm => dispatch => {
  dispatch(startLoading());
  return RouteAPIUtils.updateRoute(routeForm)
    .then(route => dispatch(receiveRoute(route)),
      errors => dispatch(receiveRouteErrors(errors.responseJSON)));
};

export const deleteRoute = routeId => dispatch => {
  dispatch(startLoading());
  return RouteAPIUtils.deleteRoute(routeId)
    .then(route => dispatch(removeRoute(route.id)), console.log);
};