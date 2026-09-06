import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, LayoutDashboard, FileText, FlaskConical, Tent, 
  ShoppingBag, Image as ImageIcon, MessageSquare, Inbox, LogOut, 
  Plus, Trash2, Edit3, CheckCircle, Clock, Search, RefreshCw, X, Upload,
  ChevronDown, Eye, Filter, Mail, Building2
} from 'lucide-react';
import { 
  loginAdmin, 
  getAdminProfile, 
  fetchDashboardStats, 
  fetchSiteContent, 
  updateSiteContent, 
  fetchPrograms, 
  fetchWorkshops, 
  fetchCamps, 
  fetchProducts, 
  fetchGallery, 
  fetchTestimonials, 
  fetchSchoolInquiries, 
  updateSchoolInquiryStatus, 
  deleteSchoolInquiry, 
  fetchContactSubmissions, 
  updateContactStatus, 
  deleteContactSubmission, 
  createItem, 
  updateItem, 
  deleteItem, 
  uploadImage 
} from '../services/api';

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('biospark_token'));
  const [user, setUser] = useState(null);
  
  // Login Form state
  const [loginEmail, setLoginEmail] = useState('admin@biospark.com');
  const [loginPassword, setLoginPassword] = useState('admin123456');
  const [loginError, setLoginError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiriesDropdownOpen, setInquiriesDropdownOpen] = useState(true);
  const [selectedInquiryDetail, setSelectedInquiryDetail] = useState(null);
  const [inquiryFilterSource, setInquiryFilterSource] = useState('ALL');
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState('ALL');

  // Stats
  const [stats, setStats] = useState(null);

  // Data lists
  const [siteContent, setSiteContent] = useState(null);
  const [programsList, setProgramsList] = useState([]);
  const [workshopsList, setWorkshopsList] = useState([]);
  const [campsList, setCampsList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [schoolInquiriesList, setSchoolInquiriesList] = useState([]);
  const [contactSubmissionsList, setContactSubmissionsList] = useState([]);

  // Modal / Form state for CRUD
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalResource, setModalResource] = useState('');
  const [formFields, setFormFields] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [notification, setNotification] = useState('');

  // Check existing login on load
  useEffect(() => {
    if (token) {
      getAdminProfile()
        .then(res => {
          if (res?.data?.data) setUser(res.data.data);
        })
        .catch(() => handleLogout());
    }
  }, [token]);

  // Sync URL hash with activeTab
  useEffect(() => {
    const syncHashWithTab = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      if (rawHash) {
        if (rawHash === 'inquiries') {
          setActiveTab('inquiries_all');
        } else {
          setActiveTab(rawHash);
        }
      }
    };
    syncHashWithTab();
    window.addEventListener('hashchange', syncHashWithTab);
    return () => window.removeEventListener('hashchange', syncHashWithTab);
  }, []);

  // Load active tab data
  useEffect(() => {
    if (!token) return;

    if (activeTab === 'overview') {
      loadOverviewStats();
      loadInquiriesData();
    } else if (activeTab === 'content') {
      loadSiteContentData();
    } else if (activeTab === 'programs') {
      loadProgramsData();
    } else if (activeTab === 'workshops') {
      loadWorkshopsData();
    } else if (activeTab === 'camps') {
      loadCampsData();
    } else if (activeTab === 'products') {
      loadProductsData();
    } else if (activeTab === 'gallery') {
      loadGalleryData();
    } else if (activeTab === 'testimonials') {
      loadTestimonialsData();
    } else if (activeTab === 'inquiries' || activeTab.startsWith('inquiries')) {
      loadInquiriesData();
    }
  }, [token, activeTab]);

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setAuthenticating(true);
    try {
      const res = await loginAdmin({ email: loginEmail, password: loginPassword });
      if (res?.data?.token) {
        localStorage.setItem('biospark_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.data);
        showNotify('Welcome back, Admin!');
      }
    } catch (err) {
      setLoginError(err?.response?.data?.error || 'Invalid credentials.');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('biospark_token');
    setToken(null);
    setUser(null);
  };

  // --- Loaders ---
  const loadOverviewStats = async () => {
    try {
      const res = await fetchDashboardStats();
      if (res?.data?.data) setStats(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadSiteContentData = async () => {
    try {
      const res = await fetchSiteContent();
      if (res?.data?.data) setSiteContent(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadProgramsData = async () => {
    try {
      const res = await fetchPrograms();
      if (res?.data?.data) setProgramsList(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadWorkshopsData = async () => {
    try {
      const res = await fetchWorkshops();
      if (res?.data?.data) setWorkshopsList(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadCampsData = async () => {
    try {
      const res = await fetchCamps();
      if (res?.data?.data) setCampsList(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadProductsData = async () => {
    try {
      const res = await fetchProducts();
      if (res?.data?.data) setProductsList(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadGalleryData = async () => {
    try {
      const res = await fetchGallery();
      if (res?.data?.data) setGalleryList(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadTestimonialsData = async () => {
    try {
      const res = await fetchTestimonials();
      if (res?.data?.data) setTestimonialsList(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadInquiriesData = async () => {
    try {
      const [schRes, conRes] = await Promise.all([
        fetchSchoolInquiries(),
        fetchContactSubmissions()
      ]);
      if (schRes?.data?.data) setSchoolInquiriesList(schRes.data.data);
      if (conRes?.data?.data) setContactSubmissionsList(conRes.data.data);
    } catch (err) { console.error(err); }
  };

  // Image Upload Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setImageUploading(true);
    try {
      const res = await uploadImage(formData);
      if (res?.data?.data?.url) {
        setFormFields({ ...formFields, imageUrl: res.data.data.url });
        showNotify('Image uploaded successfully!');
      }
    } catch (err) {
      showNotify('Image upload failed: ' + (err?.response?.data?.error || err.message));
    } finally {
      setImageUploading(false);
    }
  };

  // --- Modal Open Helpers ---
  const openAddModal = (resource) => {
    setModalResource(resource);
    setEditingItem(null);
    if (resource === 'programs') {
      setFormFields({ title: '', category: 'School Workshops', shortDescription: '', fullDescription: '', imageUrl: '/main.png', active: true, featured: true });
    } else if (resource === 'workshops') {
      setFormFields({ title: '', category: 'Biotechnology', shortDescription: '', fullDescription: '', duration: '2 - 3 Hours', capacity: '24 Students', ageGroup: 'Grades 6 - 12', imageUrl: '/main.png', active: true, featured: true });
    } else if (resource === 'camps') {
      setFormFields({ title: '', category: 'Young Scientists', description: '', ageRange: 'Ages 12-15', duration: '5 Days', dates: 'August 2026', location: 'BioSpark STEM Campus', price: 200, capacity: '20 Students', imageUrl: '/main.png', active: true, featured: true });
    } else if (resource === 'products') {
      setFormFields({ title: '', category: 'Educational Kits', shortDescription: '', description: '', price: 29, salePrice: 0, stockStatus: 'In Stock', sku: 'BSP-NEW-01', imageUrl: '/main.png', active: true, featured: true });
    } else if (resource === 'gallery') {
      setFormFields({ title: '', category: 'Workshops', description: '', imageUrl: '/main.png', active: true, featured: true });
    } else if (resource === 'testimonials') {
      setFormFields({ name: '', role: 'Science Educator', organization: 'School Name', content: '', rating: 5, active: true, featured: true });
    }
    setModalOpen(true);
  };

  const openEditModal = (resource, item) => {
    setModalResource(resource);
    setEditingItem(item);
    setFormFields({ ...item });
    setModalOpen(true);
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingItem) {
        await updateItem(modalResource, editingItem._id, formFields);
        showNotify('Item updated successfully!');
      } else {
        await createItem(modalResource, formFields);
        showNotify('Item created successfully!');
      }
      setModalOpen(false);
      // Reload current tab
      if (modalResource === 'programs') loadProgramsData();
      if (modalResource === 'workshops') loadWorkshopsData();
      if (modalResource === 'camps') loadCampsData();
      if (modalResource === 'products') loadProductsData();
      if (modalResource === 'gallery') loadGalleryData();
      if (modalResource === 'testimonials') loadTestimonialsData();
    } catch (err) {
      showNotify('Error: ' + (err?.response?.data?.error || 'Operation failed'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteItem = async (resource, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteItem(resource, id);
      showNotify('Item deleted successfully!');
      if (resource === 'programs') loadProgramsData();
      if (resource === 'workshops') loadWorkshopsData();
      if (resource === 'camps') loadCampsData();
      if (resource === 'products') loadProductsData();
      if (resource === 'gallery') loadGalleryData();
      if (resource === 'testimonials') loadTestimonialsData();
    } catch (err) {
      showNotify('Delete failed: ' + (err?.response?.data?.error || 'Error'));
    }
  };

  // Inquiry Status Update
  const handleSchoolStatusChange = async (id, status) => {
    try {
      await updateSchoolInquiryStatus(id, { status });
      showNotify('School inquiry status updated!');
      loadInquiriesData();
    } catch (err) { showNotify('Failed to update status'); }
  };

  const handleContactStatusChange = async (id, status) => {
    try {
      await updateContactStatus(id, { status });
      showNotify('Contact submission status updated!');
      loadInquiriesData();
    } catch (err) { showNotify('Failed to update status'); }
  };

  const handleSaveSiteContent = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await updateSiteContent(siteContent);
      showNotify('Site content saved successfully!');
    } catch (err) {
      showNotify('Failed to save site content');
    } finally {
      setActionLoading(false);
    }
  };

  // LOGIN SCREEN IF NOT AUTHENTICATED
  if (!token) {
    return (
      <div className="admin-login-page">
        <div className="glass-panel login-card">
          <div className="login-header">
            <ShieldCheck size={48} color="#73C52A" />
            <h2>BioSpark Admin Access</h2>
            <p>Enter your administrator credentials to manage the platform.</p>
          </div>

          {loginError && <div className="error-box">{loginError}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Admin Email</label>
              <input 
                type="email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" disabled={authenticating} className="btn-primary login-btn">
              {authenticating ? 'Authenticating...' : 'Log In to Dashboard'}
            </button>
          </form>

          <div className="demo-credentials">
            <p><strong>Initial Admin Account:</strong></p>
            <code>Email: admin@biospark.com</code><br/>
            <code>Password: admin123456</code>
          </div>
        </div>

        <style>{`
          .admin-login-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            padding-top: 6rem;
          }
          .login-card {
            max-width: 440px;
            width: 100%;
            padding: 3rem 2.5rem;
          }
          .login-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          .login-header h2 {
            font-size: 1.8rem;
            color: #fff;
            margin: 1rem 0 0.5rem;
          }
          .login-header p {
            color: #94A3B8;
            font-size: 0.9rem;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
          }
          .login-form .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
          }
          .login-form label {
            color: #E2E8F0;
            font-size: 0.85rem;
            font-weight: 600;
          }
          .login-form input {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 10px;
            padding: 0.8rem 1rem;
            color: #fff;
            outline: none;
          }
          .login-btn {
            margin-top: 1rem;
            padding: 0.9rem;
            width: 100%;
          }
          .error-box {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid #EF4444;
            color: #FCA5A5;
            padding: 0.75rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.85rem;
          }
          .demo-credentials {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(115, 197, 42, 0.1);
            border: 1px dashed rgba(115, 197, 42, 0.3);
            border-radius: 8px;
            text-align: center;
            font-size: 0.8rem;
            color: #CBD5E1;
          }
          .demo-credentials code {
            color: #73C52A;
          }
        `}</style>
      </div>
    );
  }

  // DASHBOARD MAIN LAYOUT
  return (
    <div className="admin-dashboard-page">
      {/* Toast Notification */}
      {notification && (
        <div className="admin-notification glass-panel">
          <CheckCircle size={18} color="#73C52A" />
          <span>{notification}</span>
        </div>
      )}

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar glass-panel">
          <div className="sidebar-header">
            <ShieldCheck size={28} color="#73C52A" />
            <div>
              <h3>BioSpark Admin</h3>
              <span>{user?.email || 'admin@biospark.com'}</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <LayoutDashboard size={18} /><span>Overview</span>
            </button>
            <button className={`nav-item ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
              <FileText size={18} /><span>Content Manager</span>
            </button>
            <button className={`nav-item ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => setActiveTab('programs')}>
              <FlaskConical size={18} /><span>Programs</span>
            </button>
            <button className={`nav-item ${activeTab === 'workshops' ? 'active' : ''}`} onClick={() => setActiveTab('workshops')}>
              <FlaskConical size={18} /><span>Workshops</span>
            </button>
            <button className={`nav-item ${activeTab === 'camps' ? 'active' : ''}`} onClick={() => setActiveTab('camps')}>
              <Tent size={18} /><span>Camps</span>
            </button>
            <button className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
              <ShoppingBag size={18} /><span>Shop Products</span>
            </button>
            <button className={`nav-item ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
              <ImageIcon size={18} /><span>Gallery</span>
            </button>
            <button className={`nav-item ${activeTab === 'testimonials' ? 'active' : ''}`} onClick={() => setActiveTab('testimonials')}>
              <MessageSquare size={18} /><span>Testimonials</span>
            </button>
            {/* Collapsible Dropdown for Form Submissions */}
            <div className="sidebar-group">
              <button 
                className={`nav-item has-dropdown ${activeTab.startsWith('inquiries') ? 'active' : ''}`}
                onClick={() => setInquiriesDropdownOpen(!inquiriesDropdownOpen)}
              >
                <Inbox size={18} />
                <span>Form Messages</span>
                <ChevronDown 
                  size={16} 
                  style={{ 
                    marginLeft: 'auto', 
                    transform: inquiriesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease'
                  }} 
                />
              </button>

              {inquiriesDropdownOpen && (
                <div className="sidebar-sub-menu">
                  <button 
                    className={`sub-item ${activeTab === 'inquiries_all' || activeTab === 'inquiries' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('inquiries_all')}
                  >
                    <span>All Submissions (الكل)</span>
                    <span className="count-badge">{schoolInquiriesList.length + contactSubmissionsList.length}</span>
                  </button>
                  <button 
                    className={`sub-item ${activeTab === 'inquiries_schools' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('inquiries_schools')}
                  >
                    <span>School Inquiries (المدارس)</span>
                    <span className="count-badge">{schoolInquiriesList.length}</span>
                  </button>
                  <button 
                    className={`sub-item ${activeTab === 'inquiries_contact' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('inquiries_contact')}
                  >
                    <span>Contact Us (اتصل بنا)</span>
                    <span className="count-badge">{contactSubmissionsList.length}</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} /><span>Logout</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-main">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <h2>Dashboard Overview</h2>
              <p className="tab-subtitle">Real-time counts and key statistics across the BioSpark educational platform.</p>

              <div className="stats-grid">
                <div className="glass-panel stat-card">
                  <Inbox size={32} color="#73C52A" />
                  <div>
                    <h4>Total Inquiries</h4>
                    <h2>{stats?.totalInquiries ?? 0}</h2>
                    <span className="badge-new">{stats?.newInquiries ?? 0} New</span>
                  </div>
                </div>

                <div className="glass-panel stat-card">
                  <FlaskConical size={32} color="#73C52A" />
                  <div>
                    <h4>Workshops</h4>
                    <h2>{stats?.workshops ?? 0}</h2>
                  </div>
                </div>

                <div className="glass-panel stat-card">
                  <Tent size={32} color="#73C52A" />
                  <div>
                    <h4>Camps</h4>
                    <h2>{stats?.camps ?? 0}</h2>
                  </div>
                </div>

                <div className="glass-panel stat-card">
                  <ShoppingBag size={32} color="#73C52A" />
                  <div>
                    <h4>Products</h4>
                    <h2>{stats?.products ?? 0}</h2>
                  </div>
                </div>

                <div className="glass-panel stat-card">
                  <ImageIcon size={32} color="#73C52A" />
                  <div>
                    <h4>Gallery Items</h4>
                    <h2>{stats?.gallery ?? 0}</h2>
                  </div>
                </div>

                <div className="glass-panel stat-card">
                  <MessageSquare size={32} color="#73C52A" />
                  <div>
                    <h4>Testimonials</h4>
                    <h2>{stats?.testimonials ?? 0}</h2>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT MANAGER */}
          {activeTab === 'content' && siteContent && (
            <div className="tab-pane">
              <h2>Site Content Management</h2>
              <p className="tab-subtitle">Manage homepage hero content, CTA banners, and organizational copy.</p>

              <form onSubmit={handleSaveSiteContent} className="glass-panel content-form">
                <h3>Homepage Hero Section</h3>
                <div className="form-group">
                  <label>Hero Title</label>
                  <input 
                    type="text" 
                    value={siteContent.hero?.title || ''} 
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, title: e.target.value } })}
                  />
                </div>

                <div className="form-group">
                  <label>Hero Subtitle</label>
                  <input 
                    type="text" 
                    value={siteContent.hero?.subtitle || ''} 
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, subtitle: e.target.value } })}
                  />
                </div>

                <div className="form-group">
                  <label>Hero Description</label>
                  <textarea 
                    rows={3} 
                    value={siteContent.hero?.description || ''} 
                    onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, description: e.target.value } })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Primary CTA Text</label>
                    <input 
                      type="text" 
                      value={siteContent.hero?.primaryCtaText || ''} 
                      onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, primaryCtaText: e.target.value } })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Primary CTA Link</label>
                    <input 
                      type="text" 
                      value={siteContent.hero?.primaryCtaLink || ''} 
                      onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, primaryCtaLink: e.target.value } })}
                    />
                  </div>
                </div>

                <button type="submit" disabled={actionLoading} className="btn-primary" style={{ marginTop: '1.5rem' }}>
                  {actionLoading ? 'Saving...' : 'Save Site Content'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>Programs Management</h2>
                  <p className="tab-subtitle">Manage featured programs (School Workshops, Mobile Lab, Science Days, Custom Programs).</p>
                </div>
                <button className="btn-primary" onClick={() => openAddModal('programs')}>
                  <Plus size={18} /><span>Add Program</span>
                </button>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th><th>Title</th><th>Category</th><th>Description</th><th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programsList.map(prog => (
                      <tr key={prog._id}>
                        <td><img src={prog.imageUrl} alt="" className="thumb" onError={(e) => { e.target.src = '/main.png'; }} /></td>
                        <td><strong>{prog.title}</strong></td>
                        <td><span className="pill">{prog.category}</span></td>
                        <td><small style={{ color: '#CBD5E1', display: 'block', maxWidth: '300px' }}>{prog.shortDescription || prog.fullDescription || prog.description}</small></td>
                        <td><span className={`status-dot ${prog.active ? 'active' : ''}`}>{prog.active ? 'Active' : 'Inactive'}</span></td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" onClick={() => openEditModal('programs', prog)}><Edit3 size={16} /></button>
                            <button className="btn-icon danger" onClick={() => handleDeleteItem('programs', prog._id)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: WORKSHOPS */}
          {activeTab === 'workshops' && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>Workshops Management</h2>
                  <p className="tab-subtitle">Manage scientific workshops across Genetics, Microbiology, Biotechnology, Human Body, etc.</p>
                </div>
                <button className="btn-primary" onClick={() => openAddModal('workshops')}>
                  <Plus size={18} /><span>Add Workshop</span>
                </button>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th><th>Title</th><th>Category</th><th>Duration</th><th>Capacity</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workshopsList.map(ws => (
                      <tr key={ws._id}>
                        <td><img src={ws.imageUrl} alt="" className="thumb" onError={(e) => { e.target.src = '/main.png'; }} /></td>
                        <td><strong>{ws.title}</strong></td>
                        <td><span className="pill">{ws.category}</span></td>
                        <td>{ws.duration}</td>
                        <td>{ws.capacity}</td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" onClick={() => openEditModal('workshops', ws)}><Edit3 size={16} /></button>
                            <button className="btn-icon danger" onClick={() => handleDeleteItem('workshops', ws._id)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CAMPS */}
          {activeTab === 'camps' && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>Camps Management</h2>
                  <p className="tab-subtitle">Manage Junior Scientists, Young Scientists, and Future Biotechnologists camps.</p>
                </div>
                <button className="btn-primary" onClick={() => openAddModal('camps')}>
                  <Plus size={18} /><span>Add Camp</span>
                </button>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th><th>Title</th><th>Category</th><th>Dates</th><th>Price</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campsList.map(camp => (
                      <tr key={camp._id}>
                        <td><img src={camp.imageUrl} alt="" className="thumb" onError={(e) => { e.target.src = '/main.png'; }} /></td>
                        <td><strong>{camp.title}</strong></td>
                        <td><span className="pill">{camp.category}</span></td>
                        <td>{camp.dates}</td>
                        <td>${camp.price}</td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" onClick={() => openEditModal('camps', camp)}><Edit3 size={16} /></button>
                            <button className="btn-icon danger" onClick={() => handleDeleteItem('camps', camp._id)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SHOP PRODUCTS */}
          {activeTab === 'products' && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>Shop Products Management</h2>
                  <p className="tab-subtitle">Manage 3D models, educational kits, and BioSpark merchandise.</p>
                </div>
                <button className="btn-primary" onClick={() => openAddModal('products')}>
                  <Plus size={18} /><span>Add Product</span>
                </button>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th><th>Title</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsList.map(prod => (
                      <tr key={prod._id}>
                        <td><img src={prod.imageUrl} alt="" className="thumb" onError={(e) => { e.target.src = '/main.png'; }} /></td>
                        <td><strong>{prod.title}</strong></td>
                        <td><span className="pill">{prod.category}</span></td>
                        <td>${prod.price}</td>
                        <td><span className="stock-tag">{prod.stockStatus}</span></td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" onClick={() => openEditModal('products', prod)}><Edit3 size={16} /></button>
                            <button className="btn-icon danger" onClick={() => handleDeleteItem('products', prod._id)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>Gallery Management</h2>
                  <p className="tab-subtitle">Manage gallery images, titles, descriptions, and categories.</p>
                </div>
                <button className="btn-primary" onClick={() => openAddModal('gallery')}>
                  <Plus size={18} /><span>Add Gallery Image</span>
                </button>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th><th>Title</th><th>Category</th><th>Description</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryList.map(gal => (
                      <tr key={gal._id}>
                        <td><img src={gal.imageUrl} alt="" className="thumb" onError={(e) => { e.target.src = '/main.png'; }} /></td>
                        <td><strong>{gal.title}</strong></td>
                        <td><span className="pill">{gal.category}</span></td>
                        <td>{gal.description}</td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" onClick={() => openEditModal('gallery', gal)}><Edit3 size={16} /></button>
                            <button className="btn-icon danger" onClick={() => handleDeleteItem('gallery', gal._id)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>Testimonials Management</h2>
                  <p className="tab-subtitle">Manage reviews from school principals, educators, parents, and students.</p>
                </div>
                <button className="btn-primary" onClick={() => openAddModal('testimonials')}>
                  <Plus size={18} /><span>Add Testimonial</span>
                </button>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Role & Organization</th><th>Rating</th><th>Content</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonialsList.map(test => (
                      <tr key={test._id}>
                        <td><strong>{test.name}</strong></td>
                        <td>{test.role} — {test.organization}</td>
                        <td>⭐ {test.rating}/5</td>
                        <td>"{test.content}"</td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" onClick={() => openEditModal('testimonials', test)}><Edit3 size={16} /></button>
                            <button className="btn-icon danger" onClick={() => handleDeleteItem('testimonials', test._id)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: ALL INQUIRIES & SUBMISSIONS (جميع الرسائل) */}
          {(activeTab === 'inquiries_all' || activeTab === 'inquiries') && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>All Form Messages (جميع رسائل الفوُرم)</h2>
                  <p className="tab-subtitle">Combined view of all incoming messages from School Booking & Contact Us forms.</p>
                </div>
                <div className="tab-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onClick={() => { loadInquiriesData(); showNotify('Messages refreshed!'); }}
                  >
                    <RefreshCw size={15} />
                    <span>Refresh Messages</span>
                  </button>

                  <div className="filter-pill-group">
                    <button 
                      className={`filter-pill ${inquiryFilterSource === 'ALL' ? 'active' : ''}`}
                      onClick={() => setInquiryFilterSource('ALL')}
                    >
                      All Sources ({schoolInquiriesList.length + contactSubmissionsList.length})
                    </button>
                    <button 
                      className={`filter-pill ${inquiryFilterSource === 'SCHOOL' ? 'active' : ''}`}
                      onClick={() => setInquiryFilterSource('SCHOOL')}
                    >
                      🏫 Schools ({schoolInquiriesList.length})
                    </button>
                    <button 
                      className={`filter-pill ${inquiryFilterSource === 'CONTACT' ? 'active' : ''}`}
                      onClick={() => setInquiryFilterSource('CONTACT')}
                    >
                      ✉️ Contact Us ({contactSubmissionsList.length})
                    </button>
                  </div>
                </div>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Form Source</th>
                      <th>Sender / Institution</th>
                      <th>Email & Phone</th>
                      <th>Subject / Program</th>
                      <th>Message Snippet</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      ...schoolInquiriesList.map(inq => ({
                        _id: inq._id,
                        sourceKey: 'SCHOOL',
                        sourceBadge: '🏫 School Inquiry',
                        badgeClass: 'badge-school',
                        senderName: inq.schoolName,
                        contactPerson: inq.contactPerson,
                        email: inq.email,
                        phone: inq.phone,
                        subject: inq.interestedProgram || 'School Program Request',
                        message: inq.message || `Students: ${inq.studentCount || 'N/A'}, Grade: ${inq.studentGrade || 'N/A'}, Date: ${inq.preferredDate || 'N/A'}`,
                        status: inq.status || 'New',
                        rawItem: inq,
                        isSchool: true
                      })),
                      ...contactSubmissionsList.map(con => ({
                        _id: con._id,
                        sourceKey: 'CONTACT',
                        sourceBadge: '✉️ Contact Us',
                        badgeClass: 'badge-contact',
                        senderName: con.name,
                        contactPerson: con.name,
                        email: con.email,
                        phone: con.phone,
                        subject: con.subject || 'General Message',
                        message: con.message,
                        status: con.status || 'New',
                        rawItem: con,
                        isSchool: false
                      }))
                    ])
                    .filter(item => {
                      if (inquiryFilterSource !== 'ALL' && item.sourceKey !== inquiryFilterSource) return false;
                      if (inquiryFilterStatus !== 'ALL' && item.status !== inquiryFilterStatus) return false;
                      return true;
                    })
                    .map(item => (
                      <tr key={item._id}>
                        <td><span className={`source-tag ${item.badgeClass}`}>{item.sourceBadge}</span></td>
                        <td>
                          <strong>{item.senderName}</strong><br/>
                          <small style={{ color: '#94A3B8' }}>{item.contactPerson}</small>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem' }}>{item.email}</span><br/>
                          <small style={{ color: '#73C52A' }}>{item.phone}</small>
                        </td>
                        <td><span className="pill">{item.subject}</span></td>
                        <td><small style={{ color: '#CBD5E1', display: 'block', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.message || 'No message text'}</small></td>
                        <td>
                          <select 
                            value={item.status} 
                            onChange={(e) => item.isSchool ? handleSchoolStatusChange(item._id, e.target.value) : handleContactStatusChange(item._id, e.target.value)}
                            className={`status-select status-${item.status?.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" title="View Full Details" onClick={() => setSelectedInquiryDetail(item)}><Eye size={16} /></button>
                            <button className="btn-icon danger" title="Delete" onClick={() => {
                              if (window.confirm('Delete this submission?')) {
                                if (item.isSchool) deleteSchoolInquiry(item._id).then(() => loadInquiriesData());
                                else deleteContactSubmission(item._id).then(() => loadInquiriesData());
                              }
                            }}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: SCHOOL INQUIRIES SUB-PAGE */}
          {activeTab === 'inquiries_schools' && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>School Booking Inquiries (طلبات المدارس)</h2>
                  <p className="tab-subtitle">Inquiries submitted specifically through the "For Schools" program booking form.</p>
                </div>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>School Name</th>
                      <th>Contact Person</th>
                      <th>Email & Phone</th>
                      <th>Interested Program</th>
                      <th>Students / Grade</th>
                      <th>Preferred Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolInquiriesList.map(inq => (
                      <tr key={inq._id}>
                        <td><strong>{inq.schoolName}</strong></td>
                        <td>{inq.contactPerson}</td>
                        <td>{inq.email}<br/><small style={{ color: '#73C52A' }}>{inq.phone}</small></td>
                        <td><span className="pill">{inq.interestedProgram}</span></td>
                        <td><small>{inq.studentCount || 'N/A'} ({inq.studentGrade || 'N/A'})</small></td>
                        <td>{inq.preferredDate || 'N/A'}</td>
                        <td>
                          <select 
                            value={inq.status} 
                            onChange={(e) => handleSchoolStatusChange(inq._id, e.target.value)}
                            className={`status-select status-${inq.status?.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" title="View Full Details" onClick={() => setSelectedInquiryDetail({ ...inq, isSchool: true, senderName: inq.schoolName, sourceType: 'School Inquiry' })}><Eye size={16} /></button>
                            <button className="btn-icon danger" title="Delete" onClick={() => {
                              if (window.confirm('Delete this school inquiry?')) {
                                deleteSchoolInquiry(inq._id).then(() => loadInquiriesData());
                              }
                            }}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 11: CONTACT US SUB-PAGE */}
          {activeTab === 'inquiries_contact' && (
            <div className="tab-pane">
              <div className="tab-header">
                <div>
                  <h2>Contact Us Messages (رسائل اتصل بنا)</h2>
                  <p className="tab-subtitle">General messages and questions submitted through the Contact Us page.</p>
                </div>
              </div>

              <div className="admin-table-container glass-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sender Name</th>
                      <th>Email & Phone</th>
                      <th>Subject</th>
                      <th>Message Body</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactSubmissionsList.map(con => (
                      <tr key={con._id}>
                        <td><strong>{con.name}</strong></td>
                        <td>{con.email}<br/><small style={{ color: '#73C52A' }}>{con.phone}</small></td>
                        <td><span className="pill">{con.subject}</span></td>
                        <td><small style={{ color: '#CBD5E1', display: 'block', maxWidth: '320px' }}>{con.message}</small></td>
                        <td>
                          <select 
                            value={con.status} 
                            onChange={(e) => handleContactStatusChange(con._id, e.target.value)}
                            className={`status-select status-${con.status?.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon" title="View Details" onClick={() => setSelectedInquiryDetail({ ...con, isSchool: false, senderName: con.name, sourceType: 'Contact Us' })}><Eye size={16} /></button>
                            <button className="btn-icon danger" title="Delete" onClick={() => {
                              if (window.confirm('Delete this contact message?')) {
                                deleteContactSubmission(con._id).then(() => loadInquiriesData());
                              }
                            }}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CRUD MODAL FOR ITEMS */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? `Edit ${modalResource.slice(0, -1)}` : `Add New ${modalResource.slice(0, -1)}`}</h3>
              <button className="btn-icon" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveItem} className="modal-form">
              {/* Dynamic form inputs based on resource */}
              <div className="form-group">
                <label>Title / Name</label>
                <input 
                  type="text" 
                  value={formFields.title || formFields.name || ''} 
                  onChange={(e) => setFormFields({ ...formFields, title: e.target.value, name: e.target.value })}
                  required
                />
              </div>

              {formFields.category !== undefined && (
                <div className="form-group">
                  <label>Category</label>
                  <input 
                    type="text" 
                    value={formFields.category || ''} 
                    onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                  />
                </div>
              )}

              {formFields.shortDescription !== undefined && (
                <div className="form-group">
                  <label>Short Description</label>
                  <input 
                    type="text" 
                    value={formFields.shortDescription || ''} 
                    onChange={(e) => setFormFields({ ...formFields, shortDescription: e.target.value })}
                  />
                </div>
              )}

              {(formFields.description !== undefined || formFields.fullDescription !== undefined) && (
                <div className="form-group">
                  <label>Full Description / Content</label>
                  <textarea 
                    rows={4} 
                    value={formFields.description || formFields.fullDescription || formFields.content || ''} 
                    onChange={(e) => setFormFields({ ...formFields, description: e.target.value, fullDescription: e.target.value, content: e.target.value })}
                  />
                </div>
              )}

              {formFields.price !== undefined && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input 
                      type="number" 
                      value={formFields.price || 0} 
                      onChange={(e) => setFormFields({ ...formFields, price: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sale Price ($)</label>
                    <input 
                      type="number" 
                      value={formFields.salePrice || 0} 
                      onChange={(e) => setFormFields({ ...formFields, salePrice: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              )}

              {/* Image Upload Input */}
              {formFields.imageUrl !== undefined && (
                <div className="form-group">
                  <label>Image URL / Upload Image</label>
                  <input 
                    type="text" 
                    value={formFields.imageUrl || ''} 
                    onChange={(e) => setFormFields({ ...formFields, imageUrl: e.target.value })}
                    placeholder="/uploads/my-image.jpg or direct URL"
                  />
                  <div className="upload-box" style={{ marginTop: '0.5rem' }}>
                    <label className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <Upload size={14} />
                      <span>{imageUploading ? 'Uploading...' : 'Upload Image File'}</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>
              )}

              <button type="submit" disabled={actionLoading} className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                {actionLoading ? 'Saving...' : 'Save Item'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* INQUIRY DETAIL MODAL POPUP */}
      {selectedInquiryDetail && (
        <div className="admin-modal-overlay" onClick={() => setSelectedInquiryDetail(null)}>
          <div className="admin-modal-content glass-panel" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className={`source-tag ${selectedInquiryDetail.badgeClass || (selectedInquiryDetail.isSchool ? 'badge-school' : 'badge-contact')}`}>
                  {selectedInquiryDetail.sourceType || (selectedInquiryDetail.isSchool ? '🏫 School Inquiry' : '✉️ Contact Us')}
                </span>
                <h3 style={{ marginTop: '0.4rem' }}>{selectedInquiryDetail.senderName || selectedInquiryDetail.schoolName || selectedInquiryDetail.name}</h3>
              </div>
              <button className="btn-icon" onClick={() => setSelectedInquiryDetail(null)}><X size={20} /></button>
            </div>

            <div className="inquiry-detail-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#E2E8F0' }}>
              <div className="detail-row-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                <div>
                  <small style={{ color: '#94A3B8', display: 'block' }}>Email Address</small>
                  <strong>{selectedInquiryDetail.email || 'N/A'}</strong>
                </div>
                <div>
                  <small style={{ color: '#94A3B8', display: 'block' }}>Phone / WhatsApp</small>
                  <strong style={{ color: '#73C52A' }}>{selectedInquiryDetail.phone || 'N/A'}</strong>
                </div>
                {selectedInquiryDetail.contactPerson && (
                  <div>
                    <small style={{ color: '#94A3B8', display: 'block' }}>Contact Person</small>
                    <strong>{selectedInquiryDetail.contactPerson}</strong>
                  </div>
                )}
                {selectedInquiryDetail.interestedProgram && (
                  <div>
                    <small style={{ color: '#94A3B8', display: 'block' }}>Interested Program</small>
                    <strong>{selectedInquiryDetail.interestedProgram}</strong>
                  </div>
                )}
                {selectedInquiryDetail.studentCount && (
                  <div>
                    <small style={{ color: '#94A3B8', display: 'block' }}>Student Count</small>
                    <strong>{selectedInquiryDetail.studentCount}</strong>
                  </div>
                )}
                {selectedInquiryDetail.studentGrade && (
                  <div>
                    <small style={{ color: '#94A3B8', display: 'block' }}>Target Grade</small>
                    <strong>{selectedInquiryDetail.studentGrade}</strong>
                  </div>
                )}
                {selectedInquiryDetail.preferredDate && (
                  <div>
                    <small style={{ color: '#94A3B8', display: 'block' }}>Preferred Date</small>
                    <strong>{selectedInquiryDetail.preferredDate}</strong>
                  </div>
                )}
                {selectedInquiryDetail.subject && (
                  <div>
                    <small style={{ color: '#94A3B8', display: 'block' }}>Subject</small>
                    <strong>{selectedInquiryDetail.subject}</strong>
                  </div>
                )}
              </div>

              <div>
                <small style={{ color: '#94A3B8', display: 'block', marginBottom: '0.4rem' }}>Full Message / Special Requirements</small>
                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', padding: '1rem', borderRadius: '12px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                  {selectedInquiryDetail.message || 'No additional message text provided.'}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary" onClick={() => setSelectedInquiryDetail(null)}>Close Details</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-dashboard-page { padding-top: 5rem; min-height: 100vh; }
        .admin-notification { position: fixed; bottom: 2rem; right: 2rem; z-index: 2500; display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; background: rgba(1, 43, 125, 0.95); border: 1px solid #73C52A; color: #fff; border-radius: 12px; }
        .dashboard-container { max-width: 1380px; margin: 0 auto; padding: 2rem; display: grid; grid-template-columns: 260px 1fr; gap: 2rem; }
        .dashboard-sidebar { padding: 2rem 1.5rem; display: flex; flex-direction: column; height: calc(100vh - 8rem); position: sticky; top: 6rem; }
        .sidebar-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sidebar-header h3 { color: #fff; font-size: 1.1rem; }
        .sidebar-header span { color: #94A3B8; font-size: 0.75rem; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 0.4rem; flex-grow: 1; overflow-y: auto; }
        .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 10px; background: transparent; border: none; color: #CBD5E1; font-weight: 600; font-size: 0.9rem; cursor: pointer; text-align: left; transition: all 0.2s; }
        .nav-item:hover, .nav-item.active { background: rgba(115, 197, 42, 0.15); color: #73C52A; }
        .sidebar-group { display: flex; flex-direction: column; }
        .sidebar-sub-menu { display: flex; flex-direction: column; gap: 0.2rem; padding-left: 0.8rem; margin-top: 0.2rem; margin-bottom: 0.5rem; }
        .sub-item { display: flex; align-items: center; justify-content: space-between; padding: 0.55rem 0.85rem; border-radius: 8px; background: transparent; border: none; color: #94A3B8; font-size: 0.82rem; font-weight: 600; cursor: pointer; text-align: left; transition: all 0.2s; }
        .sub-item:hover, .sub-item.active { background: rgba(115, 197, 42, 0.12); color: #73C52A; }
        .count-badge { background: rgba(255, 255, 255, 0.1); color: #fff; font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 9999px; }
        .source-tag { display: inline-block; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 9999px; }
        .source-tag.badge-school { background: rgba(115, 197, 42, 0.2); border: 1px solid rgba(115, 197, 42, 0.4); color: #73C52A; }
        .source-tag.badge-contact { background: rgba(0, 139, 240, 0.2); border: 1px solid rgba(0, 139, 240, 0.4); color: #38BDF8; }
        .filter-pill-group { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .filter-pill { padding: 0.4rem 0.9rem; border-radius: 9999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #CBD5E1; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .filter-pill:hover, .filter-pill.active { background: #73C52A; color: #000; border-color: #73C52A; }
        .logout-btn { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 10px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #FCA5A5; font-weight: 600; font-size: 0.9rem; cursor: pointer; margin-top: auto; }
        .dashboard-main { min-width: 0; }
        .tab-pane h2 { font-size: 1.8rem; color: #fff; margin-bottom: 0.5rem; }
        .tab-subtitle { color: #94A3B8; margin-bottom: 2rem; font-size: 0.95rem; }
        .tab-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
        .stat-card { padding: 1.8rem; display: flex; align-items: center; gap: 1.2rem; }
        .stat-card h4 { color: #94A3B8; font-size: 0.85rem; font-weight: 600; }
        .stat-card h2 { font-size: 2rem; color: #fff; margin-top: 0.2rem; }
        .badge-new { display: inline-block; background: #73C52A; color: #000; font-weight: 700; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 9999px; margin-top: 0.3rem; }
        .admin-table-container { overflow-x: auto; padding: 1rem; }
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th, .admin-table td { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); color: #E2E8F0; font-size: 0.9rem; vertical-align: middle; }
        .admin-table th { color: #94A3B8; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; }
        .thumb { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; }
        .pill { background: rgba(255,255,255,0.1); color: #fff; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 9999px; }
        .action-btns { display: flex; gap: 0.5rem; }
        .btn-icon { background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 0.5rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .btn-icon.danger { background: rgba(239, 68, 68, 0.2); color: #FCA5A5; }
        .status-select { background: #012b7d; color: #fff; border: 1px solid rgba(255,255,255,0.2); padding: 0.4rem 0.8rem; border-radius: 8px; outline: none; font-weight: 600; font-size: 0.85rem; }
        .content-form { padding: 2.5rem; display: flex; flex-direction: column; gap: 1.2rem; max-width: 800px; }
        .content-form .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .content-form label { color: #E2E8F0; font-size: 0.85rem; font-weight: 600; }
        .content-form input, .content-form textarea { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 0.8rem 1rem; color: #fff; outline: none; font-family: inherit; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .admin-modal-overlay { position: fixed; inset: 0; z-index: 3000; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .admin-modal-content { max-width: 600px; width: 100%; padding: 2.5rem; max-height: 90vh; overflow-y: auto; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .modal-header h3 { color: #fff; font-size: 1.4rem; }
        .modal-form { display: flex; flex-direction: column; gap: 1rem; }
        .modal-form label { color: #E2E8F0; font-size: 0.85rem; font-weight: 600; }
        .modal-form input, .modal-form textarea, .modal-form select { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 0.8rem 1rem; color: #fff; outline: none; font-family: inherit; width: 100%; }
        @media (max-width: 960px) { .dashboard-container { grid-template-columns: 1fr; } .dashboard-sidebar { height: auto; position: static; } }
      `}</style>
    </div>
  );
}
