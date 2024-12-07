import React from 'react';
import { User } from '../../types/api';
import styles from './Select.module.scss';

interface UserOptionProps {
  user: User;
  onSelect: (user: User) => void;
}

const UserOption: React.FC<UserOptionProps> = ({ user, onSelect }) => {
  return (
    <div className={styles.option} onClick={() => onSelect(user)}>
      <div className={styles.icon}>{user.last_name[0]}</div>
      <div className={styles.details}>
        <span className={styles.name}>
          {user.last_name} {user.first_name}
        </span>
        <span className={styles.job}>{user.job || 'No job title'}</span>
      </div>
    </div>
  );
};

export default React.memo(UserOption);
