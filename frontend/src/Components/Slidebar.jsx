import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';

export default function Slidebar() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersSnapshot = await db.collection('users').get();
                const usersData = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="sidebar">
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => onUserClick(user)}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
