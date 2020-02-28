import React from "react";
import {Link, withRouter} from 'react-router-dom';
import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, match }) => {
  return(
  <div className="collection-preview">
  <Link to={`${match.url}/${title.toLowerCase()}`}>
    <h1 className="title"> {title.toUpperCase()} </h1>
    </Link>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
  )};

export default withRouter(CollectionPreview);
