import React from 'react';

const RepoList = (props) => {
  const repoList = props.repos.map(repo =>
    <div key={repo.user + repo.name}>
      <img className="avatar" src={repo.avatar} height="30" width="30"/><br />
      <div>
        User:{repo.user}<br />
        Repo:{repo.name}
      </div>
    </div>
    
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