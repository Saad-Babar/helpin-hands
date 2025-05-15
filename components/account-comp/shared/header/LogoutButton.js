import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const LogoutButton = () => {
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
            });

            if (res.ok) {
                toast.info('Logged out successfully!');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                toast.error('Logout failed!');
            }
        } catch (err) {
            toast.error('An error occurred while logging out.');
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="dropdown-item"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    border: 'none',
                    background: 'none',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'inherit',
                }}
            >
                <i><FiLogOut /></i>
                <span style={{ marginLeft: '8px' }}>Logout</span>
            </button>

            {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(2px)',

                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            width: '300px',
                            textAlign: 'center',
                        }}
                    >
                        <p>Are you sure you want to logout?</p>
                        <div style={{ marginTop: '1rem' }}>
                            <button
                                onClick={handleLogout}
                                style={{
                                    marginRight: '10px',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#007BFF',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#6c757d',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutButton;
