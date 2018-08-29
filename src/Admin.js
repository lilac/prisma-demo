import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {PostList, PostCreate, PostEdit} from './posts';
import {UserList} from "./users";

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () =>
    <Admin dataProvider={dataProvider}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit}/>
        <Resource name="users" list={UserList}/>
    </Admin>;

export default App;
