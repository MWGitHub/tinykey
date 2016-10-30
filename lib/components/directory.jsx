import React, { PropTypes } from 'react';
import VaultConstants from '../constants/vault-constants';

export default function Directory(props) {
  const root = props.root;
  const output = root.map((data) => {
    if (data.type !== VaultConstants.TYPES.DIRECTORY) {
      return <li>{data.name}</li>;
    }

    return (
      <li>
        <p>{data.name}</p>
        <Directory root={data.children} />
      </li>
    );
  }, '');

  return (
    <ul>
      {output}
    </ul>
  );
}

Directory.propTypes = {
  root: PropTypes.array,
};
