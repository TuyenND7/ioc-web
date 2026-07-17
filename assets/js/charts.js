/* ============================================================
   IOC – biểu đồ ApexCharts theme-aware.
   Mỗi chart đăng ký (container, builderFn); khi đổi theme
   (event "ioc-theme-change") toàn bộ chart được dựng lại.
   ============================================================ */

(function () {
  if (typeof ApexCharts === "undefined" || !window.IOC_DATA) return;

  var D = window.IOC_DATA;
  var fmt = window.IOC.fmt;

  var BRAND = {
    primary: "#666CFF",
    info: "#26C6F9",
    success: "#72E128",
    warning: "#FDB528",
    danger: "#FF4D49",
    secondary: "#6D788D"
  };

  /* mobile ≤576px: chart thấp hơn, legend xuống dưới */
  var mqMobile = window.matchMedia("(max-width: 576px)");
  function isMob() { return mqMobile.matches; }
  function H(desk, mob) { return isMob() ? mob : desk; }

  function T() {
    var dark = window.IOC.isDark();
    return {
      dark: dark,
      fore: dark ? "rgba(228,230,244,0.87)" : "rgba(76,78,100,0.87)",
      muted: dark ? "rgba(228,230,244,0.6)" : "rgba(76,78,100,0.6)",
      heading: dark ? "#E4E6F4" : "#4C4E64",
      grid: dark ? "#3C3F59" : "#EEEEF1",
      cardBg: dark ? "#30334E" : "#FFFFFF",
      tooltip: dark ? "dark" : "light"
    };
  }

  function base(extra) {
    var t = T();
    var o = {
      chart: {
        fontFamily: '"Inter", sans-serif',
        toolbar: { show: false },
        animations: { enabled: false },
        parentHeightOffset: 0,
        foreColor: t.muted
      },
      grid: { borderColor: t.grid, strokeDashArray: 5, padding: { top: -10 } },
      tooltip: { theme: t.tooltip },
      dataLabels: { enabled: false }
    };
    return deepMerge(o, extra || {});
  }

  function deepMerge(target, src) {
    for (var k in src) {
      if (src[k] && typeof src[k] === "object" && !Array.isArray(src[k]) &&
          target[k] && typeof target[k] === "object" && !Array.isArray(target[k])) {
        deepMerge(target[k], src[k]);
      } else {
        target[k] = src[k];
      }
    }
    return target;
  }

  function axisLabels() { return { style: { colors: T().muted, fontSize: "12px" } }; }

  function legendTop() {
    if (isMob()) {
      return {
        position: "bottom",
        horizontalAlign: "center",
        markers: { size: 5, shape: "circle" },
        labels: { colors: T().fore },
        itemMargin: { horizontal: 8, vertical: 2 }
      };
    }
    return {
      position: "top",
      horizontalAlign: "right",
      markers: { size: 5, shape: "circle" },
      labels: { colors: T().fore }
    };
  }

  /* ---- registry: dựng lại khi đổi theme ---- */
  var registry = [];

  function make(sel, build) {
    var el = document.querySelector(sel);
    if (!el) return;
    var chart = new ApexCharts(el, build());
    chart.render();
    registry.push({ el: el, build: build, chart: chart });
  }

  function rebuildAll() {
    registry.forEach(function (r) {
      try { r.chart.destroy(); } catch (e) { /* noop */ }
      r.chart = new ApexCharts(r.el, r.build());
      r.chart.render();
    });
  }

  window.addEventListener("ioc-theme-change", rebuildAll);

  /* dựng lại khi vượt qua breakpoint mobile (xoay màn hình / resize) */
  if (mqMobile.addEventListener) mqMobile.addEventListener("change", rebuildAll);
  else if (mqMobile.addListener) mqMobile.addListener(rebuildAll);

  var tyDong = function (v) { return v == null ? "" : fmt(v) + " tỷ đồng"; };

  /* =============== DASHBOARD =============== */

  /* 1. Radial: tỷ lệ giải ngân */
  make("#chartGiaiNganRadial", function () {
    return {
      chart: { type: "radialBar", height: 148, sparkline: { enabled: true }, fontFamily: '"Inter", sans-serif', animations: { enabled: false } },
      series: [58.4],
      colors: [BRAND.primary],
      plotOptions: {
        radialBar: {
          hollow: { size: "55%" },
          track: { background: "rgba(102,108,255,0.12)" },
          dataLabels: {
            name: { show: false },
            value: {
              offsetY: 5, fontSize: "18px", fontWeight: 700, color: T().heading,
              formatter: function (v) { return v.toFixed(1).replace(".", ",") + "%"; }
            }
          }
        }
      },
      stroke: { lineCap: "round" }
    };
  });

  /* 2. Cột: Thu – Chi NSNN theo tháng */
  make("#chartThuChi", function () {
    return base({
      chart: { type: "bar", height: H(330, 260) },
      series: [
        { name: "Tổng thu", data: D.thuChi.thu },
        { name: "Tổng chi", data: D.thuChi.chi }
      ],
      colors: [BRAND.primary, BRAND.info],
      plotOptions: { bar: { columnWidth: "58%", borderRadius: 4, borderRadiusApplication: "end" } },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: { categories: D.months, axisBorder: { show: false }, axisTicks: { show: false }, labels: axisLabels() },
      yaxis: { labels: deepMerge(axisLabels(), { formatter: function (v) { return fmt(v); } }) },
      legend: legendTop(),
      tooltip: { y: { formatter: tyDong } }
    });
  });

  /* 3. Donut: giải ngân theo lĩnh vực */
  make("#chartLinhVuc", function () {
    var t = T();
    var tong = D.giaiNganLinhVuc.values.reduce(function (a, b) { return a + b; }, 0);
    return {
      chart: { type: "donut", height: H(280, 260), fontFamily: '"Inter", sans-serif', animations: { enabled: false } },
      series: D.giaiNganLinhVuc.values,
      labels: D.giaiNganLinhVuc.labels,
      colors: [BRAND.primary, BRAND.warning, BRAND.danger, BRAND.success, BRAND.info],
      stroke: { width: 3, colors: [t.cardBg] },
      dataLabels: { enabled: false },
      legend: { position: "bottom", markers: { size: 5, shape: "circle" }, labels: { colors: t.fore }, itemMargin: { horizontal: 8, vertical: 2 } },
      plotOptions: {
        pie: {
          donut: {
            size: "72%",
            labels: {
              show: true,
              name: { show: true, fontSize: "12px", color: t.muted, offsetY: 18 },
              value: { show: true, fontSize: "22px", fontWeight: 700, color: t.heading, offsetY: -16, formatter: function (v) { return fmt(Number(v)); } },
              total: { show: true, label: "tỷ đồng", fontSize: "12px", color: t.muted, formatter: function () { return fmt(tong); } }
            }
          }
        }
      },
      tooltip: { theme: t.tooltip, y: { formatter: function (v) { return fmt(v) + " tỷ đồng (" + (v / tong * 100).toFixed(1).replace(".", ",") + "%)"; } } }
    };
  });

  /* 4. Line: CPI 12 tháng */
  make("#chartCpi", function () {
    return base({
      chart: { type: "line", height: H(260, 230) },
      series: [{ name: "CPI (gốc T12 năm trước = 100)", data: D.cpi }],
      colors: [BRAND.warning],
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 4, strokeWidth: 2, strokeColors: T().cardBg, colors: [BRAND.warning], hover: { size: 6 } },
      xaxis: { categories: D.months, axisBorder: { show: false }, axisTicks: { show: false }, labels: axisLabels() },
      yaxis: { min: 99.5, labels: deepMerge(axisLabels(), { formatter: function (v) { return v.toFixed(1).replace(".", ","); } }) },
      tooltip: { y: { formatter: function (v) { return v.toFixed(1).replace(".", ",") + " điểm"; } } }
    });
  });

  /* 5. Sparkline: doanh nghiệp thành lập mới */
  make("#chartDoanhNghiep", function () {
    return {
      chart: { type: "area", height: 110, sparkline: { enabled: true }, fontFamily: '"Inter", sans-serif', animations: { enabled: false } },
      series: [{ name: "DN thành lập mới", data: D.doanhNghiepMoi.thang }],
      colors: [BRAND.success],
      stroke: { curve: "smooth", width: 2.5 },
      fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0.05, shadeIntensity: 1 } },
      tooltip: {
        theme: T().tooltip,
        x: { formatter: function (i) { return "Tháng " + i; } },
        y: { formatter: function (v) { return fmt(v) + " doanh nghiệp"; } }
      }
    };
  });

  /* 6. Horizontal bar: top địa bàn thu ngân sách (số liệu trong thanh) */
  make("#chartTopDiaBan", function () {
    var t = T();
    return base({
      chart: { type: "bar", height: H(320, 290) },
      series: [{ name: "Số thu", data: D.topDiaBan.map(function (x) { return x.thu; }) }],
      colors: [BRAND.primary, BRAND.info, BRAND.success, BRAND.warning, BRAND.danger, BRAND.secondary],
      plotOptions: {
        bar: { horizontal: true, distributed: true, barHeight: "62%", borderRadius: 4, borderRadiusApplication: "end" }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        offsetX: 8,
        style: { fontSize: "12px", fontWeight: 600, colors: ["#fff"] },
        formatter: function (v, opt) { return isMob() ? fmt(v) + " tỷ" : fmt(v) + " tỷ · " + D.topDiaBan[opt.dataPointIndex].keHoach + "% KH"; },
        dropShadow: { enabled: false }
      },
      xaxis: {
        categories: D.topDiaBan.map(function (x) { return x.ten; }),
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: deepMerge(axisLabels(), { formatter: function (v) { return fmt(Number(v)); } })
      },
      yaxis: { labels: { style: { colors: t.fore, fontSize: "13px" } } },
      legend: { show: false },
      grid: { borderColor: t.grid, strokeDashArray: 5, padding: { top: -14 } },
      tooltip: { y: { formatter: tyDong } }
    });
  });

  /* =============== NGÂN SÁCH / ĐẦU TƯ CÔNG =============== */

  /* 7. Ngân sách: Dự toán vs Thực hiện */
  make("#chartNganSach", function () {
    return base({
      chart: { type: "line", height: H(340, 260) },
      series: [
        { name: "Thực hiện thu", type: "column", data: D.nganSach.thucHienThu },
        { name: "Dự toán thu", type: "line", data: D.nganSach.duToanThu }
      ],
      colors: [BRAND.primary, BRAND.secondary],
      stroke: { width: [0, 2.5], dashArray: [0, 6], curve: "straight" },
      plotOptions: { bar: { columnWidth: "48%", borderRadius: 4, borderRadiusApplication: "end" } },
      markers: { size: [0, 0] },
      xaxis: { categories: D.months, axisBorder: { show: false }, axisTicks: { show: false }, labels: axisLabels() },
      yaxis: { labels: deepMerge(axisLabels(), { formatter: function (v) { return fmt(v); } }) },
      legend: legendTop(),
      tooltip: { shared: true, y: { formatter: tyDong } }
    });
  });

  /* 8. Đầu tư công: lũy kế vs kế hoạch */
  make("#chartDauTuCong", function () {
    return base({
      chart: { type: "area", height: H(340, 260) },
      series: [
        { name: "Giải ngân lũy kế", data: D.dauTuCong.giaiNganLuyKe },
        { name: "Kế hoạch lũy kế", data: D.dauTuCong.keHoachLuyKe }
      ],
      colors: [BRAND.primary, BRAND.secondary],
      stroke: { width: [3, 2.5], dashArray: [0, 6], curve: "straight" },
      fill: { type: ["gradient", "solid"], gradient: { opacityFrom: 0.35, opacityTo: 0.03 }, opacity: [1, 0] },
      markers: { size: 0, hover: { size: 5 } },
      xaxis: { categories: D.months, axisBorder: { show: false }, axisTicks: { show: false }, labels: axisLabels() },
      yaxis: { labels: deepMerge(axisLabels(), { formatter: function (v) { return fmt(v); } }) },
      legend: legendTop(),
      tooltip: { shared: true, y: { formatter: tyDong } }
    });
  });

  /* =============== TÀI SẢN CÔNG =============== */

  /* 9. Donut phân loại tài sản */
  make("#chartTaiSanPhanLoai", function () {
    var t = T();
    var tong = D.taiSanCong.phanLoai.values.reduce(function (a, b) { return a + b; }, 0);
    return {
      chart: { type: "donut", height: H(300, 270), fontFamily: '"Inter", sans-serif', animations: { enabled: false } },
      series: D.taiSanCong.phanLoai.values,
      labels: D.taiSanCong.phanLoai.labels,
      colors: [BRAND.primary, BRAND.warning, BRAND.danger, BRAND.success, BRAND.info],
      stroke: { width: 3, colors: [t.cardBg] },
      dataLabels: { enabled: false },
      legend: { position: "bottom", markers: { size: 5, shape: "circle" }, labels: { colors: t.fore }, itemMargin: { horizontal: 8, vertical: 2 } },
      plotOptions: {
        pie: {
          donut: {
            size: "72%",
            labels: {
              show: true,
              name: { show: true, fontSize: "12px", color: t.muted, offsetY: 18 },
              value: { show: true, fontSize: "22px", fontWeight: 700, color: t.heading, offsetY: -16, formatter: function (v) { return fmt(Number(v)); } },
              total: { show: true, label: "tỷ đồng nguyên giá", fontSize: "12px", color: t.muted, formatter: function () { return fmt(tong); } }
            }
          }
        }
      },
      tooltip: { theme: t.tooltip, y: { formatter: function (v) { return fmt(v) + " tỷ đồng (" + (v / tong * 100).toFixed(1).replace(".", ",") + "%)"; } } }
    };
  });

  /* 10. Horizontal bar: nguyên giá theo đơn vị quản lý */
  make("#chartTaiSanDonVi", function () {
    var t = T();
    return base({
      chart: { type: "bar", height: H(300, 280) },
      series: [{ name: "Nguyên giá", data: D.taiSanCong.theoDonVi.values }],
      colors: [BRAND.primary],
      plotOptions: { bar: { horizontal: true, barHeight: "58%", borderRadius: 4, borderRadiusApplication: "end" } },
      dataLabels: {
        enabled: true, textAnchor: "start", offsetX: 8,
        style: { fontSize: "12px", fontWeight: 600, colors: ["#fff"] },
        formatter: function (v) { return fmt(v) + " tỷ"; },
        dropShadow: { enabled: false }
      },
      xaxis: {
        categories: D.taiSanCong.theoDonVi.labels,
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: deepMerge(axisLabels(), { formatter: function (v) { return fmt(Number(v)); } })
      },
      yaxis: { labels: { style: { colors: t.fore, fontSize: "13px" } } },
      legend: { show: false },
      tooltip: { y: { formatter: tyDong } }
    });
  });

  /* =============== GIÁ & THỊ TRƯỜNG =============== */

  /* 11. Multi-line chỉ số giá (T1 = 100, một trục chung) */
  make("#chartGiaHangHoa", function () {
    return base({
      chart: { type: "line", height: H(340, 260) },
      series: D.giaThiTruong.chiSoGia,
      colors: [BRAND.primary, BRAND.warning, BRAND.danger, BRAND.info],
      stroke: { curve: "smooth", width: 2.5 },
      markers: { size: 0, hover: { size: 5 } },
      xaxis: { categories: D.months, axisBorder: { show: false }, axisTicks: { show: false }, labels: axisLabels() },
      yaxis: { labels: deepMerge(axisLabels(), { formatter: function (v) { return v.toFixed(0); } }) },
      legend: legendTop(),
      tooltip: { shared: true, y: { formatter: function (v) { return v == null ? "" : v.toFixed(1).replace(".", ",") + " điểm"; } } }
    });
  });

  /* =============== DOANH NGHIỆP =============== */

  /* 12. Bar: DN thành lập mới theo tháng */
  make("#chartDnThang", function () {
    return base({
      chart: { type: "bar", height: H(320, 250) },
      series: [{ name: "DN thành lập mới", data: D.doanhNghiepMoi.thang }],
      colors: [BRAND.primary],
      plotOptions: { bar: { columnWidth: "52%", borderRadius: 4, borderRadiusApplication: "end" } },
      xaxis: { categories: D.months, axisBorder: { show: false }, axisTicks: { show: false }, labels: axisLabels() },
      yaxis: { labels: axisLabels() },
      tooltip: { y: { formatter: function (v) { return fmt(v) + " doanh nghiệp"; } } }
    });
  });

  /* 13. Donut ngành nghề ("Khác" dùng xám trung tính) */
  make("#chartDnNganh", function () {
    var t = T();
    var tong = D.doanhNghiep.nganhNghe.values.reduce(function (a, b) { return a + b; }, 0);
    return {
      chart: { type: "donut", height: H(300, 270), fontFamily: '"Inter", sans-serif', animations: { enabled: false } },
      series: D.doanhNghiep.nganhNghe.values,
      labels: D.doanhNghiep.nganhNghe.labels,
      colors: [BRAND.primary, BRAND.warning, BRAND.danger, BRAND.success, BRAND.info, BRAND.secondary],
      stroke: { width: 3, colors: [t.cardBg] },
      dataLabels: { enabled: false },
      legend: { position: "bottom", markers: { size: 5, shape: "circle" }, labels: { colors: t.fore }, itemMargin: { horizontal: 8, vertical: 2 } },
      plotOptions: {
        pie: {
          donut: {
            size: "72%",
            labels: {
              show: true,
              name: { show: true, fontSize: "12px", color: t.muted, offsetY: 18 },
              value: { show: true, fontSize: "22px", fontWeight: 700, color: t.heading, offsetY: -16, formatter: function (v) { return fmt(Number(v)); } },
              total: { show: true, label: "doanh nghiệp", fontSize: "12px", color: t.muted, formatter: function () { return fmt(tong); } }
            }
          }
        }
      },
      tooltip: { theme: t.tooltip, y: { formatter: function (v) { return fmt(v) + " DN (" + (v / tong * 100).toFixed(1).replace(".", ",") + "%)"; } } }
    };
  });

  /* =============== THANH TRA =============== */

  /* 14. Grouped bar: kiến nghị đã xử lý vs tồn theo quý */
  make("#chartThanhTraQuy", function () {
    return base({
      chart: { type: "bar", height: H(320, 250) },
      series: [
        { name: "Đã xử lý", data: D.thanhTra.kienNghiQuy.daXuLy },
        { name: "Còn tồn", data: D.thanhTra.kienNghiQuy.ton }
      ],
      colors: [BRAND.primary, BRAND.danger],
      plotOptions: { bar: { columnWidth: "42%", borderRadius: 4, borderRadiusApplication: "end" } },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: { categories: D.thanhTra.kienNghiQuy.labels, axisBorder: { show: false }, axisTicks: { show: false }, labels: axisLabels() },
      yaxis: { labels: axisLabels() },
      legend: legendTop(),
      tooltip: { y: { formatter: function (v) { return fmt(v) + " kiến nghị"; } } }
    });
  });

  /* =============== CẢI CÁCH HÀNH CHÍNH =============== */

  /* 15. Line: hồ sơ tiếp nhận vs đúng hạn */
  make("#chartCchc", function () {
    return base({
      chart: { type: "area", height: H(320, 250) },
      series: [
        { name: "Hồ sơ tiếp nhận", data: D.cchc.hoSoThang.tiepNhan },
        { name: "Giải quyết đúng hạn", data: D.cchc.hoSoThang.dungHan }
      ],
      colors: [BRAND.primary, BRAND.info],
      stroke: { curve: "smooth", width: [3, 2.5] },
      fill: { type: ["gradient", "solid"], gradient: { opacityFrom: 0.3, opacityTo: 0.03 }, opacity: [1, 0] },
      markers: { size: 0, hover: { size: 5 } },
      xaxis: { categories: D.months, axisBorder: { show: false }, axisTicks: { show: false }, labels: axisLabels() },
      yaxis: { labels: deepMerge(axisLabels(), { formatter: function (v) { return fmt(v); } }) },
      legend: legendTop(),
      tooltip: { shared: true, y: { formatter: function (v) { return v == null ? "" : fmt(v) + " hồ sơ"; } } }
    });
  });
})();
