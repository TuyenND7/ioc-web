/* ============================================================
   IOC – Dữ liệu mẫu (dummy) — đơn vị: tỷ đồng trừ khi ghi khác
   ============================================================ */

window.IOC_DATA = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],

  // ---- GRDP tỉnh Điện Biên (số liệu THẬT, chuỗi hiệu chỉnh cuối năm) ----
  // Nguồn: Cục Thống kê / báo cáo tổng kết KT-XH tỉnh Điện Biên 2023–2025.
  grdp: {
    // Tăng trưởng theo quý — % so với cùng kỳ năm trước
    quy: {
      labels: ["23-Q1", "23-Q2", "23-Q3", "23-Q4", "24-Q1", "24-Q2", "24-Q3", "24-Q4", "25-Q1", "25-Q2", "25-Q3", "25-Q4"],
      tang:   [6.71, 5.90, 8.78, 7.02, 6.86, 15.00, 11.10, 2.37, 8.08, 4.68, 8.02, 8.78]
    },
    // Tăng trưởng cả năm + quy mô (giá so sánh 2010, tỷ đồng)
    nam: {
      labels: ["2023", "2024", "2025"],
      tang: [7.10, 8.51, 7.34],
      quyMo: [14912.39, 16263.22, 17547.78]
    },
    // Đóng góp của các khu vực vào mức tăng 7,34% năm 2025
    dongGop2025: [
      { ten: "Dịch vụ", tang: 8.16, diem: 4.80, tyTrong: 65.4 },
      { ten: "Công nghiệp – xây dựng", tang: 8.52, diem: 1.82, tyTrong: 24.8 },
      { ten: "Nông, lâm nghiệp & thủy sản", tang: 2.94, diem: 0.46, tyTrong: 6.3 },
      { ten: "Thuế sản phẩm trừ trợ cấp", tang: 6.20, diem: 0.26, tyTrong: 3.5 }
    ],
    // Hệ số độ nhạy (mô hình kế toán tĩnh, cơ cấu 2025):
    // ngành tăng thêm 1 điểm % → GRDP toàn tỉnh tăng thêm heSo điểm %
    doNhay: {
      labels: ["Dịch vụ", "Công nghiệp – xây dựng", "Nông, lâm nghiệp & TS", "Thuế sản phẩm"],
      heSo: [0.588, 0.214, 0.157, 0.042]
    },
    // Kịch bản mô phỏng GRDP (mô hình độ nhạy 2025) — số liệu thật từ tài liệu phân tích
    kichBan: [
      { ten: "Cơ sở (thực hiện 2025)", grdp: 7.34, loai: "co so" },
      { ten: "Dịch vụ tăng thêm 2 điểm %", grdp: 8.52, loai: "tich cuc" },
      { ten: "Công nghiệp – xây dựng tăng thêm 3 điểm %", grdp: 7.98, loai: "tich cuc" },
      { ten: "Nông nghiệp giảm 2 điểm %", grdp: 7.03, loai: "bat loi" },
      { ten: "Dịch vụ giảm 2 điểm %", grdp: 6.16, loai: "bat loi" },
      { ten: "Dịch vụ giảm 2 điểm %, CN–XD tăng 3 điểm %", grdp: 6.80, loai: "bat loi" }
    ]
  },

  // ================= KỊCH BẢN TĂNG TRƯỞNG 2026 (SỐ LIỆU THẬT) =================
  // Nguồn: PL-1 KBTT QIII-IV/2026 (Đảng uỷ UBND tỉnh, 17/7/2026), giá SS 2020, tỷ đồng
  kb2026: {
    tong: { nam2025: 30469, q1: 6704.28, q1Tang: 9.28, q2: 8733.04, q2Tang: 8.2, kq6t: 15437.3, kqTang6t: 8.67,
            kbTang6t: 10.46, lech6t: -1.79, muc2026: 33826.4, mucTang2026: 11.02,
            cuoiNam: 18389.1, cuoiTang: 13.07, q3: 8196.09, q3Tang: 11.67, q4: 10193, q4Tang: 14.22 },
    khuVuc: [
      { ten: "Nông, lâm nghiệp & thủy sản", nam2025: 4979.6, kq6t: 2668.16, kqTang6t: 4.16, kbTang6t: 3.89, lech6t: 0.27, muc2026: 5186.23, mucTang2026: 4.15, q3Tang: 4.2, q4Tang: 4.12, cuoiTang: 4.14 },
      { ten: "Công nghiệp – xây dựng", nam2025: 5738.7, kq6t: 2550.91, kqTang6t: 12.92, kbTang6t: 19.59, lech6t: -6.67, muc2026: 6496.6, mucTang2026: 13.21, q3Tang: 11.84, q4Tang: 14.61, cuoiTang: 13.39 },
      { ten: "Dịch vụ", nam2025: 18448.5, kq6t: 9580.98, kqTang6t: 8.98, kbTang6t: 10.38, lech6t: -1.39, muc2026: 20742.1, mucTang2026: 12.43, q3Tang: 13.04, q4Tang: 18.03, cuoiTang: 15.57 },
      { ten: "Thuế sản phẩm trừ trợ cấp", nam2025: 1302.21, kq6t: 637.28, kqTang6t: 7.33, kbTang6t: 6.82, lech6t: 0.51, muc2026: 1401.47, mucTang2026: 7.62, q3Tang: 7.74, q4Tang: 7.97, cuoiTang: 7.87 },
    ],
    // 20 ngành kinh tế cấp I — kết quả 6T/2026 vs kịch bản, mục tiêu Q3–Q4
    nganh: [
      { ma: "A", ten: "Nông nghiệp, lâm nghiệp và thuỷ sản", nam2025: 4979.6, kq6t: 2668.16, kqTang6t: 4.16, kbTang6t: 3.89, lech6t: 0.27, muc2026: 5186.23, mucTang2026: 4.15, q3Tang: 4.2, q4Tang: 4.12, cuoiTang: 4.14, danhGia: "Đạt", chuTri: "Sở Nông nghiệp và Môi trường được giao đầu năm (quý III: 3,7" },
      { ma: "B", ten: "Khai khoáng", nam2025: 131.15, kq6t: 47.29, kqTang6t: 2.46, kbTang6t: 9.79, lech6t: -7.34, muc2026: 140.59, mucTang2026: 7.2, q3Tang: 5.91, q4Tang: 12.36, cuoiTang: 9.78, danhGia: "Không đạt", chuTri: "Sở Công Thương" },
      { ma: "C", ten: "Công nghiệp chế biến, chế tạo", nam2025: 1050.13, kq6t: 596.03, kqTang6t: 16.18, kbTang6t: 15.11, lech6t: 1.07, muc2026: 1195.14, mucTang2026: 13.81, q3Tang: 10.15, q4Tang: 12.83, cuoiTang: 11.55, danhGia: "Đạt", chuTri: "Sở Công Thương" },
      { ma: "D", ten: "SX & PP điện, khí đốt, nước nóng...", nam2025: 1186.82, kq6t: 350.92, kqTang6t: 14, kbTang6t: 13.31, lech6t: 0.69, muc2026: 1322.42, mucTang2026: 11.43, q3Tang: 12.8, q4Tang: 8.4, cuoiTang: 10.53, danhGia: "Đạt", chuTri: "Sở Công Thương" },
      { ma: "E", ten: "Cung cấp nước; hoạt động quản lý và xử lý rác thải, nước thải", nam2025: 108.81, kq6t: 54.9, kqTang6t: 9.26, kbTang6t: 10.68, lech6t: -1.42, muc2026: 118.3, mucTang2026: 8.72, q3Tang: 5.46, q4Tang: 10.52, cuoiTang: 8.26, danhGia: "Không đạt", chuTri: "" },
      { ma: "F", ten: "Xây dựng", nam2025: 3261.8, kq6t: 1501.78, kqTang6t: 11.92, kbTang6t: 22.9, lech6t: -10.98, muc2026: 3720.14, mucTang2026: 14.05, q3Tang: 12.35, q4Tang: 17.76, cuoiTang: 15.54, danhGia: "Không đạt", chuTri: "Sở Xây dựng đã phân bổ chỉ tiêu đến các xã, phường" },
      { ma: "G", ten: "Bán buôn và bán lẻ; sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác", nam2025: 2486.46, kq6t: 1323.81, kqTang6t: 12.68, kbTang6t: 11.61, lech6t: 1.07, muc2026: 2832.08, mucTang2026: 13.9, q3Tang: 14.31, q4Tang: 15.74, cuoiTang: 15, danhGia: "Đạt", chuTri: "Sở Công Thương" },
      { ma: "H", ten: "Vận tải kho bãi", nam2025: 844.31, kq6t: 447.96, kqTang6t: 11.46, kbTang6t: 16.07, lech6t: -4.61, muc2026: 958.42, mucTang2026: 13.51, q3Tang: 12.86, q4Tang: 17.91, cuoiTang: 15.38, danhGia: "Không đạt", chuTri: "Sở Xây dựng, Sở Công thương Sở Xây dựng đã có phương án phân" },
      { ma: "I", ten: "Dịch vụ lưu trú và ăn uống", nam2025: 1374.34, kq6t: 902.2, kqTang6t: 8.67, kbTang6t: 17.45, lech6t: -8.78, muc2026: 1636.56, mucTang2026: 19.08, q3Tang: 15.31, q4Tang: 55.56, cuoiTang: 34.97, danhGia: "Không đạt", chuTri: "Sở Văn hóa, Thể thao và Du lịch đã phân bổ chỉ tiêu đến xã, " },
      { ma: "J", ten: "Thông tin và truyền thông", nam2025: 1134.9, kq6t: 631.26, kqTang6t: 7.94, kbTang6t: 7.96, lech6t: -0.02, muc2026: 1262.69, mucTang2026: 11.26, q3Tang: 13, q4Tang: 17.11, cuoiTang: 14.79, danhGia: "Không đạt", chuTri: "Sở Văn hoá, Thể thao và Du lịch đã có phương án phân bổ chỉ " },
      { ma: "K", ten: "Hoạt động tài chính, ngân hàng và bảo hiểm", nam2025: 1178.72, kq6t: 520.3, kqTang6t: 6.64, kbTang6t: 9.62, lech6t: -2.97, muc2026: 1266.77, mucTang2026: 7.47, q3Tang: 7.35, q4Tang: 8.63, cuoiTang: 8.05, danhGia: "Không đạt", chuTri: "" },
      { ma: "L", ten: "Hoạt động kinh doanh bất động sản", nam2025: 2236.94, kq6t: 1070.15, kqTang6t: 5.29, kbTang6t: 5.82, lech6t: -0.53, muc2026: 2493.96, mucTang2026: 11.49, q3Tang: 15.6, q4Tang: 17.61, cuoiTang: 16.65, danhGia: "Không đạt", chuTri: "Trung tâm phát triển quỹ đất tỉnh chưa phân bổ chỉ tiêu" },
      { ma: "M", ten: "Hoạt động chuyên môn, khoa học và công nghệ", nam2025: 575.23, kq6t: 263.49, kqTang6t: 7.97, kbTang6t: 9.67, lech6t: -1.7, muc2026: 646.39, mucTang2026: 12.37, q3Tang: 14.61, q4Tang: 16.47, cuoiTang: 15.61, danhGia: "Không đạt", chuTri: "" },
      { ma: "N", ten: "Hoạt động hành chính và dịch vụ hỗ trợ", nam2025: 86.91, kq6t: 50.98, kqTang6t: 15.06, kbTang6t: 21.01, lech6t: -5.94, muc2026: 107.73, mucTang2026: 23.96, q3Tang: 32.27, q4Tang: 34.2, cuoiTang: 33.21, danhGia: "Không đạt", chuTri: "Các sở, ngành, UBND các xã phường" },
      { ma: "O", ten: "Hoạt động của Đảng cộng sản, tổ chức chính trị- xã hội, quản lý nhà nước, an ninh quốc phòng; bảo đảm xã hội bắt buộc", nam2025: 3554.06, kq6t: 1882.67, kqTang6t: 10.3, kbTang6t: 8.55, lech6t: 1.76, muc2026: 4003.79, mucTang2026: 12.65, q3Tang: 13.93, q4Tang: 15.7, cuoiTang: 14.83, danhGia: "Đạt", chuTri: "Các cơ quan Đảng, MTTQ, Công an tỉnh; Bộ CHQS tỉnh; BHXH; Cá" },
      { ma: "P", ten: "Giáo dục và đào tạo", nam2025: 2846.03, kq6t: 1398.24, kqTang6t: 6.24, kbTang6t: 9.27, lech6t: -3.04, muc2026: 3147.23, mucTang2026: 12.34, q3Tang: 9.77, q4Tang: 18.87, cuoiTang: 14.32, danhGia: "Không đạt", chuTri: "Sở Giáo dục và Đào tạo" },
      { ma: "Q", ten: "Y tế và hoạt động trợ giúp xã hội", nam2025: 1684.93, kq6t: 852.46, kqTang6t: 9.97, kbTang6t: 9.22, lech6t: 0.75, muc2026: 1860.45, mucTang2026: 10.12, q3Tang: 10.72, q4Tang: 10.87, cuoiTang: 10.8, danhGia: "Đạt", chuTri: "" },
      { ma: "R", ten: "Nghệ thuật, vui chơi và giải trí", nam2025: 117, kq6t: 54.68, kqTang6t: 7.22, kbTang6t: 8.83, lech6t: -1.6, muc2026: 129.31, mucTang2026: 10.52, q3Tang: 12.64, q4Tang: 13.58, cuoiTang: 13.07, danhGia: "Không đạt", chuTri: "Sở Văn hoá, Thể thao và Du lịch đã có phương án phân bổ chỉ " },
      { ma: "S", ten: "Hoạt động dịch vụ khác", nam2025: 290.38, kq6t: 162.9, kqTang6t: 17.12, kbTang6t: 25.13, lech6t: -8, muc2026: 354.32, mucTang2026: 22.02, q3Tang: 24.55, q4Tang: 28.37, cuoiTang: 26.52, danhGia: "Không đạt", chuTri: "" },
      { ma: "T", ten: "Hoạt động làm thuê các công việc trong các hộ gia đình, sản xuất sản phẩm vật chất và dịch vụ tự tiêu dùng của hộ gia đình", nam2025: 38.25, kq6t: 19.9, kqTang6t: 7.39, kbTang6t: 7.84, lech6t: -0.45, muc2026: 42.41, mucTang2026: 8.24, q3Tang: 11.73, q4Tang: 16.02, cuoiTang: 14.13, danhGia: "Không đạt", chuTri: "" },
    ],
    // Chỉ tiêu 6 tháng cuối năm giao cho 45 xã/phường (tỷ đồng)
    // nhaO = giá trị nhà tăng trưởng · san = m2 sàn · vanTai = vận tải kho bãi · luuTruAnUong = lưu trú + ăn uống
    diaBan: [
      { ten: "Phường Điện Biên Phủ", nhaO: 137.3, san: 18220, vanTai: 470.7, luuTruAnUong: 329.41 },
      { ten: "Phường Mường Thanh", nhaO: 77.8, san: 10329, vanTai: 201.7, luuTruAnUong: 56.1 },
      { ten: "Xã Thanh Nưa", nhaO: 93.7, san: 16957, vanTai: 2.8, luuTruAnUong: 22.9 },
      { ten: "Xã Tuần Giáo", nhaO: 71.5, san: 12934, vanTai: 8.3, luuTruAnUong: 36.9 },
      { ten: "Xã Thanh An", nhaO: 66.9, san: 12096, vanTai: 18.2, luuTruAnUong: 6.5 },
      { ten: "Phường Mường Lay", nhaO: 49.3, san: 8921, vanTai: 8.4, luuTruAnUong: 33.4 },
      { ten: "Xã Mường Nhé", nhaO: 54.6, san: 9885, vanTai: 6, luuTruAnUong: 24.5 },
      { ten: "Xã Tủa Chùa", nhaO: 48.9, san: 8850, vanTai: 6, luuTruAnUong: 20.3 },
      { ten: "Xã Mường Ảng", nhaO: 49.6, san: 8978, vanTai: 6, luuTruAnUong: 16.4 },
      { ten: "Xã Mường Phăng", nhaO: 45.2, san: 8177, vanTai: 2.8, luuTruAnUong: 22.8 },
      { ten: "Xã Na Sang", nhaO: 49.8, san: 9014, vanTai: 5, luuTruAnUong: 15.8 },
      { ten: "Xã Thanh Yên", nhaO: 50.6, san: 9149, vanTai: 2.8, luuTruAnUong: 8.7 },
      { ten: "Xã Búng Lao", nhaO: 53.8, san: 9724, vanTai: 2.8, luuTruAnUong: 5.35 },
      { ten: "Xã Na Son", nhaO: 42, san: 7592, vanTai: 6, luuTruAnUong: 12.2 },
      { ten: "Xã Nà Hỳ", nhaO: 42.1, san: 7614, vanTai: 6, luuTruAnUong: 10.38 },
      { ten: "Xã Mường Luân", nhaO: 45.5, san: 8230, vanTai: 2.8, luuTruAnUong: 8.1 },
      { ten: "Xã Nà Tấu", nhaO: 40.9, san: 7391, vanTai: 2.8, luuTruAnUong: 6.9 },
      { ten: "Xã Mường Chà", nhaO: 34.4, san: 6225, vanTai: 2.8, luuTruAnUong: 12.53 },
      { ten: "Xã Sáng Nhè", nhaO: 44.2, san: 7995, vanTai: 2.8, luuTruAnUong: 2.51 },
      { ten: "Xã Quài Tở", nhaO: 38.5, san: 6972, vanTai: 2.8, luuTruAnUong: 7.8 },
      { ten: "Xã Chiềng Sinh", nhaO: 40.4, san: 7306, vanTai: 2.8, luuTruAnUong: 3.51 },
      { ten: "Xã Sính Phình", nhaO: 38.1, san: 6894, vanTai: 2.8, luuTruAnUong: 4.15 },
      { ten: "Xã Mường Lạn", nhaO: 35.9, san: 6493, vanTai: 2.8, luuTruAnUong: 2.61 },
      { ten: "Xã Xa Dung", nhaO: 35.4, san: 6406, vanTai: 2.8, luuTruAnUong: 2.51 },
      { ten: "Xã Núa Ngam", nhaO: 33.9, san: 6131, vanTai: 2.8, luuTruAnUong: 3.85 },
      { ten: "Xã Pú Nhung", nhaO: 33.4, san: 6041, vanTai: 2.8, luuTruAnUong: 2.51 },
      { ten: "Xã Mường Mùn", nhaO: 35.8, san: 6481, vanTai: 2.8, luuTruAnUong: 0 },
      { ten: "Xã Sín Chải", nhaO: 31.1, san: 5619, vanTai: 2.8, luuTruAnUong: 2.51 },
      { ten: "Xã Sam Mứn", nhaO: 25.8, san: 4674, vanTai: 2.8, luuTruAnUong: 5.6 },
      { ten: "Xã Si Pa Phìn", nhaO: 26.6, san: 4811, vanTai: 2.8, luuTruAnUong: 2.62 },
      { ten: "Xã Mường Pồn", nhaO: 26.7, san: 4825, vanTai: 2.8, luuTruAnUong: 2.51 },
      { ten: "Xã Mường Nhà", nhaO: 26.3, san: 4757, vanTai: 2.8, luuTruAnUong: 2.62 },
      { ten: "Xã Mường Toong", nhaO: 26.2, san: 4731, vanTai: 2.8, luuTruAnUong: 2.01 },
      { ten: "Xã Phình Giàng", nhaO: 25.2, san: 4555, vanTai: 2.8, luuTruAnUong: 2.51 },
      { ten: "Xã Pu Nhi", nhaO: 24.5, san: 4427, vanTai: 2.8, luuTruAnUong: 2.51 },
      { ten: "Xã Sín Thầu", nhaO: 17.4, san: 3139, vanTai: 2.8, luuTruAnUong: 9.6 },
      { ten: "Xã Mường Tùng", nhaO: 22.3, san: 4041, vanTai: 2.8, luuTruAnUong: 4.35 },
      { ten: "Xã Quảng Lâm", nhaO: 24.1, san: 4361, vanTai: 2.8, luuTruAnUong: 2.51 },
      { ten: "Xã Tủa Thàng", nhaO: 23.1, san: 4183, vanTai: 2.8, luuTruAnUong: 3.23 },
      { ten: "Xã Nà Bủng", nhaO: 22.5, san: 4063, vanTai: 2.8, luuTruAnUong: 2.09 },
      { ten: "Xã Pa Ham", nhaO: 20.4, san: 3684, vanTai: 2.8, luuTruAnUong: 2.01 },
      { ten: "Xã Nậm Kè", nhaO: 20.2, san: 3655, vanTai: 2.8, luuTruAnUong: 2.01 },
      { ten: "Xã Tìa Dình", nhaO: 16.6, san: 3011, vanTai: 2.8, luuTruAnUong: 1.81 },
      { ten: "Xã Nậm Nèn", nhaO: 18.2, san: 3300, vanTai: 2.8, luuTruAnUong: 0 },
      { ten: "Xã Chà Tở", nhaO: 13.3, san: 2404, vanTai: 2.8, luuTruAnUong: 1.31 },
    ],
    tongPhanBo: { nhaO: 1800, san: 315245, nhaOQ3: 684, nhaOQ4: 1116, vanTai: 1045.08, vanTaiQ3: 507.36, vanTaiQ4: 537.72, luuTru: 443.74, anUong: 290.62 }
  },

  // ================= NGÂN SÁCH & ĐẦU TƯ 2026 (SỐ LIỆU THẬT) =================
  ns2026: {
    // PL-5: Thu NSNN 6T/2026 theo sắc thuế (triệu đồng) — Báo cáo 304/BC-ĐU ngày 02/7/2026
    thuNSNN: {
      duToan: 2159780, th6t2025: 865014, th6t2026: 1047700, cuoiNam: 1107390,
      tyLeDuToan: 48.5, soCungKy: 21.1,
      khoan: [
        { ten: "Tiền sử dụng đất", duToan: 909780, th6t: 232057, cuoiNam: 677723, tyLe: 25.5, cungKy: 12.5 },
        { ten: "Thuế CTN & dịch vụ ngoài quốc doanh", duToan: 488000, th6t: 351054, cuoiNam: 136946, tyLe: 71.9, cungKy: 48.7 },
        { ten: "DNNN Trung ương", duToan: 225000, th6t: 103742, cuoiNam: 121258, tyLe: 46.1, cungKy: 7.4 },
        { ten: "Lệ phí trước bạ", duToan: 120000, th6t: 83326, cuoiNam: 36674, tyLe: 69.4, cungKy: 34.2 },
        { ten: "Thuế bảo vệ môi trường", duToan: 115000, th6t: 49340, cuoiNam: 65660, tyLe: 42.9, cungKy: -18.4 },
        { ten: "Thuế thu nhập cá nhân", duToan: 59760, th6t: 67322, cuoiNam: 0, tyLe: 112.7, cungKy: 48.7 },
        { ten: "Thu tiền thuê đất, mặt nước", duToan: 48000, th6t: 34201, cuoiNam: 13799, tyLe: 71.3, cungKy: 97.1 },
        { ten: "Cấp quyền khai thác khoáng sản", duToan: 42000, th6t: 31075, cuoiNam: 10925, tyLe: 74, cungKy: -14.5 },
        { ten: "Thu phí – lệ phí", duToan: 35000, th6t: 18591, cuoiNam: 16409, tyLe: 53.1, cungKy: -20.2 },
        { ten: "Xổ số kiến thiết", duToan: 35000, th6t: 21608, cuoiNam: 8700, tyLe: 61.7, cungKy: 11.9 }
      ]
    },
    // PL-4: Nguồn thu từ các dự án có sử dụng đất (tỷ đồng)
    thuSDD: {
      duToan: 909.78, duKienDuAn: 734.15, thieuHut: 175.63,
      duAn: [
        { ten: "Khu đô thị mới Him Lam phía Đông đường 60m (Khu A) – đấu giá", dienTich: 63737, gia: 4.0, giaTri: 254.95 },
        { ten: "Đấu giá khu trung tâm hành chính mới", dienTich: 97794, gia: 2.1, giaTri: 205.13 },
        { ten: "Khu dân cư đô thị Mường Thanh A", dienTich: 19070, gia: 7.5, giaTri: 143.03 },
        { ten: "Khu dân cư TDP 17, 18 phường Him Lam", dienTich: 17954, gia: 4.0, giaTri: 71.81 },
        { ten: "Khu dân cư đô thị Him Lam 7", dienTich: 14744, gia: 3.0, giaTri: 44.23 },
        { ten: "Khu dân cư – DVTM Thanh Hưng, Thanh Chăn (GĐ1)", dienTich: 25000, gia: 0.6, giaTri: 15.0 }
      ]
    },
    // PL-2: Đầu tư công 2026 (triệu đồng)
    dauTuCong: {
      keHoach: 5213019, mucTieuQ2: 1889617, giaiNgan30_6: 2428530, tyLe: 46.6,
      nhom: [
        { ten: "Dự án đầu tư công", keHoach: 2387842, mucTieu: 1178542, giaiNgan: 976546 },
        { ten: "Trường PTDTNT liên cấp", keHoach: 2292150, mucTieu: 711075, giaiNgan: 1266310 },
        { ten: "Khắc phục thiên tai & bảo trì đường bộ", keHoach: 395980, mucTieu: 0, giaiNgan: 185670 },
        { ten: "CTMTQG về Văn hóa", keHoach: 137047, mucTieu: 0, giaiNgan: 0 }
      ],
      trongDiem: [
        { ten: "Cấp điện nông thôn – \"Bừng sáng Điện Biên\"", keHoach: 1014770, giaiNgan: 332957, danhGia: "cham" },
        { ten: "GPMB, tái định cư Cảng hàng không Điện Biên", keHoach: 348597, giaiNgan: 348597, danhGia: "dat" },
        { ten: "Quản lý đa thiên tai lưu vực sông Nậm Rốm", keHoach: 266388, giaiNgan: 65265, danhGia: "cham" },
        { ten: "Trường PTDTNT TH-THCS Thanh Nưa", keHoach: 168300, giaiNgan: 118403, danhGia: "vuot" },
        { ten: "Đường kết nối vùng kinh tế động lực QL279 – QL12", keHoach: 158387, giaiNgan: 56834, danhGia: "cham" },
        { ten: "Cao tốc Sơn La – Điện Biên (đoạn qua tỉnh)", keHoach: 105000, giaiNgan: 0, danhGia: "cham" },
        { ten: "Quản lý tổng hợp nguồn nước Tuần Giáo (ODA)", keHoach: 102766, giaiNgan: 0, danhGia: "cham" },
        { ten: "Phát triển nông thôn thích ứng thiên tai (ODA)", keHoach: 102766, giaiNgan: 0, danhGia: "cham" },
        { ten: "Bảo tàng tỉnh Điện Biên", keHoach: 47898, giaiNgan: 0, danhGia: "cham" }
      ]
    },
    // PL-3: Dự án ngoài ngân sách (tỷ đồng)
    ngoaiNganSach: {
      linhVuc: [
        { ten: "Đô thị – TM – DV – DL", dangTrienKhai: 6353.7, trongDiem: 27494.1, soDuAn: 17 },
        { ten: "Năng lượng", dangTrienKhai: 2105.31, trongDiem: 9324.03, soDuAn: 11 },
        { ten: "Nông nghiệp", dangTrienKhai: 0, trongDiem: 2133, soDuAn: 8 }
      ],
      lonNhat: [
        { ten: "KĐT, du lịch nghỉ dưỡng & thể thao phía Tây Bắc", von: 23660.8, linhVuc: "Đô thị", trangThai: "Chuẩn bị khởi công" },
        { ten: "Nhà máy điện mặt trời Điện Biên 1 (300 MW)", von: 5371.27, linhVuc: "Năng lượng", trangThai: "Hoàn thiện thủ tục" },
        { ten: "Nhà máy điện gió Envision Nậm Pồ", von: 4375, linhVuc: "Năng lượng", trangThai: "GPMB, thủ tục" },
        { ten: "Tổ hợp cáp treo & du lịch văn hóa lịch sử ĐBP", von: 2076, linhVuc: "Du lịch", trangThai: "Chuẩn bị khởi công" },
        { ten: "Khu dân cư – DVTM Thanh Hưng, Thanh Chăn", von: 1977.46, linhVuc: "Đô thị", trangThai: "Đang triển khai" },
        { ten: "KĐT, TM, DL, DV và sân golf Huổi Phạ", von: 1757.36, linhVuc: "Đô thị", trangThai: "Hoàn thiện thủ tục" },
        { ten: "KĐT mới Nam Thanh Trường", von: 1638, linhVuc: "Đô thị", trangThai: "Chọn nhà đầu tư" },
        { ten: "ĐMT hồ Pá Khoang tích hợp pin lưu trữ (73 MW)", von: 1473.95, linhVuc: "Năng lượng", trangThai: "Hoàn thiện thủ tục" },
        { ten: "ĐMT trên mặt hồ thủy điện Trung Thu (72 MW)", von: 1454.05, linhVuc: "Năng lượng", trangThai: "Hoàn thiện thủ tục" },
        { ten: "KĐT mới Bắc Hồng Cúm (Khu A)", von: 998.59, linhVuc: "Đô thị", trangThai: "GPMB" }
      ],
      dienNangLuong: { dangThiCong: 61, sapKhoiCong: 471.8 }
    }
  },

  // ---- 4 lĩnh vực động lực GRDP (theo tài liệu phân tích GRDP Điện Biên) ----
  linhVuc: {
    // 1) DỊCH VỤ – DU LỊCH – THƯƠNG MẠI · động lực số 1 (đóng góp 65,4% mức tăng 2025)
    dichVu: {
      tang2025: 8.16, diem2025: 4.80, tyTrongGrdp: 59.7,
      // Du lịch theo năm — số liệu thật
      duLichNam: {
        labels: ["2023", "2024", "2025"],
        luotKhach: [1.01, 1.85, 1.454], // triệu lượt
        doanhThu: [1750, 3300, 2645]    // tỷ đồng
      },
      // Cơ cấu khu vực dịch vụ (minh họa)
      coCau: {
        labels: ["Du lịch – lưu trú – ăn uống", "Bán lẻ hàng hóa", "Vận tải – kho bãi", "Tài chính – ngân hàng", "Dịch vụ khác"],
        values: [34, 28, 14, 9, 15]
      },
      // Điểm du lịch trọng yếu (lượt khách nghìn · doanh thu tỷ) — minh họa, địa danh thật
      diemDen: [
        { ten: "Cụm di tích Chiến trường Điện Biên Phủ", khach: 620, doanhThu: 1180, xu: "tang" },
        { ten: "Sở Chỉ huy Chiến dịch – Mường Phăng", khach: 245, doanhThu: 386, xu: "tang" },
        { ten: "Suối khoáng nóng Hua Pe – U Va", khach: 168, doanhThu: 214, xu: "tang" },
        { ten: "Đèo Pha Đin – hồ Pá Khoang", khach: 132, doanhThu: 168, xu: "giam" },
        { ten: "A Pa Chải (ngã ba biên giới)", khach: 96, doanhThu: 142, xu: "tang" },
        { ten: "Cao nguyên đá Tủa Chùa", khach: 74, doanhThu: 88, xu: "giam" }
      ]
    },

    // 3) CÔNG NGHIỆP – NĂNG LƯỢNG · thứ 3, tăng nhanh nhưng phụ thuộc thời tiết
    congNghiep: {
      tang2025: 8.80,
      // Tăng trưởng IIP theo ngành năm 2025 (%) — số liệu thật
      iip2025: {
        labels: ["Khai khoáng", "Chế biến – chế tạo", "Sản xuất & phân phối điện", "Cung cấp nước, xử lý rác"],
        values: [15.73, 10.55, 6.98, 7.20]
      },
      // Sản xuất điện theo năm: 2024 đột biến (+2 nhà máy thủy điện, mưa thuận) vs 2025 bình thường — thật
      dienNam: {
        labels: ["2023", "2024", "2025"],
        tang: [12.4, 49.49, 6.98]
      },
      // Sản lượng điện theo tháng (triệu kWh) — minh họa mùa vụ, cao điểm mùa mưa T6–T10
      sanLuongDien: [168, 152, 176, 205, 268, 342, 388, 372, 331, 286, 214, 182]
    },

    // 4) NÔNG, LÂM NGHIỆP & THỦY SẢN · ổn định, chưa phải đầu tàu
    nongNghiep: {
      tang2025: 2.94, diem2025: 0.46,
      // Chỉ số giá nông sản chủ lực (T1 = 100) — minh họa, nông sản chủ lực thật
      giaNongSan: [
        { name: "Cà phê", data: [100, 103, 108, 112, 118, 121, 119, 124, 128, 126, 131, 134] },
        { name: "Mắc ca", data: [100, 101, 102, 104, 106, 108, 110, 111, 113, 114, 116, 118] },
        { name: "Lúa gạo", data: [100, 100.4, 101, 101.6, 102.1, 102.4, 102.8, 103.5, 104.2, 104.6, 105.1, 105.6] },
        { name: "Chè búp tươi", data: [100, 99, 98.5, 100, 102, 103.5, 104, 103, 102, 101.5, 102.5, 103] }
      ],
      // Nông sản chủ lực (sản lượng nghìn tấn · vùng trồng ha · % đã có hợp đồng tiêu thụ) — minh họa
      chuLuc: [
        { ten: "Lúa gạo (gạo Điện Biên)", sanLuong: 214, vung: 52000, tieuThu: 78, xu: "on dinh" },
        { ten: "Cà phê", sanLuong: 68, vung: 4600, tieuThu: 84, xu: "tang" },
        { ten: "Mắc ca", sanLuong: 12, vung: 8200, tieuThu: 72, xu: "tang" },
        { ten: "Cao su", sanLuong: 9.4, vung: 5100, tieuThu: 65, xu: "giam" },
        { ten: "Chè", sanLuong: 6.8, vung: 620, tieuThu: 69, xu: "on dinh" }
      ],
      ocop: { tong: 76, sao5: 2, sao4: 21, sao3: 53 }
    },

    // 7) VẬN TẢI & LOGISTICS
    vanTai: {
      hanhKhach2024: 51.65,   // % tăng vận chuyển hành khách 2024 (hàng không mở lại)
      doanhThuKhoBai2024: 25.76, // % tăng doanh thu vận tải – kho bãi 2024
      // Cơ cấu khối lượng vận tải theo phương thức (minh họa)
      phuongThuc: {
        labels: ["Đường bộ", "Hàng không", "Đường thủy nội địa", "Kho bãi – hỗ trợ"],
        values: [64, 18, 6, 12]
      }
    },

    // 9) DỊCH VỤ KINH TẾ & XÃ HỘI (ngoài du lịch – thương mại – vận tải)
    dichVuXH: {
      // Cơ cấu nhóm dịch vụ KT-XH (minh họa)
      coCau: {
        labels: ["Tài chính – ngân hàng", "Thông tin – truyền thông", "Y tế – giáo dục (dịch vụ)", "KHCN – tư vấn", "Hành chính công – khác"],
        values: [31, 22, 24, 11, 12]
      }
    },

    // 10) THUẾ SẢN PHẨM TRỪ TRỢ CẤP
    thue: {
      tang2025: 6.20, diem2025: 0.26, tyTrong: 3.5,
      // Cơ cấu nguồn thuế sản phẩm (minh họa)
      nguon: {
        labels: ["Thuế GTGT hàng hóa – dịch vụ", "Thuế tiêu thụ đặc biệt", "Thuế xuất – nhập khẩu", "Trợ cấp sản phẩm (trừ)"],
        values: [58, 22, 24, -4]
      }
    }
  },

  // ---- Dashboard tổng quan ----
  thuChi: {
    thu: [980, 890, 1050, 1120, 1010, 1080, 1150, 1090, 1160, 1210, 1180, 560],
    chi: [820, 760, 940, 980, 900, 950, 1020, 960, 1010, 1060, 1040, 680]
  },

  giaiNganLinhVuc: {
    labels: ["Giao thông", "Giáo dục", "Y tế", "Nông nghiệp", "Hạ tầng số"],
    values: [2140, 1380, 1160, 940, 720] // tỷ đồng đã giải ngân
  },

  cpi: [100.2, 100.5, 100.4, 100.8, 101.1, 101.3, 101.2, 101.6, 102.0, 102.3, 102.6, 103.1],

  topDiaBan: [
    { ten: "Phường Điện Biên Phủ", thu: 742, keHoach: 88 },
    { ten: "Xã Tuần Giáo", thu: 268, keHoach: 82 },
    { ten: "Xã Mường Ảng", thu: 196, keHoach: 79 },
    { ten: "Xã Mường Chà", thu: 154, keHoach: 74 },
    { ten: "Xã Tủa Chùa", thu: 121, keHoach: 68 },
    { ten: "Xã Điện Biên Đông", thu: 98, keHoach: 63 }
  ],

  canhBaoMoi: [
    { mucDo: "cao", icon: "ti ti-alert-triangle", noiDung: "Giải ngân dự án Đường vành đai 2 dưới 30% kế hoạch", thoiGian: "10 phút trước" },
    { mucDo: "cao", icon: "ti ti-chart-line", noiDung: "Thu tiền sử dụng đất Quý III đạt 41% dự toán", thoiGian: "2 giờ trước" },
    { mucDo: "trung binh", icon: "ti ti-chart-line", noiDung: "CPI nhóm lương thực tăng 1,8% so với tháng trước", thoiGian: "5 giờ trước" },
    { mucDo: "trung binh", icon: "ti ti-building", noiDung: "12 doanh nghiệp chậm nộp thuế trên 90 ngày", thoiGian: "Hôm qua" },
    { mucDo: "thap", icon: "ti ti-file-text", noiDung: "3 đơn vị chưa nộp báo cáo quyết toán tháng 6", thoiGian: "2 ngày trước" }
  ],

  nhiemVuTheoDoi: [
    { ten: "Đẩy nhanh giải ngân dự án Cầu Sông Lam", donVi: "Sở Xây dựng", han: "25/07/2026", trangThai: "dang xu ly", tienDo: 65 },
    { ten: "Rà soát nguồn thu tiền sử dụng đất", donVi: "Sở Tài chính", han: "20/07/2026", trangThai: "dang xu ly", tienDo: 48 },
    { ten: "Báo cáo tồn đọng hoàn thuế GTGT", donVi: "Thuế tỉnh", han: "15/07/2026", trangThai: "qua han", tienDo: 30 },
    { ten: "Cập nhật phương án giá dịch vụ y tế", donVi: "Sở Y tế", han: "30/07/2026", trangThai: "dang xu ly", tienDo: 72 },
    { ten: "Kiểm kê tài sản công khối giáo dục", donVi: "Sở Giáo dục & Đào tạo", han: "10/07/2026", trangThai: "hoan thanh", tienDo: 100 }
  ],

  doanhNghiepMoi: {
    thang: [86, 92, 105, 98, 112, 121, 118, 126, 134, 128, 141, 68],
    tongNam: 1329,
    tangTruong: 12.4
  },

  // ---- Ngân sách ----
  nganSach: {
    duToanThu: [1050, 1050, 1050, 1100, 1100, 1100, 1150, 1150, 1150, 1200, 1200, 1200],
    thucHienThu: [980, 890, 1050, 1120, 1010, 1080, 1150, 1090, 1160, 1210, 1180, 560],
    sacThue: [
      { ten: "Thu từ khu vực DNNN", duToan: 1850, thucHien: 1092 },
      { ten: "Thu từ DN có vốn ĐTNN", duToan: 2400, thucHien: 1524 },
      { ten: "Thu từ khu vực ngoài quốc doanh", duToan: 3100, thucHien: 1898 },
      { ten: "Thuế thu nhập cá nhân", duToan: 1450, thucHien: 941 },
      { ten: "Thuế bảo vệ môi trường", duToan: 680, thucHien: 384 },
      { ten: "Lệ phí trước bạ", duToan: 520, thucHien: 336 },
      { ten: "Thu phí, lệ phí", duToan: 340, thucHien: 214 },
      { ten: "Thu tiền sử dụng đất", duToan: 4200, thucHien: 1722 },
      { ten: "Thu tiền thuê đất, mặt nước", duToan: 760, thucHien: 486 },
      { ten: "Thu từ hoạt động xổ số kiến thiết", duToan: 980, thucHien: 641 },
      { ten: "Thu cấp quyền khai thác khoáng sản", duToan: 210, thucHien: 118 },
      { ten: "Thu khác ngân sách", duToan: 390, thucHien: 264 }
    ]
  },

  // ---- Đầu tư công ----
  dauTuCong: {
    keHoachLuyKe: [710, 1420, 2130, 2840, 3550, 4260, 4970, 5680, 6390, 7100, 7810, 8520],
    giaiNganLuyKe: [320, 690, 1140, 1680, 2260, 2890, 3540, 4180, 4760, 0, 0, 0].slice(0, 9),
    duAn: [
      { ten: "Đường vành đai 2 đoạn Đông Bắc", chuDauTu: "BQLDA Giao thông", von: 1850, giaiNgan: 28, trangThai: "cham" },
      { ten: "Cầu Sông Lam", chuDauTu: "BQLDA Giao thông", von: 1240, giaiNgan: 62, trangThai: "dang trien khai" },
      { ten: "Bệnh viện Đa khoa khu vực 500 giường", chuDauTu: "Sở Y tế", von: 980, giaiNgan: 71, trangThai: "dang trien khai" },
      { ten: "Khu tái định cư Tân Phú", chuDauTu: "UBND phường Tân Phú", von: 460, giaiNgan: 44, trangThai: "dang trien khai" },
      { ten: "Trường THPT chuyên (cơ sở 2)", chuDauTu: "Sở Giáo dục & Đào tạo", von: 380, giaiNgan: 83, trangThai: "dang trien khai" },
      { ten: "Hệ thống thủy lợi kênh Bắc", chuDauTu: "Sở Nông nghiệp & Môi trường", von: 350, giaiNgan: 57, trangThai: "dang trien khai" },
      { ten: "Trung tâm dữ liệu tỉnh (giai đoạn 1)", chuDauTu: "Sở Khoa học & Công nghệ", von: 320, giaiNgan: 35, trangThai: "cham" },
      { ten: "Kè chống sạt lở bờ sông Hiếu", chuDauTu: "BQLDA Nông nghiệp", von: 290, giaiNgan: 91, trangThai: "sap hoan thanh" },
      { ten: "Nâng cấp Quốc lộ 7 đoạn Km12–Km25", chuDauTu: "BQLDA Giao thông", von: 275, giaiNgan: 66, trangThai: "dang trien khai" },
      { ten: "Chợ đầu mối nông sản vùng", chuDauTu: "UBND xã Đại Đồng", von: 180, giaiNgan: 12, trangThai: "cham" }
    ]
  },

  // ---- Cảnh báo (trang riêng) ----
  canhBaoAll: [
    { id: "CB-0231", mucDo: "cao", linhVuc: "Đầu tư công", noiDung: "Giải ngân dự án Đường vành đai 2 dưới 30% kế hoạch năm", nguon: "Hệ thống KPI", thoiGian: "17/07/2026 08:12", trangThai: "dang mo" },
    { id: "CB-0230", mucDo: "cao", linhVuc: "Ngân sách", noiDung: "Thu tiền sử dụng đất Quý III mới đạt 41% dự toán", nguon: "Sở Tài chính", thoiGian: "17/07/2026 06:40", trangThai: "dang mo" },
    { id: "CB-0229", mucDo: "cao", linhVuc: "Doanh nghiệp", noiDung: "Nợ thuế quá hạn 90 ngày vượt 210 tỷ đồng (12 doanh nghiệp)", nguon: "Thuế tỉnh", thoiGian: "16/07/2026 15:05", trangThai: "dang xu ly" },
    { id: "CB-0228", mucDo: "trung binh", linhVuc: "Giá & Thị trường", noiDung: "CPI nhóm lương thực tăng 1,8% so với tháng trước", nguon: "Chi cục Thống kê", thoiGian: "16/07/2026 09:30", trangThai: "dang mo" },
    { id: "CB-0227", mucDo: "trung binh", linhVuc: "Đầu tư công", noiDung: "Dự án Trung tâm dữ liệu tỉnh chậm nghiệm thu gói thầu số 3", nguon: "BQLDA", thoiGian: "15/07/2026 16:22", trangThai: "dang xu ly" },
    { id: "CB-0226", mucDo: "trung binh", linhVuc: "Tài sản công", noiDung: "5 cơ sở nhà đất dôi dư chưa có phương án sắp xếp", nguon: "Sở Tài chính", thoiGian: "15/07/2026 10:48", trangThai: "dang mo" },
    { id: "CB-0225", mucDo: "thap", linhVuc: "Báo cáo", noiDung: "3 đơn vị chưa nộp báo cáo quyết toán tháng 6", nguon: "Hệ thống báo cáo", thoiGian: "14/07/2026 17:00", trangThai: "dang xu ly" },
    { id: "CB-0224", mucDo: "thap", linhVuc: "CCHC", noiDung: "Tỷ lệ hồ sơ trễ hạn lĩnh vực đất đai 4,2% (ngưỡng 4%)", nguon: "Trung tâm HCC", thoiGian: "14/07/2026 08:15", trangThai: "dang mo" },
    { id: "CB-0223", mucDo: "trung binh", linhVuc: "Ngân sách", noiDung: "Chi thường xuyên Sở A vượt 8% tiến độ dự toán quý", nguon: "KBNN tỉnh", thoiGian: "13/07/2026 14:37", trangThai: "da dong" },
    { id: "CB-0222", mucDo: "thap", linhVuc: "Giá & Thị trường", noiDung: "Giá vật liệu xây dựng (thép) tăng 2,1% trong 2 tuần", nguon: "Sở Xây dựng", thoiGian: "12/07/2026 11:20", trangThai: "da dong" },
    { id: "CB-0221", mucDo: "cao", linhVuc: "Ngân sách", noiDung: "Hụt thu thuế BVMT dự kiến 96 tỷ do sản lượng xăng dầu giảm", nguon: "Thuế tỉnh", thoiGian: "11/07/2026 09:02", trangThai: "dang xu ly" },
    { id: "CB-0220", mucDo: "thap", linhVuc: "Nhiệm vụ", noiDung: "2 nhiệm vụ điều hành sắp đến hạn trong 48 giờ", nguon: "Hệ thống nhiệm vụ", thoiGian: "10/07/2026 16:45", trangThai: "da dong" }
  ],

  // ---- Nhiệm vụ (trang riêng) ----
  nhiemVuAll: [
    { ma: "NV-118", ten: "Đẩy nhanh giải ngân dự án Cầu Sông Lam", donVi: "Sở Xây dựng", nguoiGiao: "Chủ tịch UBND tỉnh", han: "25/07/2026", trangThai: "dang xu ly", tienDo: 65 },
    { ma: "NV-117", ten: "Rà soát, đôn đốc nguồn thu tiền sử dụng đất", donVi: "Sở Tài chính", nguoiGiao: "PCT phụ trách kinh tế", han: "20/07/2026", trangThai: "dang xu ly", tienDo: 48 },
    { ma: "NV-116", ten: "Báo cáo tồn đọng hoàn thuế GTGT", donVi: "Thuế tỉnh", nguoiGiao: "Chủ tịch UBND tỉnh", han: "15/07/2026", trangThai: "qua han", tienDo: 30 },
    { ma: "NV-115", ten: "Cập nhật phương án giá dịch vụ khám chữa bệnh", donVi: "Sở Y tế", nguoiGiao: "PCT phụ trách văn xã", han: "30/07/2026", trangThai: "dang xu ly", tienDo: 72 },
    { ma: "NV-114", ten: "Kiểm kê tài sản công khối giáo dục", donVi: "Sở Giáo dục & Đào tạo", nguoiGiao: "PCT phụ trách kinh tế", han: "10/07/2026", trangThai: "hoan thanh", tienDo: 100 },
    { ma: "NV-113", ten: "Xây dựng kịch bản thu NSNN 6 tháng cuối năm", donVi: "Sở Tài chính", nguoiGiao: "Chủ tịch UBND tỉnh", han: "18/07/2026", trangThai: "dang xu ly", tienDo: 85 },
    { ma: "NV-112", ten: "Xử lý 5 cơ sở nhà đất dôi dư sau sắp xếp", donVi: "Sở Tài chính", nguoiGiao: "PCT phụ trách kinh tế", han: "08/07/2026", trangThai: "qua han", tienDo: 55 },
    { ma: "NV-111", ten: "Đối soát dữ liệu doanh nghiệp ngừng hoạt động", donVi: "Sở Tài chính (ĐKKD)", nguoiGiao: "PCT phụ trách kinh tế", han: "05/07/2026", trangThai: "hoan thanh", tienDo: 100 },
    { ma: "NV-110", ten: "Phương án bình ổn giá vật liệu xây dựng", donVi: "Sở Xây dựng", nguoiGiao: "PCT phụ trách kinh tế", han: "28/07/2026", trangThai: "dang xu ly", tienDo: 40 },
    { ma: "NV-109", ten: "Chuẩn hóa bộ KPI điều hành cấp xã", donVi: "Văn phòng UBND tỉnh", nguoiGiao: "Chủ tịch UBND tỉnh", han: "01/07/2026", trangThai: "hoan thanh", tienDo: 100 }
  ],

  // ---- Tài sản công ----
  taiSanCong: {
    phanLoai: {
      labels: ["Đất", "Nhà & công trình", "Ô tô", "Máy móc thiết bị", "Khác"],
      values: [12400, 9800, 1450, 3200, 1600] // nguyên giá, tỷ đồng
    },
    theoDonVi: {
      labels: ["Sở Giáo dục & Đào tạo", "Sở Y tế", "Sở Xây dựng", "Sở Nông nghiệp & MT", "Văn phòng UBND tỉnh", "Sở VH-TT & Du lịch"],
      values: [6240, 5980, 3420, 2860, 2150, 1780]
    },
    taiSan: [
      { ma: "TS-00412", ten: "Trụ sở liên cơ quan số 1", donVi: "Văn phòng UBND tỉnh", nguyenGia: 486, conLai: 402, trangThai: "dang su dung" },
      { ma: "TS-00387", ten: "Bệnh viện Đa khoa tỉnh (khối nhà A)", donVi: "Sở Y tế", nguyenGia: 412, conLai: 318, trangThai: "dang su dung" },
      { ma: "TS-01023", ten: "Khu đất 12,4 ha đường Nguyễn Huệ", donVi: "Sở Tài chính", nguyenGia: 380, conLai: 380, trangThai: "cho thue" },
      { ma: "TS-00551", ten: "Trường THPT chuyên (cơ sở 1)", donVi: "Sở Giáo dục & Đào tạo", nguyenGia: 265, conLai: 214, trangThai: "dang su dung" },
      { ma: "TS-00698", ten: "Trung tâm hội nghị tỉnh", donVi: "Văn phòng UBND tỉnh", nguyenGia: 238, conLai: 176, trangThai: "cho thue" },
      { ma: "TS-00734", ten: "Hệ thống xử lý nước thải KCN Bắc", donVi: "Sở Nông nghiệp & MT", nguyenGia: 186, conLai: 121, trangThai: "dang su dung" },
      { ma: "TS-00845", ten: "Nhà khách UBND tỉnh (cũ)", donVi: "Văn phòng UBND tỉnh", nguyenGia: 94, conLai: 12, trangThai: "cho thanh ly" },
      { ma: "TS-00958", ten: "Hệ thống máy chủ Trung tâm dữ liệu", donVi: "Sở Khoa học & Công nghệ", nguyenGia: 42, conLai: 31, trangThai: "dang su dung" },
      { ma: "TS-01102", ten: "Thiết bị chẩn đoán hình ảnh MRI 3.0", donVi: "Sở Y tế", nguyenGia: 38, conLai: 27, trangThai: "dang su dung" },
      { ma: "TS-00902", ten: "Trạm y tế phường Quang Trung (cũ)", donVi: "Sở Y tế", nguyenGia: 18, conLai: 2, trangThai: "cho thanh ly" },
      { ma: "TS-01187", ten: "Nhà văn hóa xã Đại Đồng", donVi: "UBND xã Đại Đồng", nguyenGia: 14, conLai: 9, trangThai: "dang su dung" },
      { ma: "TS-00913", ten: "Xe ô tô chuyên dùng BKS 80A-123.45", donVi: "Văn phòng UBND tỉnh", nguyenGia: 3.2, conLai: 0.9, trangThai: "cho thanh ly" }
    ]
  },

  // ---- Giá & Thị trường ----
  giaThiTruong: {
    // chỉ số giá so với tháng 1 = 100 (quy về một trục, không dùng 2 thang đo)
    chiSoGia: [
      { name: "Gạo tẻ thường", data: [100, 100.4, 100.9, 101.2, 101.8, 102.1, 102.6, 103.4, 104.1, 104.6, 105.2, 105.8] },
      { name: "Xăng RON95", data: [100, 101.8, 99.6, 98.4, 100.2, 102.6, 104.1, 103.2, 101.8, 102.9, 104.6, 106.2] },
      { name: "Thịt lợn hơi", data: [100, 102.1, 104.6, 106.2, 108.4, 110.1, 109.2, 111.6, 113.4, 112.8, 114.2, 115.6] },
      { name: "Điện sinh hoạt", data: [100, 100, 100, 100, 103.2, 103.2, 103.2, 103.2, 103.2, 103.2, 106.4, 106.4] }
    ],
    bangGia: [
      { matHang: "Gạo tẻ thường", donVi: "đồng/kg", kyTruoc: 18500, hienTai: 19200, bienDong: 3.8 },
      { matHang: "Gạo nếp", donVi: "đồng/kg", kyTruoc: 28000, hienTai: 28500, bienDong: 1.8 },
      { matHang: "Thịt lợn hơi", donVi: "đồng/kg", kyTruoc: 64000, hienTai: 67500, bienDong: 5.5 },
      { matHang: "Thịt bò thăn", donVi: "đồng/kg", kyTruoc: 265000, hienTai: 262000, bienDong: -1.1 },
      { matHang: "Gà ta sống", donVi: "đồng/kg", kyTruoc: 128000, hienTai: 125000, bienDong: -2.3 },
      { matHang: "Trứng gà công nghiệp", donVi: "đồng/chục", kyTruoc: 29000, hienTai: 30500, bienDong: 5.2 },
      { matHang: "Rau muống", donVi: "đồng/kg", kyTruoc: 15000, hienTai: 13500, bienDong: -10.0 },
      { matHang: "Xăng RON95-III", donVi: "đồng/lít", kyTruoc: 23150, hienTai: 23890, bienDong: 3.2 },
      { matHang: "Dầu diesel 0.05S", donVi: "đồng/lít", kyTruoc: 20480, hienTai: 20950, bienDong: 2.3 },
      { matHang: "Gas bình 12kg", donVi: "đồng/bình", kyTruoc: 452000, hienTai: 445000, bienDong: -1.5 },
      { matHang: "Thép xây dựng CB300", donVi: "đồng/kg", kyTruoc: 14620, hienTai: 14930, bienDong: 2.1 },
      { matHang: "Xi măng PCB40", donVi: "đồng/tấn", kyTruoc: 1420000, hienTai: 1420000, bienDong: 0 }
    ]
  },

  // ---- Doanh nghiệp – Kinh tế ----
  doanhNghiep: {
    nganhNghe: {
      labels: ["Thương mại", "Dịch vụ", "Xây dựng", "Chế biến", "Nông nghiệp", "Khác"],
      values: [2860, 1980, 1540, 1210, 620, 432]
    },
    dnMoi: [
      { ten: "Công ty TNHH Thương mại Hòa Phát An", mst: "5702148863", nganh: "Thương mại", von: 12.5, ngay: "16/07/2026" },
      { ten: "Công ty CP Xây dựng Trường Thịnh", mst: "5702148791", nganh: "Xây dựng", von: 48, ngay: "15/07/2026" },
      { ten: "Công ty TNHH Chế biến Thủy sản Biển Đông", mst: "5702148702", nganh: "Chế biến", von: 85, ngay: "14/07/2026" },
      { ten: "Công ty TNHH Du lịch Xanh Đại Đồng", mst: "5702148654", nganh: "Dịch vụ", von: 6.8, ngay: "13/07/2026" },
      { ten: "Công ty CP Nông nghiệp CNC Tân Lập", mst: "5702148577", nganh: "Nông nghiệp", von: 32, ngay: "10/07/2026" },
      { ten: "Công ty TNHH Vận tải Quang Trung Express", mst: "5702148512", nganh: "Dịch vụ", von: 9.5, ngay: "09/07/2026" },
      { ten: "Công ty TNHH MTV Cơ khí Nghĩa Hưng", mst: "5702148445", nganh: "Chế biến", von: 15, ngay: "08/07/2026" },
      { ten: "Công ty CP Đầu tư Hạ tầng số Bến Thủy", mst: "5702148390", nganh: "Dịch vụ", von: 120, ngay: "07/07/2026" },
      { ten: "Công ty TNHH TM Vật liệu Hòa Bình", mst: "5702148321", nganh: "Thương mại", von: 7.2, ngay: "05/07/2026" },
      { ten: "Công ty TNHH May mặc XK Sông Lam", mst: "5702148266", nganh: "Chế biến", von: 56, ngay: "03/07/2026" }
    ]
  },

  // ---- Thanh tra / Kiểm toán ----
  thanhTra: {
    kienNghiQuy: {
      labels: ["Quý I", "Quý II", "Quý III"],
      daXuLy: [86, 74, 41],
      ton: [22, 31, 64]
    },
    cuocThanhTra: [
      { ten: "Thanh tra quản lý vốn đầu tư công 2024–2025", doiTuong: "BQLDA Giao thông", linhVuc: "Đầu tư công", trangThai: "dang tien hanh", xuLy: 0 },
      { ten: "Thanh tra sử dụng ngân sách khối giáo dục", doiTuong: "12 trường THPT", linhVuc: "Ngân sách", trangThai: "cho ket luan", xuLy: 0 },
      { ten: "Thanh tra mua sắm thiết bị y tế 2024", doiTuong: "Bệnh viện Đa khoa tỉnh", linhVuc: "Tài sản công", trangThai: "da ban hanh kl", xuLy: 72 },
      { ten: "Kiểm toán ngân sách địa phương 2025 (KTNN KV III)", doiTuong: "UBND tỉnh", linhVuc: "Ngân sách", trangThai: "theo doi sau tt", xuLy: 84 },
      { ten: "Thanh tra quản lý đất công ích cấp xã", doiTuong: "8 xã/phường", linhVuc: "Tài sản công", trangThai: "da ban hanh kl", xuLy: 45 },
      { ten: "Thanh tra thu phí, lệ phí Trung tâm HCC", doiTuong: "Trung tâm HCC tỉnh", linhVuc: "CCHC", trangThai: "da ban hanh kl", xuLy: 100 },
      { ten: "Thanh tra dự án Khu tái định cư Tân Phú", doiTuong: "UBND phường Tân Phú", linhVuc: "Đầu tư công", trangThai: "dang tien hanh", xuLy: 0 },
      { ten: "Thanh tra hoàn thuế GTGT doanh nghiệp xuất khẩu", doiTuong: "Thuế tỉnh", linhVuc: "Ngân sách", trangThai: "cho ket luan", xuLy: 0 },
      { ten: "Thanh tra trách nhiệm người đứng đầu về tiếp dân", doiTuong: "5 sở, ngành", linhVuc: "CCHC", trangThai: "theo doi sau tt", xuLy: 91 },
      { ten: "Thanh tra khai thác khoáng sản cát, sỏi lòng sông", doiTuong: "6 doanh nghiệp", linhVuc: "Tài nguyên", trangThai: "da ban hanh kl", xuLy: 58 }
    ]
  },

  // ---- Cải cách hành chính ----
  cchc: {
    hoSoThang: {
      tiepNhan: [3820, 3540, 4120, 4260, 4080, 4310, 4520, 4380, 4610, 4720, 4650, 3610],
      dungHan: [3660, 3420, 3980, 4090, 3950, 4180, 4370, 4210, 4450, 4560, 4480, 3500]
    },
    theoXa: [
      { ten: "Phường Hòa Bình", tiepNhan: 6240, dungHan: 98.2, haiLong: 4.7, xepLoai: "tot" },
      { ten: "Phường Bến Thành Đông", tiepNhan: 5820, dungHan: 97.6, haiLong: 4.6, xepLoai: "tot" },
      { ten: "Phường Quang Trung", tiepNhan: 5140, dungHan: 96.8, haiLong: 4.5, xepLoai: "tot" },
      { ten: "Xã Tân Lập", tiepNhan: 4360, dungHan: 96.1, haiLong: 4.4, xepLoai: "kha" },
      { ten: "Phường Tân Phú", tiepNhan: 4120, dungHan: 95.4, haiLong: 4.4, xepLoai: "kha" },
      { ten: "Xã Đại Đồng", tiepNhan: 3680, dungHan: 94.8, haiLong: 4.3, xepLoai: "kha" },
      { ten: "Xã Nghĩa Hưng", tiepNhan: 3250, dungHan: 93.6, haiLong: 4.2, xepLoai: "kha" },
      { ten: "Phường Bến Thủy", tiepNhan: 2980, dungHan: 92.4, haiLong: 4.1, xepLoai: "trung binh" },
      { ten: "Xã Sông Hiếu", tiepNhan: 2640, dungHan: 91.2, haiLong: 4.0, xepLoai: "trung binh" },
      { ten: "Xã Kênh Bắc", tiepNhan: 2210, dungHan: 89.8, haiLong: 3.9, xepLoai: "trung binh" }
    ]
  },

  // ---- Báo cáo & Xuất dữ liệu ----
  baoCaoAll: [
    { ten: "Báo cáo điều hành tài chính – kinh tế tuần 29", loai: "dinh ky", ky: "Tuần 29/2026", donVi: "Văn phòng UBND tỉnh", ngay: "17/07/2026", trangThai: "da phat hanh" },
    { ten: "Báo cáo giải ngân đầu tư công đến 15/07", loai: "dinh ky", ky: "Kỳ 15/07/2026", donVi: "Sở Tài chính", ngay: "16/07/2026", trangThai: "da phat hanh" },
    { ten: "Báo cáo nhanh biến động giá vật liệu xây dựng", loai: "dot xuat", ky: "Tuần 28–29/2026", donVi: "Sở Xây dựng", ngay: "15/07/2026", trangThai: "da phat hanh" },
    { ten: "Báo cáo chuyên đề nợ thuế quá hạn trên 90 ngày", loai: "chuyen de", ky: "Quý II/2026", donVi: "Thuế tỉnh", ngay: "14/07/2026", trangThai: "da phat hanh" },
    { ten: "Báo cáo đột xuất sự cố thu phí dịch vụ công", loai: "dot xuat", ky: "12/07/2026", donVi: "Trung tâm HCC", ngay: "—", trangThai: "cho duyet" },
    { ten: "Báo cáo thu – chi NSNN tháng 6/2026", loai: "dinh ky", ky: "Tháng 6/2026", donVi: "Sở Tài chính", ngay: "10/07/2026", trangThai: "da phat hanh" },
    { ten: "Báo cáo chuyên đề sắp xếp cơ sở nhà đất dôi dư", loai: "chuyen de", ky: "Đợt 2/2026", donVi: "Sở Tài chính", ngay: "—", trangThai: "cho duyet" },
    { ten: "Báo cáo tình hình doanh nghiệp 6 tháng đầu năm", loai: "dinh ky", ky: "6T/2026", donVi: "Sở Tài chính (ĐKKD)", ngay: "08/07/2026", trangThai: "da phat hanh" },
    { ten: "Báo cáo kết quả xử lý kiến nghị sau thanh tra", loai: "chuyen de", ky: "Quý II/2026", donVi: "Thanh tra tỉnh", ngay: "05/07/2026", trangThai: "da phat hanh" },
    { ten: "Báo cáo chỉ số CCHC các xã, phường Quý II", loai: "dinh ky", ky: "Quý II/2026", donVi: "Sở Nội vụ", ngay: "03/07/2026", trangThai: "da phat hanh" },
    { ten: "Báo cáo CPI và giá cả thị trường tháng 7", loai: "dinh ky", ky: "Tháng 7/2026", donVi: "Chi cục Thống kê", ngay: "—", trangThai: "dang lap" },
    { ten: "Báo cáo giữa kỳ kế hoạch đầu tư công trung hạn", loai: "chuyen de", ky: "2026–2030", donVi: "Sở Tài chính", ngay: "—", trangThai: "dang lap" }
  ],

  // ---- GIS – Bản đồ số ----
  gisDiaBan: [
    { ten: "Phường Điện Biên Phủ", lat: 21.386, lng: 103.017, thu: 742, kh: 104 },
    { ten: "Phường Mường Thanh", lat: 21.383, lng: 103.005, thu: 415, kh: 97 },
    { ten: "Xã Mường Phăng", lat: 21.42, lng: 103.145, thu: 86, kh: 79 },
    { ten: "Xã Tuần Giáo", lat: 21.585, lng: 103.42, thu: 268, kh: 88 },
    { ten: "Xã Mường Ảng", lat: 21.52, lng: 103.28, thu: 196, kh: 84 },
    { ten: "Xã Tủa Chùa", lat: 21.90, lng: 103.35, thu: 121, kh: 71 },
    { ten: "Xã Mường Chà", lat: 21.75, lng: 103.10, thu: 154, kh: 76 },
    { ten: "Xã Mường Nhé", lat: 22.18, lng: 102.47, thu: 64, kh: 68 },
    { ten: "Xã Nậm Pồ", lat: 22.02, lng: 102.75, thu: 58, kh: 72 },
    { ten: "Xã Điện Biên Đông", lat: 21.22, lng: 103.20, thu: 98, kh: 74 }
  ],

  // ---- Quản trị người dùng ----
  nguoiDung: [
    { ten: "Nguyễn Văn Thành", donVi: "UBND tỉnh", vaiTro: "lanh dao tinh", online: true, lanCuoi: "Đang trực tuyến" },
    { ten: "Trần Thị Mai Hương", donVi: "UBND tỉnh", vaiTro: "lanh dao tinh", online: true, lanCuoi: "5 phút trước" },
    { ten: "Lê Quốc Bảo", donVi: "Sở Tài chính", vaiTro: "lanh dao so", online: true, lanCuoi: "Đang trực tuyến" },
    { ten: "Phạm Minh Đức", donVi: "Sở Xây dựng", vaiTro: "lanh dao so", online: false, lanCuoi: "1 giờ trước" },
    { ten: "Hoàng Thị Lan Anh", donVi: "Sở Y tế", vaiTro: "lanh dao so", online: true, lanCuoi: "12 phút trước" },
    { ten: "Võ Đình Khang", donVi: "Thuế tỉnh", vaiTro: "lanh dao so", online: false, lanCuoi: "Hôm qua 16:40" },
    { ten: "Đặng Thu Trang", donVi: "Phường Hòa Bình", vaiTro: "lanh dao xa", online: true, lanCuoi: "Đang trực tuyến" },
    { ten: "Bùi Văn Hùng", donVi: "Xã Tân Lập", vaiTro: "lanh dao xa", online: false, lanCuoi: "2 giờ trước" },
    { ten: "Ngô Thị Kim Chi", donVi: "Xã Đại Đồng", vaiTro: "lanh dao xa", online: false, lanCuoi: "Hôm qua 09:15" },
    { ten: "Đỗ Hải Nam", donVi: "Sở Tài chính", vaiTro: "chuyen vien", online: true, lanCuoi: "Đang trực tuyến" },
    { ten: "Lý Thanh Tùng", donVi: "Văn phòng UBND tỉnh", vaiTro: "chuyen vien", online: true, lanCuoi: "3 phút trước" },
    { ten: "Phan Thị Ngọc Hà", donVi: "Trung tâm HCC", vaiTro: "chuyen vien", online: false, lanCuoi: "14/07/2026 17:20" }
  ],

  // ---- Cấu hình KPI ----
  kpiConfig: [
    { ma: "KPI-NS-01", ten: "Tổng thu NSNN lũy kế", domain: "Ngân sách", donViTinh: "tỷ đồng", nguong: "< 90% tiến độ dự toán", tanSuat: "Hằng ngày", hienThi: true },
    { ma: "KPI-NS-02", ten: "Thu tiền sử dụng đất", domain: "Ngân sách", donViTinh: "tỷ đồng", nguong: "< 80% tiến độ dự toán", tanSuat: "Hằng tuần", hienThi: true },
    { ma: "KPI-NS-03", ten: "Chi thường xuyên / tổng chi", domain: "Ngân sách", donViTinh: "%", nguong: "> 62%", tanSuat: "Hằng tháng", hienThi: false },
    { ma: "KPI-DT-01", ten: "Tỷ lệ giải ngân đầu tư công", domain: "Đầu tư công", donViTinh: "%", nguong: "< 95% kịch bản", tanSuat: "Hằng ngày", hienThi: true },
    { ma: "KPI-DT-02", ten: "Số dự án chậm tiến độ", domain: "Đầu tư công", donViTinh: "dự án", nguong: "> 2 dự án", tanSuat: "Hằng tuần", hienThi: true },
    { ma: "KPI-GC-01", ten: "CPI so với tháng trước", domain: "Giá cả", donViTinh: "%", nguong: "> 0,8%/tháng", tanSuat: "Hằng tháng", hienThi: true },
    { ma: "KPI-GC-02", ten: "Biến động giá vật liệu xây dựng", domain: "Giá cả", donViTinh: "%", nguong: "> 3%/2 tuần", tanSuat: "Hằng tuần", hienThi: false },
    { ma: "KPI-DN-01", ten: "Doanh nghiệp thành lập mới", domain: "Doanh nghiệp", donViTinh: "DN/tháng", nguong: "—", tanSuat: "Hằng tháng", hienThi: true },
    { ma: "KPI-DN-02", ten: "Nợ thuế quá hạn 90 ngày", domain: "Doanh nghiệp", donViTinh: "tỷ đồng", nguong: "> 200 tỷ", tanSuat: "Hằng tuần", hienThi: true },
    { ma: "KPI-HC-01", ten: "Tỷ lệ hồ sơ TTHC đúng hạn", domain: "CCHC", donViTinh: "%", nguong: "< 96%", tanSuat: "Hằng ngày", hienThi: true },
    { ma: "KPI-HC-02", ten: "Điểm hài lòng người dân", domain: "CCHC", donViTinh: "điểm/5", nguong: "< 4,0", tanSuat: "Hằng quý", hienThi: false },
    { ma: "KPI-TT-01", ten: "Kiến nghị thanh tra chưa xử lý", domain: "Thanh tra", donViTinh: "kiến nghị", nguong: "> 50", tanSuat: "Hằng tháng", hienThi: true }
  ]
};
