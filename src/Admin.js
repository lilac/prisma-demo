import React from 'react';
import {Admin, Resource} from 'react-admin';
import {PostList, PostCreate, PostEdit} from './posts';
import {UserList} from "./users";
import Dashboard from './dashboard';
import authProvider from './authProvider';
import buildPrismaProvider from 'react-admin-prisma';

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

const app = ({dataProvider}) =>
    <Admin title={zhDomain["title"]} dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}
           locale="zh" i18nProvider={i18nProvider}>
        <Resource name="Post" list={PostList} create={PostCreate} edit={PostEdit} icon={PostIcon}/>
        <Resource name="Agent" list={UserList} icon={UserIcon}/>
    </Admin>;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { dataProvider: null };
    }

    componentDidMount() {
        buildPrismaProvider({
            clientOptions: { uri: this.props.uri }
        }).then(dataProvider => this.setState({ dataProvider }));
    }

    render() {
        const {dataProvider} = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }
        return app(this.state)
    }
}

export default App;
