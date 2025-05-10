import React, { useEffect, useState } from 'react';
import { FiMail, FiEdit3, FiActivity, FiSettings, FiX } from 'react-icons/fi';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setEditForm(parsed); // pre-fill edit form
    }
  }, []);

  const handleChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('users', JSON.stringify(editForm));
    setUser(editForm);
    setEditOpen(false);
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
        No user data found. Please log in.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fadeIn relative">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-6">
          <img
            src={user.avatar || 'https://i.pravatar.cc/150?img=68'}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-emerald-500 object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded-full shadow"
              >
                <FiEdit3 /> Edit Profile
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 flex items-center gap-2">
              <FiMail /> {user.email}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm">{user.bio || 'No bio set.'}</p>
            <p className="text-xs mt-1 text-gray-400">Joined {user.joined || 'Recently'}</p>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="flex justify-around mt-8 text-center">
          <div>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{user.posts || 0}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Posts</p>
          </div>
          <div>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{user.followers || 10}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Followers</p>
          </div>
          <div>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{user.following || 10}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Following</p>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
            <FiSettings className="text-lg" />
            Account Settings
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setEditOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Profile</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editForm.name}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editForm.email}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                name="avatar"
                placeholder="Avatar URL"
                value={editForm.avatar}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <textarea
                name="bio"
                rows={3}
                placeholder="Bio"
                value={editForm.bio}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                onClick={handleSave}
                className="w-full py-2 px-4 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
