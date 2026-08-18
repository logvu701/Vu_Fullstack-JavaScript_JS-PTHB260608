import React from 'react';

function UserProfile({ name, role }) {
  return (
    <div className="profile-card">
      <div className="profile-content">
        <div className="profile-avatar">
          {name ? name.charAt(0) : 'U'}
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-role">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
