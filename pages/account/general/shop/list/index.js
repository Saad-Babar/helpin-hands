import React, { useEffect, useState, useRef } from 'react';
import DuplicateLayout from '../../../duplicateLayout'
import AdminStyleWrapper from '../../../../../components/AdminStyleWrapper'
import PageHeader from '../../../../../components/account-comp/shared/pageHeader/PageHeader'
import Footer from '../../../../../components/account-comp/shared/Footer'

function useCurrentUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user || null);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    return { user, loading };
}

const ShopProductList = () => {
    const { user, loading: loadingUser } = useCurrentUser();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [popupPosition, setPopupPosition] = useState('bottom');
    const imageRefs = useRef({});

    useEffect(() => {
        if (!user) return;
        async function fetchProducts() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (user.role === 'admin') {
                    params.append('role', 'admin');
                } else {
                    params.append('userId', user.userId || user._id || user.id);
                    params.append('role', user.role);
                }
                const res = await fetch(`/api/products?${params.toString()}`);
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }
            } catch {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [user]);

    if (loadingUser) return <div>Loading user info...</div>;
    if (!user) return <div>Please log in to see your products.</div>;

    return (
        <AdminStyleWrapper>
            <DuplicateLayout>
                <div className="admin-content-wrapper">
                    <PageHeader>{/* <LeadsCreateHeader /> */}</PageHeader>

                    <div className="main-content">
                        <div className="row">
                            <div className="container py-4">
                                <h2 className="mb-4">{user.role === 'admin' ? 'All Products' : 'My Products'}</h2>
                                {loading ? (
                                    <div>Loading products...</div>
                                ) : products.length === 0 ? (
                                    <div>No products found.</div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>Price</th>
                                                    <th>Condition</th>
                                                    <th
                                                      style={{ minWidth: 160, textAlign: 'center' }}
                                                    >Main Image</th>
                                                    <th>Location</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>Created At</th>
                                                    {user.role === 'admin' && <th>User ID</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((p) => {
                                                    const mainIdx = p.mainImageIdx || 0;
                                                    const otherImages = (p.images || []).filter((img, idx) => idx !== mainIdx);
                                                    return (
                                                        <tr key={p._id}>
                                                            <td>{p.productName}</td>
                                                            <td>{p.price}</td>
                                                            <td>{p.condition}</td>
                                                            <td style={{ position: 'relative', minWidth: 160, textAlign: 'center' }}>
                                                                {p.images && p.images.length > 0 && (
                                                                    <div
                                                                        ref={el => (imageRefs.current[p._id] = el)}
                                                                        onMouseEnter={() => {
                                                                            setHoveredProductId(p._id);
                                                                            // Calculate popup position
                                                                            const el = imageRefs.current[p._id];
                                                                            if (el) {
                                                                                const rect = el.getBoundingClientRect();
                                                                                const viewportHeight = window.innerHeight;
                                                                                const viewportWidth = window.innerWidth;
                                                                                // Try bottom first
                                                                                if (rect.bottom + 110 < viewportHeight) {
                                                                                    setPopupPosition('bottom');
                                                                                } else if (rect.top - 110 > 0) {
                                                                                    setPopupPosition('top');
                                                                                } else if (rect.right + 160 < viewportWidth) {
                                                                                    setPopupPosition('right');
                                                                                } else {
                                                                                    setPopupPosition('left');
                                                                                }
                                                                            }
                                                                        }}
                                                                        onMouseLeave={() => setHoveredProductId(null)}
                                                                        style={{ display: 'inline-block' }}
                                                                    >
                                                                        <img
                                                                            src={p.images[mainIdx]}
                                                                            alt="main"
                                                                            style={{ width: 120, height: 60, objectFit: 'cover', borderRadius: 6, cursor: otherImages.length > 0 ? 'pointer' : 'default' }}
                                                                        />
                                                                        {hoveredProductId === p._id && otherImages.length > 0 && (
                                                                            <div
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    ...(popupPosition === 'bottom' && { top: '100%', left: 0, marginTop: 4 }),
                                                                                    ...(popupPosition === 'top' && { bottom: '100%', left: 0, marginBottom: 4 }),
                                                                                    ...(popupPosition === 'right' && { left: '100%', top: 0, marginLeft: 4 }),
                                                                                    ...(popupPosition === 'left' && { right: '100%', top: 0, marginRight: 4 }),
                                                                                    background: '#fff',
                                                                                    border: '1px solid #ccc',
                                                                                    borderRadius: 6,
                                                                                    padding: 6,
                                                                                    zIndex: 10,
                                                                                    display: 'flex',
                                                                                    gap: 6,
                                                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                                                                }}
                                                                            >
                                                                                {otherImages.map((img, idx) => (
                                                                                    <img
                                                                                        key={idx}
                                                                                        src={img}
                                                                                        alt={`other-${idx}`}
                                                                                        style={{ width: 140, height: 90, objectFit: 'cover', borderRadius: 10 }}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td>{[p.city, p.state, p.country].filter(Boolean).join(', ')}</td>
                                                            <td>{p.phone}</td>
                                                            <td>{p.email}</td>
                                                            <td>{new Date(p.createdAt).toLocaleString()}</td>
                                                            {user.role === 'admin' && <td>{p.userId}</td>}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </DuplicateLayout>
        </AdminStyleWrapper>
    );
};

export default ShopProductList;
