# Chuyện của Cải

Thư viện truyện tranh toàn màn hình dành riêng cho Cải. Tập đầu, **Cải và Đêm Đom Đóm Mất Sáng**, có 14 trang minh hoạ riêng, hiệu ứng lật trang 3D, kịch bản lồng tiếng theo từng trang và cơ chế nạp file audio để nghe thử ngay trong trình duyệt.

## Chạy tại máy

Cần Node.js 20 trở lên:

```sh
npm start
```

Mở <http://127.0.0.1:4173>. Dự án không gọi backend, không quảng cáo và không thu thập dữ liệu.

```sh
npm test
```

## Cách đọc

- Bấm **Mở truyện**, chạm hai mép trang, vuốt ngang hoặc dùng phím mũi tên để lật.
- Bấm **Kịch bản** để xem lời kể, hội thoại và chỉ dẫn giọng của trang hiện tại.
- Bấm **Giọng đọc → Nạp file thu âm** để chọn một hoặc nhiều file audio. Tên file cần có số trang, ví dụ `page-02.mp3`, `trang_14.wav`.
- Audio chỉ nằm trong bộ nhớ của phiên trình duyệt; reload trang sẽ cần nạp lại. Cách này phù hợp để duyệt bản thu mà không tải file lên dịch vụ nào.

## Thêm audio cố định

Tạo thư mục `assets/audio/firefly/`, đặt các file theo trang, rồi bổ sung đường dẫn vào dữ liệu trong `story-data.js`. Nếu dùng Deepgram để tạo voice, chạy việc tạo audio ở backend hoặc bằng script build cục bộ. Không đặt API key vào `app.js`, `story-data.js` hoặc bất kỳ JavaScript nào được gửi tới trình duyệt.

## Cấu trúc

- `story-data.js`: nội dung hiển thị, lời thoại, chỉ dẫn giọng và đường dẫn tranh.
- `docs/STORY_01_SCRIPT.md`: kịch bản sản xuất đầy đủ theo 14 trang.
- `docs/CAI_CHARACTER.md`: hồ sơ tính cách gốc của Cải.
- `assets/stories/firefly/`: 14 tranh WebP, mỗi trang là một cảnh độc lập.
- `app.js`, `styles.css`: thư viện truyện, trình đọc, lật trang, kịch bản và audio preview.

## Tranh minh hoạ

14 tranh được tạo bằng công cụ imagegen tích hợp, dùng ảnh Cải làm tham chiếu nhận diện và ảnh phiêu lưu do gia đình cung cấp làm tham chiếu chất lượng/phong cách. Prompt chung và mô tả cảnh từng trang nằm trong `docs/ART_DIRECTION.md` và `docs/STORY_01_SCRIPT.md`.

## Git

Commit `461b8eb` giữ nguyên bản game tương tác đầu tiên. Phiên bản truyện tranh được phát triển sau commit đó để có thể so sánh hoặc quay lại khi cần.
