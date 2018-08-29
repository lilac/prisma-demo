import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {PostList, PostCreate, PostEdit} from './posts';
import {UserList} from "./users";
import Dashboard from './dashboard';
import authProvider from './authProvider';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import englishMessages from 'ra-language-english';
import zhMessages from 'ra-language-chinese';
import * as zhDomain from './i18n/zh';

const messages = {
    zh: {...zhMessages, ...zhDomain},
    en: englishMessages,
};
const i18nProvider = locale => messages[locale];

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () =>
    <Admin title={zhDomain["title"]} dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}
           locale="zh" i18nProvider={i18nProvider}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} icon={PostIcon}/>
        <Resource name="users" list={UserList} icon={UserIcon}/>
    </Admin>;

export default App;
