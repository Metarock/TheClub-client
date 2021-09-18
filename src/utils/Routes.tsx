import React from 'react';
import { Route } from 'react-router-dom';
import ChangePassword from '../pages/changePassword/[token]';
import { CreatePage } from '../pages/create-page';
import { CreatePost } from '../pages/create-post';
import { EditPage } from '../pages/edit/[id]';
import { EditPost } from '../pages/editPost/[id]';
import ForgotPassword from '../pages/forgot-password';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { Page } from '../pages/[id]';


export const Routes: React.FC = () => {
        return (
                <>      <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/change-password/:token" component={ChangePassword} />
                        <Route exact path="/forgot-password" component={ForgotPassword} />
                        <Route exact path="/create-page" component={CreatePage} />
                        <Route exact path="/create-post" component={CreatePost} />
                        <Route exact path="/pages/:id" component={Page} />
                        <Route exact path="/pages/edit/:id" component={EditPage} />
                        <Route exact path="/pages/editPost/:id" component={EditPost} />
                </>
        );
}