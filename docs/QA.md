# Kiểm tra bản thử — 23/09/2026

## Đã kiểm tra

- `npm test`: 4 kiểm tra logic đều qua, gồm toàn bộ hành trình, thử sai không mất tiến độ, khôi phục mỗi chặng, dữ liệu lưu hỏng và hành động sai thứ tự.
- `node --check app.js`, `node --check server.mjs`: cú pháp hợp lệ.
- Trình duyệt trong ứng dụng: bắt đầu → tìm ba đồ → lắp ba bộ phận → vòng thở → thí nghiệm → kết thúc → sổ khám phá.
- Nhặt hai đồ rồi tải lại trang: nút Tiếp tục xuất hiện, túi vẫn giữ 2/3 món.
- Lắp nhầm chiếc lá và chọn viên đá: hiện gợi ý phù hợp, không trừ điểm hoặc xoá tiến độ.
- Tạm nghỉ lúc vòng thở chạy: dừng vòng thở, có thể tiếp tục.
- Chơi từ đầu qua Góc bố mẹ: hộp xác nhận hiện rõ, tạo lượt chơi mới thành công.
- Sổ khám phá sau hoàn thành: nhận đủ 3 dấu.
- Nút gợi ý ở thời điểm xe đã chạy: trả thông báo phù hợp.
- Kiểm tra trực quan desktop và viewport 390 px; màn chơi/kết thúc không tràn ngang (scrollWidth = innerWidth = 390).
- Không ghi nhận warning/error trình duyệt trong lượt kiểm tra.
- Kiểm tra dùng một origin/cổng riêng 4174 để không sửa tiến độ trong bản cho gia đình ở 4173.

## Chưa xác minh

- Chưa playtest với Cải; chưa xác nhận thời lượng, độ vui, mức đọc hiểu và độ khó thực tế.
- Chưa thử trên phần cứng tablet/iPhone/Android thật; viewport nhỏ chỉ kiểm tra bố cục và luồng.
- Chưa đánh giá chất lượng giọng tiếng Việt hoặc nghe thử hiệu ứng trên loa thiết bị của gia đình.
- Chưa đo FPS hoặc ngân sách tải trên mạng di động. Các ảnh hiện còn PNG gốc.
- Chưa phát hành công khai hoặc cấu hình truy cập từ thiết bị khác.
