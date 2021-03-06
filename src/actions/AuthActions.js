import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  NAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
 } from './types';


export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};


export const loginUser = ({ email, password }) => {
    return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => loginUserFail(dispatch));
  };
};

export const signup = () => {
  return () => {
  Actions.signup();
  };
};

export const createUser = ({ email, password, name }) => {
  return (dispatch) => {
  dispatch({ type: LOGIN_USER });

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(user => loginUserSuccess(dispatch, user))
  .catch(() => loginUserFail(dispatch));
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => loginUserSuccess(dispatch, user));
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/info`)
    .set({
      username: name, Email: email
    });
  };
};
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS, payload: user
  });

  Actions.main();
};
