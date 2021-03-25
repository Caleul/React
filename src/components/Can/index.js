import React from 'react';
import { useSelector } from 'react-redux';

export default function Can({ children }) {
  const admin = useSelector(state => state.auth.admin);
  return <>{admin && children} </>;
}
