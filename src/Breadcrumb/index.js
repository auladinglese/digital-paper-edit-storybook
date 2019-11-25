import React from 'react';
import PropTypes from 'prop-types';

import BreadcrumbBS from 'react-bootstrap/Breadcrumb';
import { Route, Link } from 'react-router-dom';

const Breadcrumb = props => {
  const breadcrumbs = props.items.map(item => {
    if (item.link) {
      return (
        <Link key={ item.name } to={ item.link }>
          <BreadcrumbBS.Item>{item.name}</BreadcrumbBS.Item>
        </Link>
      );
    } else {
      return (
        <BreadcrumbBS.Item key={ item.name } active>
          {item.name}
        </BreadcrumbBS.Item>
      );
    }
  });

  return (
    <div>
      <BreadcrumbBS>{breadcrumbs}</BreadcrumbBS>
    </div>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.array
};

Breadcrumb.defaultProps = {
  items: [
    {
      name: 'Projects',
      link: '/projects'
    },
    {
      name: 'Sample Project Name'
    }
  ]
};

export { Breadcrumb };
