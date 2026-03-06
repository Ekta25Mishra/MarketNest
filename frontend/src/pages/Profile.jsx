import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [avatar, setAvatar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await userAPI.getProfile();
      setProfile(data);
      setFormData({ name: data.name, email: data.email });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      if (avatar) formDataToSend.append('avatar', avatar);

      const { data } = await userAPI.updateProfile(formDataToSend);
      setProfile(data.user);
      setEditing(false);
      setAvatar(null);
      
      const storedUser = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({ ...storedUser, ...data.user }));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleDelete = async () => {
    try {
      await userAPI.deleteProfile();
      await logout();
      navigate('/signup');
    } catch (error) {
      alert('Failed to delete account');
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Profile</h1>
        
        {!editing ? (
          <div style={styles.profileView}>
            {profile.avatar && (
              <img src={profile.avatar} alt="Avatar" style={styles.avatar} />
            )}
            <div style={styles.info}>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
            </div>
            <div style={styles.actions}>
              <button onClick={() => setEditing(true)} style={styles.editButton}>
                Edit Profile
              </button>
              <button onClick={() => setShowDeleteModal(true)} style={styles.deleteButton}>
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} style={styles.form}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              style={styles.input}
            />
            <div style={styles.formActions}>
              <button type="submit" style={styles.saveButton}>Save</button>
              <button type="button" onClick={() => setEditing(false)} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {showDeleteModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Delete Account?</h2>
            <p>This action cannot be undone.</p>
            <div style={styles.modalActions}>
              <button onClick={handleDelete} style={styles.confirmDelete}>
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem'
  },
  card: {
    backgroundColor: 'var(--bg-card)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)'
  },
  profileView: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center'
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  info: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)'
  },
  formActions: {
    display: 'flex',
    gap: '1rem'
  },
  editButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  deleteButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: 'var(--danger)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  saveButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  cancelButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: 'var(--text-secondary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'var(--bg-card)',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '400px',
    width: '90%'
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  confirmDelete: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: 'var(--danger)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default Profile;
