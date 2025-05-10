import React, { useState, useEffect } from 'react';
import { FiImage, FiMessageSquare, FiGithub, FiTwitter, FiHeart } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { formatDistanceToNow } from 'date-fns';
import AuthModal from '../components/AuthModal';
import K from '../assets/kieani.jpg';
import D from '../assets/a2.jpeg';
import A from '../assets/a3.webp';
import { useNavigate } from 'react-router-dom';

const CommunityFeed = () => {
  const initialPosts = [
    
    
    
    {
      id: 8,
      content: "Doing workout outdoors is a different level of motivation!",
      media: K,
      timestamp: new Date(Date.now() - 7200 * 1000),
      likes: 45874,
      user: {
        name: 'keiani',
        avatar: 'https://i.pravatar.cc/102',
      },
    },
    {
      id: 9,
      content: "Keeping my body hydrated is my top priority!",
      media: D,
      timestamp: new Date(Date.now() - 7200 * 1000),
      likes: 65874,
      user: {
        name: 'davidlaid',
        avatar: 'https://i.pravatar.cc/102',
      },
    },
    {
      id: 10,
      content: "Hello everyone! I am new to this community and looking forward to share my fitness journey with you all!",
      media: A,
      timestamp: new Date(Date.now() - 7200 * 1000),
      likes: 50874,
      user: {
        name: 'annabel.lucinda',
        avatar: 'https://i.pravatar.cc/102',
      },
    },
  ];
 
  const[user,setUser]=useState(false);
  useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      }
    }, []);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: '', media: null });
  const [preview, setPreview] = useState(null);
  const [replies, setReplies] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [showReplyBox, setShowReplyBox] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [following, setFollowing] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false); // Auth modal state
  const navigate = useNavigate();

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
      console.log("User:", user);  // Check if the 'user' object is valid
  console.log("User ID:", user ? user.userid : "User is null");
      if (!user) {
        setShowAuthModal(true); // Show the modal if user is not logged in
      }
    }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const handleFollow = (userName) => {
    const updatedFollowing = new Set(following);
    if (updatedFollowing.has(userName)) {
      updatedFollowing.delete(userName); // Unfollow
    } else {
      updatedFollowing.add(userName); // Follow
    }
    setFollowing(updatedFollowing);
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setNewPost({ ...newPost, media: file });
    setPreview(URL.createObjectURL(file));
  };

  const handlePostSubmit = () => {
    if (!newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      content: newPost.content,
      media: preview,
      timestamp: new Date(),
      likes: 0,
      user: {
        name: user.name,
        avatar: 'https://i.pravatar.cc/100',
      },
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', media: null });
    setPreview(null);
  };

  const handleLike = (postId) => {
    const isLiked = likedPosts.has(postId);
    const updatedSet = new Set(likedPosts);

    if (isLiked) {
      updatedSet.delete(postId);
    } else {
      updatedSet.add(postId);
    }

    setLikedPosts(updatedSet);

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + (isLiked ? -1 : 1) }
          : post
      )
    );
  };

  const toggleReplyBox = (postId) => {
    setShowReplyBox((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleReplyChange = (postId, value) => {
    setReplyInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleReplySubmit = (postId) => {
    const replyText = replyInputs[postId]?.trim();
    if (!replyText) return;

    setReplies((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), replyText],
    }));

    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
  };
  const closeAuthModal = () => {
    setShowAuthModal(false);
    window.location.reload();
  };

  return (
    <> {showAuthModal && (
        <AuthModal
          showLoginInitially={true} // Show login tab initially
          onClose={closeAuthModal} // Close modal and redirect
        />
      )}
    <div className="p-6 max-w-3xl mx-auto animate-fadeIn">
      <h2 className="text-4xl font-bold mb-8 text-center text-emerald-600 dark:text-emerald-400">
        Community Feed
      </h2>

      {/* Create Post */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="user avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              placeholder="What's on your mind?"
              className="w-full p-3 border dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows="3"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            {preview && (
              <img src={preview} alt="preview" className="mt-3 rounded-xl max-h-64 object-cover" />
            )}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer text-emerald-600 dark:text-emerald-400 hover:underline">
                <FiImage className="text-lg" />
                <span className="text-sm">Add Media</span>
                <input type="file" className="hidden" onChange={handleMediaChange} />
              </label>
              <button
                onClick={handlePostSubmit}
                className="bg-emerald-500 hover:bg-emerald-600 transition px-5 py-2 text-sm rounded-full text-white font-semibold shadow"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-8">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white dark:bg-gray-800 p-5 rounded-2xl shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="flex-1 space-y-3">
                    <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="w-4/5 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
              </div>
            ))
          : posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700 animate-fadeIn"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={post.user.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-base">{post.user.name}</h4>
                      <span className="text-xs text-gray-500">
                        • {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                      </span>
                      <button
                        onClick={() => handleFollow(post.user.name)}
                        className={`text-sm ${following.has(post.user.name) ? 'text-blue-500' : 'text-gray-500'} hover:underline`}
                      >
                        {following.has(post.user.name) ? 'Unfollow' : 'Follow'}
                      </button>
                    </div>
                    <p className="text-sm mt-1">{post.content}</p>
                    {post.media && (
                      <img
                        src={post.media}
                        alt="post media"
                        className="w-full mt-3 rounded-xl max-h-80 object-cover border border-gray-300 dark:border-gray-600"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300 mt-2">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 hover:text-red-500 transition"
                  >
                    {likedPosts.has(post.id) ? (
                      <AiFillHeart className="text-red-500 text-lg" />
                    ) : (
                      <AiOutlineHeart className="text-lg" />
                    )}
                    {post.likes}
                  </button>
                  <button
                    onClick={() => toggleReplyBox(post.id)}
                    className="flex items-center gap-1 hover:text-blue-500 transition"
                  >
                    <FiMessageSquare className="text-lg" />
                    Reply
                  </button>
                </div>

                {showReplyBox[post.id] && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={replyInputs[post.id] || ''}
                      onChange={(e) => handleReplyChange(post.id, e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 mt-2 focus:outline-none"
                    />
                    <button
                      onClick={() => handleReplySubmit(post.id)}
                      className="mt-3 px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm shadow"
                    >
                      Submit Reply
                    </button>
                  </div>
                )}

                {replies[post.id] && replies[post.id].length > 0 && (
                  <div className="mt-4 ml-4 space-y-2 border-l-2 pl-3 border-gray-200 dark:border-gray-700">
                    {replies[post.id].map((reply, idx) => (
                      <div key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                        💬 {reply}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
      </div>

      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <div className="flex justify-center gap-4 mb-2">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition">
            <FiGithub className="inline-block text-xl" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition">
            <FiTwitter className="inline-block text-xl" />
          </a>
        </div>
        <p>
          Made with <FiHeart className="inline-block text-red-500 mx-1" /> by farhanadil FitMe 
        </p>
        <p className="text-xs mt-1">&copy; {new Date().getFullYear()} FitMe. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default CommunityFeed;
