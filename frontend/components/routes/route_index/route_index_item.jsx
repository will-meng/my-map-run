import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/route_api_util';

const RouteIndexItem = ({ route, handleDelete, currentUser }) => (
  <tr>
  <td className='thumbnailCell'>
    <Link to={`/route/${route.id}`}>
      <img src={`https://maps.googleapis.com/maps/api/staticmap?size=75x75&path=weight:3%7Ccolor:0xff0000aa%7Cenc:${route.polyline}&key=${gsk}`}/>
    </Link>
  </td>
  <td><Link to={`/route/${route.id}`}>
    <span>{formatDate(route)}</span></Link>
  </td>
  <td><span>{route.distance} mi</span></td>
  <td><Link to={`/route/${route.id}`}>{route.name}</Link></td>
  <td nowrap='true'>{route.city}</td>
  {optionsButtons(route, currentUser, handleDelete)}
  </tr>
);

const optionsButtons = (route, currentUser, handleDelete) => {
  if (currentUser && route.creator_id === currentUser.id)
    return (
      <td>
      <Link to={`/route/edit/${route.id}`}><span>Edit</span></Link><br/>
      <a onClick={() => handleDelete(route.id)}>
        <span>Delete</span>
      </a>
      </td>
    );
  else
    return (<td></td>);
};

export default RouteIndexItem;