// ============================================================
//  SaathiGhar — Notification Bell Component
//  Drop <div id="sg-notification-bell"></div> in any portal header
//  Then call: initNotificationBell()
// ============================================================

(function() {
  'use strict';

  let _channel = null;
  let _notifications = [];

  function getSB() { return window._sb; }

  /* ── Render Bell HTML ── */
  function renderBell(container) {
    container.innerHTML = `
      <div class="sg-bell-wrap" id="sg-bell-wrap">
        <button class="sg-bell-btn" id="sg-bell-btn" aria-label="Notifications">
          🔔
          <span class="sg-bell-badge hidden" id="sg-bell-badge">0</span>
        </button>
        <div class="sg-bell-panel hidden" id="sg-bell-panel">
          <div class="sg-bell-header">
            <span class="sg-bell-title">Notifications</span>
            <button class="sg-bell-mark-all" id="sg-mark-all">Mark all read</button>
          </div>
          <div class="sg-bell-list" id="sg-bell-list">
            <div class="sg-bell-empty">No new notifications</div>
          </div>
        </div>
      </div>`;

    document.getElementById('sg-bell-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('sg-bell-panel')?.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      document.getElementById('sg-bell-panel')?.classList.add('hidden');
    });
    document.getElementById('sg-mark-all')?.addEventListener('click', () => markAllRead());
  }

  /* ── Update badge count ── */
  function updateBadge(count) {
    const badge = document.getElementById('sg-bell-badge');
    if (!badge) return;
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  /* ── Render notification list ── */
  function renderList() {
    const list = document.getElementById('sg-bell-list');
    if (!list) return;
    if (!_notifications.length) {
      list.innerHTML = '<div class="sg-bell-empty">You\'re all caught up ✅</div>';
      return;
    }
    const icons = {
      check_in_reminder: '💛', overdue_checkin: '💔', payment_due: '💳',
      payment_overdue: '⚠️', birthday_reminder: '🎂', weekly_digest: '📋',
      new_photo: '📸', sos: '🚨', visit_reminder: '🤝', default: '🔔',
    };
    list.innerHTML = _notifications.slice(0, 15).map(n => `
      <div class="sg-bell-item ${n.is_read ? 'read' : 'unread'}" data-id="${n.id}">
        <div class="sg-bell-item-icon">${icons[n.type] || icons.default}</div>
        <div class="sg-bell-item-body">
          <div class="sg-bell-item-title">${n.title || ''}</div>
          <div class="sg-bell-item-text">${n.body || ''}</div>
          <div class="sg-bell-item-time">${timeAgo(n.sent_at)}</div>
        </div>
        ${!n.is_read ? '<div class="sg-bell-dot"></div>' : ''}
      </div>`).join('');

    list.querySelectorAll('.sg-bell-item[data-id]').forEach(el => {
      el.addEventListener('click', () => markRead(el.dataset.id));
    });
  }

  /* ── Load notifications from Supabase ── */
  async function loadNotifications(userId) {
    const { data } = await getSB()
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('sent_at', { ascending: false })
      .limit(20);
    _notifications = data || [];
    const unread = _notifications.filter(n => !n.is_read).length;
    updateBadge(unread);
    renderList();
  }

  /* ── Mark one as read ── */
  async function markRead(id) {
    await getSB().from('notifications').update({ is_read: true }).eq('id', id);
    _notifications = _notifications.map(n => n.id === id ? { ...n, is_read: true } : n);
    const unread = _notifications.filter(n => !n.is_read).length;
    updateBadge(unread);
    renderList();
  }

  /* ── Mark all read ── */
  async function markAllRead() {
    const ids = _notifications.filter(n => !n.is_read).map(n => n.id);
    if (!ids.length) return;
    await getSB().from('notifications').update({ is_read: true }).in('id', ids);
    _notifications = _notifications.map(n => ({ ...n, is_read: true }));
    updateBadge(0);
    renderList();
  }

  /* ── Subscribe to real-time new notifications ── */
  function subscribeRealtime(userId) {
    if (_channel) _channel.unsubscribe();
    _channel = getSB()
      .channel('notifications:' + userId)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, payload => {
        _notifications.unshift(payload.new);
        const unread = _notifications.filter(n => !n.is_read).length;
        updateBadge(unread);
        renderList();
        showDesktopToast(payload.new);
      })
      .subscribe();
  }

  /* ── Show a transient toast for new notification ── */
  function showDesktopToast(notif) {
    const el = document.createElement('div');
    el.className = 'sg-notif-toast';
    el.innerHTML = `<strong>${notif.title || 'New notification'}</strong><p>${notif.body || ''}</p>`;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('visible'), 100);
    setTimeout(() => { el.classList.remove('visible'); setTimeout(() => el.remove(), 400); }, 5000);
  }

  /* ── Time ago helper ── */
  function timeAgo(iso) {
    if (!iso) return '';
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  }

  /* ── Public init function ── */
  window.initNotificationBell = async function() {
    const container = document.getElementById('sg-notification-bell');
    if (!container) return;
    const { data: { session } } = await getSB().auth.getSession();
    if (!session) return;
    renderBell(container);
    await loadNotifications(session.user.id);
    subscribeRealtime(session.user.id);
  };

})();
