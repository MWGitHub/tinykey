import React, { PropTypes } from 'react';
import VaultConstants from '../constants/vault-constants';

export default function Directory(props) {
  const root = props.root;
  const output = root.map((data, i) => {
    if (data.type !== VaultConstants.TYPES.DIRECTORY) {
      return <li key={i}>{data.name}</li>;
    }

    return (
      <li key={i}>
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
