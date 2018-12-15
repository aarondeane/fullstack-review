import React from 'react';

const RepoList = (props) => {
  const repoList = props.repos.map(repo =>
    <div>User:{repo.user}<br />
         Repo:{repo.name}</div>
    );
  
  return(  
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>{repoList}</div>
  </div>
  );
}

export default RepoList;