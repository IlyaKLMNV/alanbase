import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '../../types/api';
import { fetchUsers } from '../../api/fetchUsers';
import UserOption from './UserOption';
import styles from './Select.module.scss';

const Select: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<{ total: number | null }>({ total: null });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const loadUsers = async () => {
    if (loading || (meta.total !== null && users.length >= meta.total)) return;

    setLoading(true);
    try {
      const response = await fetchUsers(page, 50);
      setUsers((prev) => [...prev, ...response.data]);
      setMeta({ total: response.meta.total });
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isOpen && users.length === 0) {
      loadUsers();
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      loadUsers();
    }
  };

  const selectUser = useCallback((user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
  }, []);

  const memoizedUserOptions = useMemo(() => {
    return users.map((user) => (
      <UserOption key={user.id} user={user} onSelect={selectUser} />
    ));
  }, [users, selectUser]);

  return (
    <div className={`${styles.select} ${isOpen ? styles.open : ''}`}>
      <button className={styles.selectButton} onClick={toggleDropdown}>
        {selectedUser
          ? `${selectedUser.last_name} ${selectedUser.first_name}, ${selectedUser.job || 'No job title'}`
          : 'Select a user'}
      </button>
      {isOpen && (
        <div className={styles.dropdown} onScroll={handleScroll}>
          {memoizedUserOptions}
          {loading && <div className={styles.spinner}>Loading...</div>}
          {!loading && meta.total !== null && users.length >= meta.total && (
            <div className={styles.noMoreData}>No more users</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
