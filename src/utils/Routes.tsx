import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Post } from '../pages/create/post/[id]';
import { Home, Login, Register, ChangePassword, ForgotPassword, CreatePage, CreatePost, Page, EditPage, EditPost, EditProfile } from '../pages/exportPage';


export const Routes: React.FC = () => {
        return (
                <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/change-password/:token" component={ChangePassword} />
                        <Route exact path="/forgot-password" component={ForgotPassword} />
                        <Route exact path="/create-page" component={CreatePage} />
                        <Route exact path="/create-post" component={CreatePost} />
                        <Route exact path="/pages/:id" component={Page} />
                        <Route exact path="/pages/edit/:id" component={EditPage} />
                        <Route exact path="/post/:id" component={Post} />
                        <Route exact path="/post/editPost/:id" component={EditPost} />
                        <Route exact path="/edit-profile" component={EditProfile} />
                </Switch>

        );
}