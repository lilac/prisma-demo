import React from "react";
import ReactDOM from "react-dom";
import {Container, CreateUser, Posts, NewPost} from "blog-components";

class App extends React.Component {
    state = {user: null, posts: []};
    createUser = name => {
        this.setState({user: {name}});
    };
    createPost = ({title, content}) => {
        this.setState({
            posts: [...this.state.posts, {title, content, author: this.state.user}]
        });
    };

    render() {
        return (
            <Container user={this.state.user}>
                <CreateUser createUser={this.createUser}/>
                <NewPost user={this.state.user} createPost={this.createPost}/>
                <Posts posts={this.state.posts}/>
            </Container>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
