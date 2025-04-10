import React from 'react';
import './aside.css';

function Aside() {
  return (
    <aside className="staff-aside">
      <div className="staff-header">
        <h2 className="staff-title">
          <svg className="staff-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Support Team
        </h2>
        <p className="staff-subtitle">Logged in support staff</p>
      </div>

      <div className="staff-list">
        <div className="staff-member">
          <div className="staff-member-content">
            <div className="staff-member-avatar">
              <img src="/img/team-avatars/mh.jpg" alt="Martin" className="avatar-image" />
            </div>
            <div className="staff-member-info">
              <h3 className="staff-member-name">Martin</h3>
              <p className="staff-member-role">Support Lead</p>
            </div>
          </div>
          
          {/* Expanded card that appears on hover */}
          <div className="staff-member-expanded">
            <div className="expanded-header">
              <img src="/img/team-avatars/mh.jpg" alt="Martin" className="expanded-avatar-img" />
              <div className="expanded-info">
                <h3 className="expanded-name">Martin</h3>
                <p className="expanded-role">Support Lead</p>
              </div>
            </div>
            
            <div className="expanded-details">
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                <span>+46 70 123 4567</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>martin@support.com</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Active for 3 hours</span>
              </div>
            </div>
            
            <div className="expanded-status">
              <div className="expanded-status-indicator status-online"></div>
              <span>Online and available</span>
            </div>
          </div>
        </div>

        <div className="staff-member">
          <div className="staff-member-content">
            <div className="staff-member-avatar">
              <img src="/img/team-avatars/we.jpg" alt="Ville" className="avatar-image" />
            </div>
            <div className="staff-member-info">
              <h3 className="staff-member-name">Ville</h3>
              <p className="staff-member-role">Technical Support</p>
            </div>
          </div>
          
          {/* Expanded card that appears on hover */}
          <div className="staff-member-expanded">
            <div className="expanded-header">
              <img src="/img/team-avatars/we.jpg" alt="Ville" className="expanded-avatar-img" />
              <div className="expanded-info">
                <h3 className="expanded-name">Ville</h3>
                <p className="expanded-role">Technical Support</p>
              </div>
            </div>
            
            <div className="expanded-details">
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                <span>+46 70 234 5678</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>ville@support.com</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>Network specialist</span>
              </div>
            </div>
            
            <div className="expanded-status">
              <div className="expanded-status-indicator status-online"></div>
              <span>Online and available</span>
            </div>
          </div>
        </div>

        <div className="staff-member">
          <div className="staff-member-content">
            <div className="staff-member-avatar">
              <img src="/img/team-avatars/kl.jpg" alt="Kevin" className="avatar-image" />
            </div>
            <div className="staff-member-info">
              <h3 className="staff-member-name">Kevin</h3>
              <p className="staff-member-role">Customer Service</p>
            </div>
          </div>
          
          {/* Expanded card that appears on hover */}
          <div className="staff-member-expanded">
            <div className="expanded-header">
              <img src="/img/team-avatars/kl.jpg" alt="Kevin" className="expanded-avatar-img" />
              <div className="expanded-info">
                <h3 className="expanded-name">Kevin</h3>
                <p className="expanded-role">Customer Service</p>
              </div>
            </div>
            
            <div className="expanded-details">
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                <span>+46 70 345 6789</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>kevin@support.com</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Customer relations</span>
              </div>
            </div>
            
            <div className="expanded-status">
              <div className="expanded-status-indicator status-online"></div>
              <span>Online and available</span>
            </div>
          </div>
        </div>

        <div className="staff-member">
          <div className="staff-member-content">
            <div className="staff-member-avatar">
              <img src="/img/team-avatars/ss.jpg" alt="Shaban" className="avatar-image" />
            </div>
            <div className="staff-member-info">
              <h3 className="staff-member-name">Shaban</h3>
              <p className="staff-member-role">Product Specialist</p>
            </div>
          </div>
          
          {/* Expanded card that appears on hover */}
          <div className="staff-member-expanded">
            <div className="expanded-header">
              <img src="/img/team-avatars/ss.jpg" alt="Shaban" className="expanded-avatar-img" />
              <div className="expanded-info">
                <h3 className="expanded-name">Shaban</h3>
                <p className="expanded-role">Product Specialist</p>
              </div>
            </div>
            
            <div className="expanded-details">
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                <span>+46 70 456 7890</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>shaban@support.com</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>Product expertise</span>
              </div>
            </div>
            
            <div className="expanded-status">
              <div className="expanded-status-indicator status-online"></div>
              <span>Online and available</span>
            </div>
          </div>
        </div>

        <div className="staff-member">
          <div className="staff-member-content">
            <div className="staff-member-avatar">
              <img src="/img/team-avatars/sb.jpg" alt="Sigge" className="avatar-image" />
            </div>
            <div className="staff-member-info">
              <h3 className="staff-member-name">Sigge</h3>
              <p className="staff-member-role">Technical Support</p>
            </div>
          </div>
          
          {/* Expanded card that appears on hover */}
          <div className="staff-member-expanded">
            <div className="expanded-header">
              <img src="/img/team-avatars/sb.jpg" alt="Sigge" className="expanded-avatar-img" />
              <div className="expanded-info">
                <h3 className="expanded-name">Sigge</h3>
                <p className="expanded-role">Technical Support</p>
              </div>
            </div>
            
            <div className="expanded-details">
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                <span>+46 70 567 8901</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>sigge@support.com</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span>Hardware specialist</span>
              </div>
            </div>
            
            <div className="expanded-status">
              <div className="expanded-status-indicator status-online"></div>
              <span>Online and available</span>
            </div>
          </div>
        </div>

        <div className="staff-member">
          <div className="staff-member-content">
            <div className="staff-member-avatar">
              <img src="/img/team-avatars/shn.jpg" alt="Sebbe" className="avatar-image" />
            </div>
            <div className="staff-member-info">
              <h3 className="staff-member-name">Sebbe</h3>
              <p className="staff-member-role">Customer Service</p>
            </div>
          </div>
          
          {/* Expanded card that appears on hover */}
          <div className="staff-member-expanded">
            <div className="expanded-header">
              <img src="/img/team-avatars/shn.jpg" alt="Sebbe" className="expanded-avatar-img" />
              <div className="expanded-info">
                <h3 className="expanded-name">Sebbe</h3>
                <p className="expanded-role">Customer Service</p>
              </div>
            </div>
            
            <div className="expanded-details">
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                <span>+46 70 678 9012</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>sebbe@support.com</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
                <span>Account specialist</span>
              </div>
            </div>
            
            <div className="expanded-status">
              <div className="expanded-status-indicator status-online"></div>
              <span>Online and available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="staff-footer">
        <div className="staff-status">
          <span>Online Support</span>
          <span className="status-indicator"></span>
        </div>
      </div>
    </aside>
  );
}

export default Aside;