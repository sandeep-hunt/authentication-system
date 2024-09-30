import { useState, useEffect } from 'react';
import API from '../api';

function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await API.get('/profile');
            setProfile(data);
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {profile ? (
                <div>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default Profile;
