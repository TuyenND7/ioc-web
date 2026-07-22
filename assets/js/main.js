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

  function themePref() { return localStorage.getItem("ioc-theme") || "light"; }

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
      navIcon.className = pref === "dark" ? "ri-moon-clear-line" : pref === "system" ? "ri-computer-line" : "ri-sun-line";
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
      group: "Tổng quan", icon: "ri-home-smile-2-line",
      children: [{ id: "index", href: "index.html", label: "M01 · Điều hành tăng trưởng" }]
    },
    { section: "Kinh tế – Ngành (M02–M10)" },
    { id: "grdp-nganh", href: "grdp-nganh.html", icon: "ri-funds-line", label: "M02 · Giám sát GRDP theo ngành" },
    { id: "nong-nghiep", href: "nong-nghiep.html", icon: "ri-plant-line", label: "M03 · Nông, lâm nghiệp & thủy sản" },
    { id: "cong-nghiep", href: "cong-nghiep.html", icon: "ri-flashlight-line", label: "M04 · Công nghiệp, năng lượng & MT" },
    { id: "dau-tu-cong", href: "dau-tu-cong.html", icon: "ri-building-4-line", label: "M05 · Xây dựng & Đầu tư" },
    { id: "gia-thi-truong", href: "gia-thi-truong.html", icon: "ri-store-2-line", label: "M06 · Thương mại & Thị trường" },
    { id: "van-tai", href: "van-tai.html", icon: "ri-truck-line", label: "M07 · Vận tải & Logistics" },
    { id: "dich-vu", href: "dich-vu.html", icon: "ri-suitcase-line", label: "M08 · Du lịch, Văn hóa & Thể thao" },
    { id: "dich-vu-xh", href: "dich-vu-xh.html", icon: "ri-service-line", label: "M09 · Dịch vụ kinh tế & xã hội" },
    { id: "thue", href: "thue.html", icon: "ri-percent-line", label: "M10 · Thuế sản phẩm" },
    { section: "Phân tích – Điều hành (M11–M15)" },
    { id: "gis", href: "gis.html", icon: "ri-map-pin-line", label: "M11 · Hồ sơ KT địa phương & GIS" },
    { id: "canh-bao", href: "canh-bao.html", icon: "ri-alarm-warning-line", label: "M12 · Cảnh báo, nhiệm vụ & chỉ đạo", badge: "23" },
    { id: "nhiem-vu", href: "nhiem-vu.html", icon: "ri-task-line", label: "Giao việc & Nhiệm vụ" },
    { id: "du-bao", href: "du-bao.html", icon: "ri-line-chart-line", label: "M13 · Ước tính & Dự báo" },
    { id: "mo-phong", href: "mo-phong.html", icon: "ri-flow-chart", label: "M14 · Mô phỏng & Đánh giá chính sách" },
    { id: "bao-cao", href: "bao-cao.html", icon: "ri-file-chart-line", label: "M15 · Báo cáo, BI & Phát hành" },
    { section: "Nền tảng & Quản trị (M16)" },
    { id: "quan-tri-nguoi-dung", href: "quan-tri-nguoi-dung.html", icon: "ri-user-settings-line", label: "M16 · Quản trị người dùng" },
    { id: "cau-hinh-kpi", href: "cau-hinh-kpi.html", icon: "ri-equalizer-line", label: "Cấu hình KPI & danh mục" },
    { section: "Tài chính – Hành chính (ngoài danh mục IOC GRDP)" },
    { id: "ngan-sach", href: "ngan-sach.html", icon: "ri-wallet-3-line", label: "Ngân sách" },
    { id: "tai-san-cong", href: "tai-san-cong.html", icon: "ri-community-line", label: "Tài sản công" },
    { id: "doanh-nghiep", href: "doanh-nghiep.html", icon: "ri-briefcase-4-line", label: "Doanh nghiệp – ĐKKD" },
    { id: "thanh-tra", href: "thanh-tra.html", icon: "ri-shield-check-line", label: "Thanh tra / Kiểm toán" },
    { id: "cai-cach-hanh-chinh", href: "cai-cach-hanh-chinh.html", icon: "ri-government-line", label: "Cải cách hành chính" }
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
    '  <div class="brand-logo"><i class="ri-pulse-line"></i></div>' +
    '  <div class="brand-text">' +
    '    <div class="brand-name">IOC Điện Biên</div>' +
    '    <div class="brand-sub">Kinh tế số &amp; Tài chính số</div>' +
    "  </div>" +
    '  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Thu gọn menu"><i class="ri-arrow-left-double-line"></i></button>' +
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
        '<i class="chevron ri-arrow-right-s-line"></i></a>' +
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
      '<button class="nav-toggle" id="navToggle" aria-label="Mở menu"><i class="ri-menu-line"></i></button>' +

      '<div class="nav-search-trigger" id="searchTrigger">' +
      '  <i class="ri-search-line"></i><span class="hint">Tìm kiếm</span><span class="kbd">⌘K</span>' +
      "</div>" +

      '<div class="nav-right">' +

      /* ngôn ngữ */
      '<div class="dd" id="ddLang">' +
      '  <button class="nav-icon-btn" data-dd aria-label="Ngôn ngữ"><i class="ri-translate-2"></i></button>' +
      '  <div class="dd-menu">' +
      '    <div class="dd-item active"><i class="ri-check-line"></i>Tiếng Việt</div>' +
      '    <div class="dd-item"><i class="ri-earth-line"></i>English</div>' +
      "  </div>" +
      "</div>" +

      /* theme */
      '<div class="dd" id="ddTheme">' +
      '  <button class="nav-icon-btn" data-dd aria-label="Giao diện"><i id="themeIcon" class="ri-sun-line"></i></button>' +
      '  <div class="dd-menu">' +
      '    <div class="dd-item" data-theme-opt="light"><i class="ri-sun-line"></i>Sáng</div>' +
      '    <div class="dd-item" data-theme-opt="dark"><i class="ri-moon-clear-line"></i>Tối</div>' +
      '    <div class="dd-item" data-theme-opt="system"><i class="ri-computer-line"></i>Hệ thống</div>' +
      "  </div>" +
      "</div>" +

      /* lối tắt */
      '<div class="dd" id="ddShortcut">' +
      '  <button class="nav-icon-btn" data-dd aria-label="Lối tắt"><i class="ri-star-smile-line"></i></button>' +
      '  <div class="dd-menu dd-shortcuts">' +
      '    <div class="shortcut-head">Lối tắt</div>' +
      '    <div class="shortcut-grid">' +
      '      <a class="shortcut-tile" href="ngan-sach.html"><span class="ico"><i class="ri-wallet-3-line"></i></span>Ngân sách</a>' +
      '      <a class="shortcut-tile" href="dau-tu-cong.html"><span class="ico"><i class="ri-building-4-line"></i></span>Đầu tư công</a>' +
      '      <a class="shortcut-tile" href="canh-bao.html"><span class="ico"><i class="ri-alarm-warning-line"></i></span>Cảnh báo</a>' +
      '      <a class="shortcut-tile" href="nhiem-vu.html"><span class="ico"><i class="ri-task-line"></i></span>Nhiệm vụ</a>' +
      '      <a class="shortcut-tile" href="bao-cao.html"><span class="ico"><i class="ri-file-chart-line"></i></span>Báo cáo</a>' +
      '      <a class="shortcut-tile" href="cau-hinh-kpi.html"><span class="ico"><i class="ri-equalizer-line"></i></span>Cấu hình KPI</a>' +
      "    </div>" +
      "  </div>" +
      "</div>" +

      /* thông báo */
      '<div class="dd" id="ddNotif">' +
      '  <button class="nav-icon-btn" data-dd aria-label="Thông báo"><i class="ri-notification-3-line"></i><span class="pulse-dot" id="notifDot"></span></button>' +
      '  <div class="dd-menu dd-notif">' +
      '    <div class="notif-head"><span>Thông báo</span>' +
      '      <button class="mark-read" id="markRead" title="Đánh dấu đã đọc"><i class="ri-check-double-line"></i></button></div>' +
      '    <div class="notif-item"><div class="notif-icon tint-danger"><i class="ri-alarm-warning-line"></i></div>' +
      '      <div class="notif-body"><div class="notif-title">Giải ngân chậm</div>' +
      '      <div class="notif-text">Dự án Đường vành đai 2 dưới 30% kế hoạch</div>' +
      '      <div class="notif-time">10 phút trước</div></div></div>' +
      '    <div class="notif-item"><div class="notif-icon tint-danger"><i class="ri-funds-line"></i></div>' +
      '      <div class="notif-body"><div class="notif-title">Hụt thu tiền sử dụng đất</div>' +
      '      <div class="notif-text">Quý III mới đạt 41% dự toán</div>' +
      '      <div class="notif-time">2 giờ trước</div></div></div>' +
      '    <div class="notif-item"><div class="notif-icon tint-warning"><i class="ri-line-chart-line"></i></div>' +
      '      <div class="notif-body"><div class="notif-title">CPI lương thực tăng</div>' +
      '      <div class="notif-text">+1,8% so với tháng trước</div>' +
      '      <div class="notif-time">5 giờ trước</div></div></div>' +
      '    <div class="notif-item"><div class="notif-icon tint-info"><i class="ri-file-list-3-line"></i></div>' +
      '      <div class="notif-body"><div class="notif-title">Thiếu báo cáo quyết toán</div>' +
      '      <div class="notif-text">3 đơn vị chưa nộp báo cáo tháng 6</div>' +
      '      <div class="notif-time">Hôm qua</div></div></div>' +
      '    <div class="notif-foot"><a href="canh-bao.html">Xem tất cả cảnh báo</a></div>' +
      "  </div>" +
      "</div>" +

      /* user */
      '<div class="dd" id="ddUser">' +
      '  <button class="nav-user-btn" data-dd aria-label="Tài khoản"><span class="avatar online">LT</span></button>' +
      '  <div class="dd-menu">' +
      '    <div class="dd-header"><span class="avatar sm">LT</span>' +
      '      <div><div class="t">Lãnh đạo Tỉnh</div><div class="s">Chủ tịch UBND tỉnh</div></div></div>' +
      '    <div class="dd-item"><i class="ri-user-3-line"></i>Hồ sơ cá nhân</div>' +
      '    <div class="dd-item"><i class="ri-settings-3-line"></i>Cài đặt</div>' +
      '    <div class="dd-divider"></div>' +
      '    <div class="dd-item danger"><i class="ri-logout-box-r-line"></i>Đăng xuất</div>' +
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
    '    <i class="ri-search-line"></i>' +
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
        '<div class="dd-item"><i class="ri-eye-line"></i>Xem chi tiết</div>' +
        '<div class="dd-item"><i class="ri-refresh-line"></i>Làm mới</div>' +
        '<div class="dd-item"><i class="ri-download-2-line"></i>Xuất Excel</div>';
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

  // stat card theo anatomy mẫu: icon trên trái, badge % trên phải,
  // số to, label dưới, pill ghi chú
  window.IOC.statCard = function (o) {
    var badge = "";
    if (o.badge) {
      var cls = o.badgeClass || (o.dir === "down" ? "badge-danger" : "badge-success");
      var arrow = o.dir === "down" ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line";
      badge = '<span class="badge ' + cls + '"><i class="' + arrow + '"></i>' + o.badge + "</span>";
    }
    return '<div class="card stat-card ' + (o.col || "col-3") + '">' +
      '<div class="card-body">' +
      '<div class="stat-top">' +
      '<div class="stat-icon ' + o.tint + '"><i class="' + o.icon + '"></i></div>' + badge +
      "</div>" +
      '<div class="stat-value">' + o.value + (o.unit ? " <small>" + o.unit + "</small>" : "") + "</div>" +
      '<div class="stat-label">' + o.label + "</div>" +
      (o.note ? '<span class="stat-note">' + o.note + "</span>" : "") +
      "</div></div>";
  };

  window.IOC.badgeMucDo = function (mucDo) {
    if (mucDo === "cao") return '<span class="badge badge-danger"><i class="ri-error-warning-line"></i>Cao</span>';
    if (mucDo === "trung binh") return '<span class="badge badge-warning"><i class="ri-alert-line"></i>Trung bình</span>';
    return '<span class="badge badge-info"><i class="ri-information-line"></i>Thấp</span>';
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
          '<button class="pwa-close" aria-label="Đóng"><i class="ri-close-line"></i></button>';
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
          showInstallBar('Cài lên màn hình chính: bấm nút Chia sẻ <i class="ri-share-box-line"></i> → «Thêm vào MH chính»', null, null);
        }
      }
    }
  } catch (e) { /* trình duyệt cũ / WebView: bỏ qua PWA */ }
})();
