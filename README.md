# ResQ SOS Mien Trung - Landing Page & Rescuer Onboarding

Hệ thống Trang thông tin và Tiếp nhận Tình nguyện viên (Landing Page & Onboarding) thuộc dự án Hệ thống Hỗ trợ Cứu hộ và Điều phối Khẩn cấp (ResQ SOS) - Khu vực Miền Trung.

## 1. Giới thiệu dự án

Trang web này đóng vai trò là cổng thông tin chính thức, giúp kết nối cộng đồng và tiếp nhận sự hỗ trợ từ các tình nguyện viên. Điểm nhấn của dự án là quy trình **Đăng ký Tình nguyện viên (Rescuer Onboarding)** đa bước, đảm bảo thu thập đầy đủ thông tin về kỹ năng và chứng chỉ để hỗ trợ điều phối cứu hộ chính xác nhất.

## 2. Quy trình Đăng ký Tình nguyện viên (Rescuer Onboarding)

Hệ thống được thiết kế với quy trình 3 bước chuyên nghiệp để phân loại và đánh giá năng lực cứu hộ:

1.  **Bước 1: Tạo tài khoản (Account Creation)**: Đăng ký bằng Email và mật khẩu, xác thực qua email để đảm bảo tính chính chủ.
2.  **Bước 2: Thông tin cá nhân (Personal Profile)**: Cập nhật thông tin liên lạc và vị trí hiện tại (hỗ trợ tự động lấy vị trí qua GPS/Maps).
3.  **Bước 3: Đánh giá Năng lực (Ability Assessment)**:
    *   **Câu hỏi tiên quyết**: Xác nhận các điều kiện cơ bản về sức khỏe, pháp lý và cam kết đào tạo.
    *   **Kỹ năng chi tiết**: Lựa chọn các kỹ năng chuyên môn (Cứu hộ, Y tế, Vận chuyển...).
    *   **Chứng chỉ**: Tải lên các minh chứng (bằng lái, chứng chỉ y tế, bằng bơi lội...) để hệ thống phê duyệt.

## 3. Công nghệ sử dụng (Tech Stack)

- **Framework:** Vite + React 19 (App Logic).
- **Ngôn ngữ:** TypeScript (Type-safety).
- **Styling:** Tailwind CSS 4 (Modern UI).
- **Hiệu ứng & 3D:**
  - GSAP & Framer Motion (Animations).
  - Three.js (@react-three/fiber) & @google/model-viewer (Hiển thị mô hình 3D tương tác).
- **Quản lý trạng thái:** Zustand (Global State), Tanstack Query (Server State).
- **Dịch vụ & Tiện ích:**
  - Axios (API Communication).
  - Firebase (Authentication & Cloud Messaging).
  - Cloudinary (Image/File Upload).
  - Sonner (Hệ thống thông báo Toast).

## 4. Hướng dẫn cài đặt (Installation Guide)

### Yêu cầu hệ thống
- Node.js phiên bản 18+ hoặc 20+.
- Trình duyệt hiện đại hỗ trợ WebGL (để hiển thị 3D).

### Các bước thực hiện
1.  **Cài đặt thư viện**:
    ```bash
    npm install
    ```
2.  **Cấu hình môi trường**: Tạo file `.env` dựa trên các biến sau:
    - `VITE_API_BASE_URL`: Endpoint của Backend API.
    - `VITE_FIREBASE_*`: Cấu hình Firebase Auth/Messaging.
3.  **Chạy môi trường phát triển**:
    ```bash
    npm run dev
    ```
    Truy cập tại: `http://localhost:5173`

## 5. Cấu trúc mã nguồn (Source Code Structure)

- `/src/components`: Chứa các thành phần UI, đặc biệt là thư mục `/auth` cho luồng đăng ký Rescuer.
- `/src/services`: Định nghĩa các API hooks và kết nối Backend (Abilities, Auth, Form...).
- `/src/stores`: Quản lý trạng thái Onboarding và người dùng.
- `/src/assets`: Chứa các tài nguyên tĩnh và mô hình 3D (.glb).
- `/src/hooks`: Các logic dùng chung như `useAuth`, `useLocation`.
- `/src/constants`: Định nghĩa danh sách câu hỏi, kỹ năng và quy tắc ràng buộc (Skill Conflicts).

---

_Dự án thuộc Bộ môn Kỹ thuật phần mềm - Capstone Project submission._
