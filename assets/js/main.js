/* ============================================================
   IOC – layout dùng chung: theme, sidebar, navbar, footer,
   search overlay (Ctrl+K), dropdowns, helpers.
   Mỗi trang đặt <body data-page="..."> để highlight menu active.
   ============================================================ */

(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "index";
  var demo = new URLSearchParams(location.search);

  /* =============== 1. THEME (light / dark / system) =============== */

  function themePref() { return localStorage.getItem("ioc-theme") || "dark"; }

  function resolvedTheme(pref) {
    if (pref === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return pref;
  }

  function applyTheme(pref, silent) {
    var t = resolvedTheme(pref);
    document.documentElement.setAttribute("data-theme", t);
    var navIcon = document.getElementById("themeIcon");
    if (navIcon) {
      navIcon.className = pref === "dark" ? "ti ti-moon" : pref === "system" ? "ti ti-device-desktop" : "ti ti-sun";
    }
    document.querySelectorAll("[data-theme-opt]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-theme-opt") === pref);
    });
    if (!silent) window.dispatchEvent(new CustomEvent("ioc-theme-change"));
  }

  if (demo.get("demo") === "dark") localStorage.setItem("ioc-theme", "dark");
  if (demo.get("demo") === "light") localStorage.setItem("ioc-theme", "light");
  applyTheme(themePref(), true); // áp dụng sớm, trước khi charts render

  /* =============== 2. MENU CONFIG =============== */

  var MENU = [
    {
      group: "Tổng quan", icon: "ti ti-home",
      children: [{ id: "index", href: "index.html", label: "M01 · Điều hành tăng trưởng" }]
    },
    { section: "Kinh tế – Ngành (M02–M10)" },
    { id: "grdp-nganh", href: "grdp-nganh.html", icon: "ti ti-chart-line", label: "M02 · Giám sát GRDP theo ngành" },
    { id: "nong-nghiep", href: "nong-nghiep.html", icon: "ti ti-plant-2", label: "M03 · Nông, lâm nghiệp & thủy sản" },
    { id: "cong-nghiep", href: "cong-nghiep.html", icon: "ti ti-bolt", label: "M04 · Công nghiệp, năng lượng & MT" },
    { id: "dau-tu-cong", href: "dau-tu-cong.html", icon: "ti ti-building-skyscraper", label: "M05 · Xây dựng & Đầu tư" },
    { id: "gia-thi-truong", href: "gia-thi-truong.html", icon: "ti ti-building-store", label: "M06 · Thương mại & Thị trường" },
    { id: "van-tai", href: "van-tai.html", icon: "ti ti-truck", label: "M07 · Vận tải & Logistics" },
    { id: "dich-vu", href: "dich-vu.html", icon: "ti ti-briefcase", label: "M08 · Du lịch, Văn hóa & Thể thao" },
    { id: "dich-vu-xh", href: "dich-vu-xh.html", icon: "ti ti-tool", label: "M09 · Dịch vụ kinh tế & xã hội" },
    { id: "thue", href: "thue.html", icon: "ti ti-percentage", label: "M10 · Thuế sản phẩm" },
    { section: "Phân tích – Điều hành (M11–M15)" },
    { id: "gis", href: "gis.html", icon: "ti ti-map-pin", label: "M11 · Hồ sơ KT địa phương & GIS" },
    { id: "canh-bao", href: "canh-bao.html", icon: "ti ti-alert-triangle", label: "M12 · Cảnh báo, nhiệm vụ & chỉ đạo", badge: "23" },
    { id: "nhiem-vu", href: "nhiem-vu.html", icon: "ti ti-checklist", label: "Giao việc & Nhiệm vụ" },
    { id: "du-bao", href: "du-bao.html", icon: "ti ti-chart-line", label: "M13 · Ước tính & Dự báo" },
    { id: "mo-phong", href: "mo-phong.html", icon: "ti ti-sitemap", label: "M14 · Mô phỏng & Đánh giá chính sách" },
    { id: "bao-cao", href: "bao-cao.html", icon: "ti ti-report", label: "M15 · Báo cáo, BI & Phát hành" },
    { section: "Nền tảng & Quản trị (M16)" },
    { id: "quan-tri-nguoi-dung", href: "quan-tri-nguoi-dung.html", icon: "ti ti-user-cog", label: "M16 · Quản trị người dùng" },
    { id: "cau-hinh-kpi", href: "cau-hinh-kpi.html", icon: "ti ti-adjustments", label: "Cấu hình KPI & danh mục" },
    { section: "Tài chính – Hành chính (ngoài danh mục IOC GRDP)" },
    { id: "ngan-sach", href: "ngan-sach.html", icon: "ti ti-wallet", label: "Ngân sách" },
    { id: "tai-san-cong", href: "tai-san-cong.html", icon: "ti ti-building-community", label: "Tài sản công" },
    { id: "doanh-nghiep", href: "doanh-nghiep.html", icon: "ti ti-briefcase", label: "Doanh nghiệp – ĐKKD" },
    { id: "thanh-tra", href: "thanh-tra.html", icon: "ti ti-shield-check", label: "Thanh tra / Kiểm toán" },
    { id: "cai-cach-hanh-chinh", href: "cai-cach-hanh-chinh.html", icon: "ti ti-building-bank", label: "Cải cách hành chính" }
  ];

  function itemHtml(m, isSub) {
    var active = m.id === page ? " active" : "";
    return '<li class="menu-item' + active + '">' +
      '<a class="menu-link" href="' + m.href + '">' +
      (isSub ? "" : '<i class="mi ' + m.icon + '"></i>') +
      '<span class="lbl">' + m.label + "</span>" +
      (m.badge ? '<span class="menu-badge">' + m.badge + "</span>" : "") +
      "</a></li>";
  }

  /* =============== 3. SIDEBAR =============== */

  var sidebarHtml =
    '<div class="sidebar-brand">' +
    '  <div class="brand-logo"><i class="ti ti-activity"></i></div>' +
    '  <div class="brand-text">' +
    '    <div class="brand-name">IOC Điện Biên</div>' +
    '    <div class="brand-sub">Kinh tế số &amp; Tài chính số</div>' +
    "  </div>" +
    '  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Thu gọn menu"><i class="ti ti-chevrons-left"></i></button>' +
    "</div>" +
    '<ul class="menu">';

  MENU.forEach(function (m) {
    if (m.section) {
      sidebarHtml += '<li class="menu-section"><span class="txt">' + m.section + "</span></li>";
    } else if (m.group) {
      sidebarHtml +=
        '<li class="menu-item has-sub open">' +
        '<a class="menu-link grp-toggle">' +
        '<i class="mi ' + m.icon + '"></i><span class="lbl">' + m.group + "</span>" +
        '<i class="chevron ti ti-chevron-right"></i></a>' +
        '<ul class="submenu">' +
        m.children.map(function (c) { return itemHtml(c, true); }).join("") +
        "</ul></li>";
    } else {
      sidebarHtml += itemHtml(m, false);
    }
  });

  sidebarHtml += "</ul>";

  var sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.innerHTML = sidebarHtml;

  // nhóm mở/đóng
  document.querySelectorAll(".grp-toggle").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      el.closest(".menu-item").classList.toggle("open");
    });
  });

  // thu gọn sidebar (desktop) — lưu localStorage
  if (localStorage.getItem("ioc-sidebar") === "collapsed" || demo.get("demo") === "collapsed") {
    document.body.classList.add("sidebar-collapsed");
  }
  var sbToggle = document.getElementById("sidebarToggle");
  if (sbToggle) {
    sbToggle.addEventListener("click", function () {
      var c = document.body.classList.toggle("sidebar-collapsed");
      localStorage.setItem("ioc-sidebar", c ? "collapsed" : "open");
    });
  }

  /* =============== 4. NAVBAR =============== */

  var navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.innerHTML =
      '<button class="nav-toggle" id="navToggle" aria-label="Mở menu"><i class="ti ti-menu-2"></i></button>' +

      /* nhóm icon trái (kiểu Vuexy) */
      '<div class="nav-actions-left">' +
      '  <button class="nav-ic-btn" aria-label="Thư"><i class="ti ti-mail"></i></button>' +
      '  <button class="nav-ic-btn" aria-label="Trò chuyện"><i class="ti ti-brand-wechat"></i></button>' +
      '  <button class="nav-ic-btn" aria-label="Công việc"><i class="ti ti-checkbox"></i></button>' +
      '  <button class="nav-ic-btn" aria-label="Lịch"><i class="ti ti-calendar"></i></button>' +
      "</div>" +

      '<div class="nav-right">' +

      /* ngôn ngữ */
      '<div class="dd" id="ddLang">' +
      '  <button class="nav-lang-btn" data-dd aria-label="Ngôn ngữ"><span class="flag">🇻🇳</span><span class="lg">Tiếng Việt</span></button>' +
      '  <div class="dd-menu">' +
      '    <div class="dd-item active"><i class="ti ti-check"></i>Tiếng Việt</div>' +
      '    <div class="dd-item"><i class="ti ti-world"></i>English</div>' +
      "  </div>" +
      "</div>" +

      /* theme */
      '<div class="dd" id="ddTheme">' +
      '  <button class="nav-icon-btn" data-dd aria-label="Giao diện"><i id="themeIcon" class="ti ti-sun"></i></button>' +
      '  <div class="dd-menu">' +
      '    <div class="dd-item" data-theme-opt="light"><i class="ti ti-sun"></i>Sáng</div>' +
      '    <div class="dd-item" data-theme-opt="dark"><i class="ti ti-moon"></i>Tối</div>' +
      '    <div class="dd-item" data-theme-opt="system"><i class="ti ti-device-desktop"></i>Hệ thống</div>' +
      "  </div>" +
      "</div>" +

      /* tìm kiếm (icon) */
      '<button class="nav-icon-btn" id="searchTrigger" aria-label="Tìm kiếm"><i class="ti ti-search"></i></button>' +

      /* lối tắt */
      '<div class="dd" id="ddShortcut">' +
      '  <button class="nav-icon-btn" data-dd aria-label="Lối tắt"><i class="ti ti-star"></i></button>' +
      '  <div class="dd-menu dd-shortcuts">' +
      '    <div class="shortcut-head">Lối tắt</div>' +
      '    <div class="shortcut-grid">' +
      '      <a class="shortcut-tile" href="ngan-sach.html"><span class="ico"><i class="ti ti-wallet"></i></span>Ngân sách</a>' +
      '      <a class="shortcut-tile" href="dau-tu-cong.html"><span class="ico"><i class="ti ti-building-skyscraper"></i></span>Đầu tư công</a>' +
      '      <a class="shortcut-tile" href="canh-bao.html"><span class="ico"><i class="ti ti-alert-triangle"></i></span>Cảnh báo</a>' +
      '      <a class="shortcut-tile" href="nhiem-vu.html"><span class="ico"><i class="ti ti-checklist"></i></span>Nhiệm vụ</a>' +
      '      <a class="shortcut-tile" href="bao-cao.html"><span class="ico"><i class="ti ti-report"></i></span>Báo cáo</a>' +
      '      <a class="shortcut-tile" href="cau-hinh-kpi.html"><span class="ico"><i class="ti ti-adjustments"></i></span>Cấu hình KPI</a>' +
      "    </div>" +
      "  </div>" +
      "</div>" +

      /* giỏ hàng (trang trí, đúng template) */
      '<button class="nav-icon-btn" aria-label="Giỏ"><i class="ti ti-shopping-cart"></i><span class="nav-badge">5</span></button>' +

      /* thông báo */
      '<div class="dd" id="ddNotif">' +
      '  <button class="nav-icon-btn" data-dd aria-label="Thông báo"><i class="ti ti-bell"></i><span class="nav-badge red" id="notifDot">7</span></button>' +
      '  <div class="dd-menu dd-notif">' +
      '    <div class="notif-head"><span>Thông báo</span>' +
      '      <button class="mark-read" id="markRead" title="Đánh dấu đã đọc"><i class="ti ti-checks"></i></button></div>' +
      '    <div class="notif-item"><div class="notif-icon tint-danger"><i class="ti ti-alert-triangle"></i></div>' +
      '      <div class="notif-body"><div class="notif-title">Giải ngân chậm</div>' +
      '      <div class="notif-text">Dự án Đường vành đai 2 dưới 30% kế hoạch</div>' +
      '      <div class="notif-time">10 phút trước</div></div></div>' +
      '    <div class="notif-item"><div class="notif-icon tint-danger"><i class="ti ti-chart-line"></i></div>' +
      '      <div class="notif-body"><div class="notif-title">Hụt thu tiền sử dụng đất</div>' +
      '      <div class="notif-text">Quý III mới đạt 41% dự toán</div>' +
      '      <div class="notif-time">2 giờ trước</div></div></div>' +
      '    <div class="notif-item"><div class="notif-icon tint-warning"><i class="ti ti-chart-line"></i></div>' +
      '      <div class="notif-body"><div class="notif-title">CPI lương thực tăng</div>' +
      '      <div class="notif-text">+1,8% so với tháng trước</div>' +
      '      <div class="notif-time">5 giờ trước</div></div></div>' +
      '    <div class="notif-item"><div class="notif-icon tint-info"><i class="ti ti-file-text"></i></div>' +
      '      <div class="notif-body"><div class="notif-title">Thiếu báo cáo quyết toán</div>' +
      '      <div class="notif-text">3 đơn vị chưa nộp báo cáo tháng 6</div>' +
      '      <div class="notif-time">Hôm qua</div></div></div>' +
      '    <div class="notif-foot"><a href="canh-bao.html">Xem tất cả cảnh báo</a></div>' +
      "  </div>" +
      "</div>" +

      /* user */
      '<div class="dd" id="ddUser">' +
      '  <button class="nav-user-btn" data-dd aria-label="Tài khoản">' +
      '    <span class="nav-user-t"><span class="nm">Lãnh đạo Tỉnh</span><span class="rl">Chủ tịch UBND tỉnh</span></span>' +
      '    <span class="avatar online">LT</span></button>' +
      '  <div class="dd-menu">' +
      '    <div class="dd-header"><span class="avatar sm">LT</span>' +
      '      <div><div class="t">Lãnh đạo Tỉnh</div><div class="s">Chủ tịch UBND tỉnh</div></div></div>' +
      '    <div class="dd-item"><i class="ti ti-user"></i>Hồ sơ cá nhân</div>' +
      '    <div class="dd-item"><i class="ti ti-settings"></i>Cài đặt</div>' +
      '    <div class="dd-divider"></div>' +
      '    <div class="dd-item danger"><i class="ti ti-logout"></i>Đăng xuất</div>' +
      "  </div>" +
      "</div>" +

      "</div>";
  }

  /* dropdown behavior chung */
  function closeAllDd(except) {
    document.querySelectorAll(".dd.open").forEach(function (d) {
      if (d !== except) d.classList.remove("open");
    });
  }

  document.querySelectorAll(".dd > [data-dd]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var dd = btn.closest(".dd");
      closeAllDd(dd);
      dd.classList.toggle("open");
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dd")) closeAllDd(null);
  });

  /* theme options */
  document.querySelectorAll("[data-theme-opt]").forEach(function (el) {
    el.addEventListener("click", function () {
      var pref = el.getAttribute("data-theme-opt");
      localStorage.setItem("ioc-theme", pref);
      applyTheme(pref, false);
      closeAllDd(null);
    });
  });
  applyTheme(themePref(), true); // đồng bộ icon + trạng thái active sau khi navbar render

  /* đánh dấu đã đọc */
  var markRead = document.getElementById("markRead");
  if (markRead) {
    markRead.addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelectorAll(".notif-item").forEach(function (n) { n.classList.add("read"); });
      var dot = document.getElementById("notifDot");
      if (dot) dot.style.display = "none";
    });
  }

  /* mobile drawer */
  var backdrop = document.createElement("div");
  backdrop.className = "sidebar-backdrop";
  document.body.appendChild(backdrop);
  backdrop.addEventListener("click", function () { document.body.classList.remove("sidebar-open"); });

  var navToggle = document.getElementById("navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () { document.body.classList.toggle("sidebar-open"); });
  }

  // chọn 1 mục menu (không phải toggle nhóm) → đóng drawer
  document.querySelectorAll("#sidebar .menu-link:not(.grp-toggle)").forEach(function (el) {
    el.addEventListener("click", function () { document.body.classList.remove("sidebar-open"); });
  });

  if (demo.get("demo") === "drawer") document.body.classList.add("sidebar-open");

  /* =============== 5. SEARCH OVERLAY (Ctrl+K) =============== */

  var PAGES = [];
  MENU.forEach(function (m) {
    if (m.group) m.children.forEach(function (c) { PAGES.push({ href: c.href, label: c.label, icon: m.icon }); });
    else if (m.id) PAGES.push({ href: m.href, label: m.label, icon: m.icon });
  });

  var overlay = document.createElement("div");
  overlay.className = "search-overlay";
  overlay.innerHTML =
    '<div class="search-panel">' +
    '  <div class="search-input-row">' +
    '    <i class="ti ti-search"></i>' +
    '    <input type="text" id="searchInput" placeholder="Tìm trang, chỉ tiêu, module…">' +
    '    <span class="kbd">ESC</span>' +
    "  </div>" +
    '  <div class="search-results" id="searchResults"></div>' +
    "</div>";
  document.body.appendChild(overlay);

  var searchInput = overlay.querySelector("#searchInput");
  var searchResults = overlay.querySelector("#searchResults");
  var selIdx = 0;

  function stripVN(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  }

  function renderResults(q) {
    var list = PAGES.filter(function (p) { return stripVN(p.label).indexOf(stripVN(q || "")) !== -1; });
    selIdx = 0;
    if (!list.length) {
      searchResults.innerHTML = '<div class="search-empty">Không tìm thấy trang phù hợp</div>';
      return;
    }
    searchResults.innerHTML =
      '<div class="search-group">Trang</div>' +
      list.map(function (p, i) {
        return '<a class="search-item' + (i === 0 ? " sel" : "") + '" href="' + p.href + '">' +
          '<i class="' + p.icon + '"></i>' + p.label + "</a>";
      }).join("");
  }

  function openSearch() {
    document.body.classList.add("search-open");
    searchInput.value = "";
    renderResults("");
    setTimeout(function () { searchInput.focus(); }, 30);
  }

  function closeSearch() { document.body.classList.remove("search-open"); }

  var searchTrigger = document.getElementById("searchTrigger");
  if (searchTrigger) searchTrigger.addEventListener("click", openSearch);

  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeSearch(); });

  searchInput.addEventListener("input", function () { renderResults(searchInput.value); });

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      openSearch();
      return;
    }
    if (!document.body.classList.contains("search-open")) return;
    var items = searchResults.querySelectorAll(".search-item");
    if (e.key === "Escape") closeSearch();
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      if (items[selIdx]) items[selIdx].classList.remove("sel");
      selIdx = e.key === "ArrowDown" ? (selIdx + 1) % items.length : (selIdx - 1 + items.length) % items.length;
      items[selIdx].classList.add("sel");
      items[selIdx].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      if (items[selIdx]) location.href = items[selIdx].getAttribute("href");
    }
  });

  if (demo.get("demo") === "search") openSearch();

  /* =============== 6. FOOTER =============== */

  var footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML =
      "<span>© 2026, Trung tâm điều hành Kinh tế số &amp; Tài chính số tỉnh Điện Biên ❤️</span>" +
      '<span class="flinks"><a href="#">Tài liệu</a><a href="#">Hỗ trợ</a><a href="#">Giới thiệu</a></span>';
  }

  /* =============== 7. CARD MENU (3 chấm) =============== */

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".card-menu-btn");
    document.querySelectorAll(".card-dd.open").forEach(function (d) {
      if (!btn || d.previousElementSibling !== btn) d.classList.remove("open");
    });
    if (!btn) return;
    e.stopPropagation();
    var dd = btn.nextElementSibling;
    if (!dd || !dd.classList.contains("card-dd")) {
      dd = document.createElement("div");
      dd.className = "card-dd";
      dd.innerHTML =
        '<div class="dd-item"><i class="ti ti-eye"></i>Xem chi tiết</div>' +
        '<div class="dd-item"><i class="ti ti-refresh"></i>Làm mới</div>' +
        '<div class="dd-item"><i class="ti ti-download"></i>Xuất Excel</div>';
      btn.after(dd);
      dd.addEventListener("click", function (ev) { ev.stopPropagation(); dd.classList.remove("open"); });
    }
    dd.classList.toggle("open");
  });

  /* =============== 8. HELPERS DÙNG CHUNG =============== */

  window.IOC = window.IOC || {};

  window.IOC.fmt = function (n, decimals) {
    var d = decimals === undefined ? 0 : decimals;
    return n.toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  };

  // stat card kiểu Vuexy: icon-center trên, số to, label, delta màu, ghi chú nhỏ
  window.IOC.statCard = function (o) {
    var delta = "";
    if (o.badge) {
      // trung tính nếu badgeClass là secondary/info, ngược lại theo hướng lên/xuống
      var neutral = o.badgeClass === "badge-secondary" || o.badgeClass === "badge-info" || o.badgeClass === "badge-warning";
      var cls = neutral ? "" : (o.dir === "down" ? "down" : "up");
      delta = '<div class="stat-delta ' + cls + '">' + o.badge + "</div>";
    }
    return '<div class="card stat-card ' + (o.col || "col-3") + '">' +
      '<div class="card-body">' +
      '<div class="stat-icon ' + o.tint + '"><i class="' + o.icon + '"></i></div>' +
      '<div class="stat-value">' + o.value + (o.unit ? " <small>" + o.unit + "</small>" : "") + "</div>" +
      '<div class="stat-label">' + o.label + "</div>" +
      delta +
      (o.note ? '<div class="stat-note">' + o.note + "</div>" : "") +
      "</div></div>";
  };

  window.IOC.badgeMucDo = function (mucDo) {
    if (mucDo === "cao") return '<span class="badge badge-danger"><i class="ti ti-alert-circle"></i>Cao</span>';
    if (mucDo === "trung binh") return '<span class="badge badge-warning"><i class="ti ti-alert-triangle"></i>Trung bình</span>';
    return '<span class="badge badge-info"><i class="ti ti-info-circle"></i>Thấp</span>';
  };

  window.IOC.badgeTrangThai = function (tt) {
    var map = {
      "dang xu ly": ["badge-primary", "Đang xử lý"],
      "qua han": ["badge-danger", "Quá hạn"],
      "hoan thanh": ["badge-success", "Hoàn thành"],
      "dang mo": ["badge-danger", "Đang mở"],
      "da dong": ["badge-secondary", "Đã đóng"],
      "cham": ["badge-danger", "Chậm tiến độ"],
      "dang trien khai": ["badge-primary", "Đang triển khai"],
      "sap hoan thanh": ["badge-success", "Sắp hoàn thành"],
      "dang su dung": ["badge-success", "Đang sử dụng"],
      "cho thue": ["badge-info", "Cho thuê"],
      "cho thanh ly": ["badge-warning", "Chờ thanh lý"],
      "dang tien hanh": ["badge-primary", "Đang tiến hành"],
      "cho ket luan": ["badge-warning", "Chờ kết luận"],
      "da ban hanh kl": ["badge-success", "Đã ban hành KL"],
      "theo doi sau tt": ["badge-info", "Theo dõi sau TT"],
      "da phat hanh": ["badge-success", "Đã phát hành"],
      "cho duyet": ["badge-warning", "Chờ duyệt"],
      "dang lap": ["badge-secondary", "Đang lập"],
      "tot": ["badge-success", "Tốt"],
      "kha": ["badge-primary", "Khá"],
      "trung binh": ["badge-warning", "Trung bình"],
      "dinh ky": ["badge-primary", "Định kỳ"],
      "dot xuat": ["badge-danger", "Đột xuất"],
      "chuyen de": ["badge-info", "Chuyên đề"],
      "lanh dao tinh": ["badge-primary", "Lãnh đạo Tỉnh"],
      "lanh dao so": ["badge-info", "Lãnh đạo Sở"],
      "lanh dao xa": ["badge-warning", "Lãnh đạo Xã"],
      "chuyen vien": ["badge-secondary", "Chuyên viên"]
    };
    var b = map[tt] || ["badge-secondary", tt];
    return '<span class="badge ' + b[0] + '">' + b[1] + "</span>";
  };

  window.IOC.badgeDomain = function (d) {
    var map = {
      "Ngân sách": "badge-primary",
      "Đầu tư công": "badge-info",
      "Giá cả": "badge-warning",
      "Doanh nghiệp": "badge-success",
      "CCHC": "badge-secondary",
      "Thanh tra": "badge-danger"
    };
    return '<span class="badge ' + (map[d] || "badge-secondary") + '">' + d + "</span>";
  };

  window.IOC.progressClass = function (pct) {
    if (pct >= 80) return "bg-success";
    if (pct >= 50) return "";
    if (pct >= 30) return "bg-warning";
    return "bg-danger";
  };

  window.IOC.initials = function (name) {
    var parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  window.IOC.isDark = function () {
    return document.documentElement.getAttribute("data-theme") === "dark";
  };

  /* =============== 8b. Bảng -> thẻ (item) trên mobile ===============
     Gắn data-label (theo tiêu đề cột), đánh dấu ô STT / ô tiêu đề, và thêm
     "chip" icon dẫn đầu cho từng hàng để trông như item trong app. Chip lấy
     màu + icon theo trạng thái (badge cuối hàng), hoặc số thứ hạng, hoặc icon
     mặc định của trang. Tự chạy lại khi tbody được render lại (nút lọc...). */
  var PAGE_IC = {
    "index": "ti-layout-grid", "grdp-nganh": "ti-chart-bar", "nong-nghiep": "ti-plant-2",
    "cong-nghiep": "ti-building-factory-2", "dau-tu-cong": "ti-building-community",
    "gia-thi-truong": "ti-tag", "van-tai": "ti-truck-delivery", "dich-vu": "ti-briefcase",
    "dich-vu-xh": "ti-heart-handshake", "thue": "ti-receipt-tax", "du-bao": "ti-chart-dots",
    "mo-phong": "ti-adjustments", "ngan-sach": "ti-wallet", "tai-san-cong": "ti-building-bank",
    "doanh-nghiep": "ti-building-store", "thanh-tra": "ti-gavel",
    "cai-cach-hanh-chinh": "ti-file-check", "canh-bao": "ti-alert-triangle",
    "nhiem-vu": "ti-checklist", "bao-cao": "ti-report", "gis": "ti-map-pin",
    "quan-tri-nguoi-dung": "ti-users", "cau-hinh-kpi": "ti-settings"
  };

  /* Trạng thái hàng: lấy badge gần cuối hàng nhất -> {màu, icon} */
  function rowStatus(tr) {
    var cells = tr.children, i, b;
    for (i = cells.length - 1; i >= 0; i--) {
      b = cells[i].querySelector ? cells[i].querySelector(".badge") : null;
      if (b) {
        var c = b.className;
        if (/badge-success/.test(c)) return { c: "success", i: "ti-circle-check" };
        if (/badge-danger/.test(c)) return { c: "danger", i: "ti-alert-triangle" };
        if (/badge-warning/.test(c)) return { c: "warning", i: "ti-clock-hour-4" };
        if (/badge-info/.test(c)) return { c: "info", i: "ti-trending-up" };
        return { c: "secondary", i: "ti-flag" };
      }
    }
    return null;
  }

  function labelTable(table) {
    var ths = table.querySelectorAll("thead th");
    if (!ths.length) return;
    var labels = [].map.call(ths, function (th) { return th.textContent.trim(); });
    var pageIc = PAGE_IC[document.body.getAttribute("data-page")] || "ti-point";
    [].forEach.call(table.querySelectorAll("tbody tr"), function (tr) {
      var cells = tr.children, titleIdx = -1, idxNum = "", j, k;
      for (j = 0; j < cells.length; j++) {
        if (cells[j].classList.contains("td-main") || cells[j].querySelector(".td-main")) { titleIdx = j; break; }
      }
      if (titleIdx === -1) {
        for (k = 0; k < cells.length; k++) {
          var lu = (labels[k] || "").toUpperCase();
          if (lu !== "#" && lu !== "STT") { titleIdx = k; break; }
        }
      }
      [].forEach.call(cells, function (td, i) {
        var lbl = labels[i] || "", up = lbl.toUpperCase(), isIdx = up === "#" || up === "STT";
        td.setAttribute("data-label", lbl);
        td.classList.toggle("col-idx", isIdx);
        td.classList.toggle("card-title-cell", i === titleIdx);
        if (isIdx) idxNum = td.textContent.trim();
        // ô chỉ là badge chữ (trạng thái/đánh giá) -> ẩn nhãn cột, chữ badge tự rõ nghĩa
        // (giữ nhãn cho badge dạng số như "+0,27" vì số trần không đủ nghĩa)
        var bdg = i === titleIdx ? null : td.querySelector(".badge");
        var isStatus = !!bdg && /[^\d\s+\-.,%\/()]/.test(bdg.textContent.trim());
        td.classList.toggle("status-only", isStatus);
      });

      var titleCell = cells[titleIdx];
      if (titleCell && !titleCell.querySelector(".item-lead-ic")) {
        var st = rowStatus(tr), chip;
        if (st) {
          chip = document.createElement("i");
          chip.className = "item-lead-ic acc-" + st.c + " ti " + st.i;
          tr.style.setProperty("--item-accent", "var(--" + st.c + ")");
        } else if (idxNum && /^\d+$/.test(idxNum)) {
          chip = document.createElement("span");
          chip.className = "item-lead-ic acc-primary item-rank";
          chip.textContent = idxNum;
          tr.style.setProperty("--item-accent", "var(--primary)");
        } else {
          chip = document.createElement("i");
          chip.className = "item-lead-ic acc-secondary ti " + pageIc;
        }
        titleCell.insertBefore(chip, titleCell.firstChild);
      }
    });
  }

  function setupResponsiveTables() {
    [].forEach.call(document.querySelectorAll(".table"), function (table) {
      labelTable(table);
      var tb = table.querySelector("tbody");
      if (tb && window.MutationObserver) {
        var obs = new MutationObserver(function () {
          obs.disconnect();
          labelTable(table);
          obs.observe(tb, { childList: true });
        });
        obs.observe(tb, { childList: true });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupResponsiveTables);
  } else {
    setupResponsiveTables();
  }

  /* =============== 9. PWA: service worker + nút cài đặt =============== */
  /* Chỉ chạy qua http/https (GitHub Pages). Bản bundle WebView load
     qua file:// → bỏ qua toàn bộ, không lỗi console. */

  try {
    if (location.protocol === "http:" || location.protocol === "https:") {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").catch(function () { /* noop */ });
      }

      var isStandalone =
        (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
        window.navigator.standalone === true;
      var pwaDismissed = localStorage.getItem("ioc-pwa-dismissed") === "1";

      var installBar = null;

      var removeInstallBar = function () {
        if (installBar && installBar.parentNode) installBar.parentNode.removeChild(installBar);
        installBar = null;
      };

      var dismissInstall = function () {
        localStorage.setItem("ioc-pwa-dismissed", "1");
        removeInstallBar();
      };

      var showInstallBar = function (html, ctaLabel, onCta) {
        if (installBar) return;
        installBar = document.createElement("div");
        installBar.className = "pwa-install";
        installBar.innerHTML =
          '<span class="pwa-text">' + html + "</span>" +
          (ctaLabel ? '<button class="pwa-cta"></button>' : "") +
          '<button class="pwa-close" aria-label="Đóng"><i class="ti ti-x"></i></button>';
        if (ctaLabel) {
          var cta = installBar.querySelector(".pwa-cta");
          cta.textContent = ctaLabel;
          cta.addEventListener("click", onCta);
        }
        installBar.querySelector(".pwa-close").addEventListener("click", dismissInstall);
        document.body.appendChild(installBar);
      };

      if (!isStandalone && !pwaDismissed) {
        var deferredPrompt = null;

        window.addEventListener("beforeinstallprompt", function (e) {
          e.preventDefault();
          deferredPrompt = e;
          showInstallBar("📲 Cài đặt ứng dụng IOC", "Cài đặt", function () {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function () {
              deferredPrompt = null;
              removeInstallBar();
            });
          });
        });

        window.addEventListener("appinstalled", removeInstallBar);

        /* iOS Safari không có beforeinstallprompt → hướng dẫn thủ công */
        var isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        if (isIos) {
          showInstallBar('Cài lên màn hình chính: bấm nút Chia sẻ <i class="ti ti-external-link"></i> → «Thêm vào MH chính»', null, null);
        }
      }
    }
  } catch (e) { /* trình duyệt cũ / WebView: bỏ qua PWA */ }
})();
