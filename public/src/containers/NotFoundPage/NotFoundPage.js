import React from 'react';
import { Header } from 'semantic-ui-react';

import './NotFoundPage.css';

export class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <div className="not-found-page">
        <Header as="h1">Page not found</Header>
      </div>
    );
  }
}

export default NotFoundPage;
