import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {PostList, PostCreate, PostEdit} from './posts';
import {UserList} from "./users";
import Dashboard from './dashboard';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () =>
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} icon={PostIcon}/>
        <Resource name="users" list={UserList} icon={UserIcon}/>
    </Admin>;

export default App;
