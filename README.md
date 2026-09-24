# Chuyện của Cải

Thư viện truyện tranh toàn màn hình dành riêng cho Cải. Series hiện có bốn tập: **Thành Phố Ba Lô**, **Cuộc Đua Xe Bay Trên Lồng Mây**, **Cuộc Thám Hiểm Rừng Lười Biếng** và **Bí Ẩn Biển Bong Bóng**, mỗi tập 15 trang, cùng ngoại truyện **Đêm Đom Đóm Mất Sáng** (14 trang).

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

- `story-data.js`: danh sách truyện, nội dung hiển thị, lời thoại, chỉ dẫn giọng và đường dẫn tranh.
- `docs/STORY_BACKPACK_CITY.md`: kịch bản sản xuất Tập 01 theo 15 trang.
- `docs/STORY_SKY_RACE.md`: kịch bản sản xuất Tập 02 theo 15 trang.
- `docs/STORY_LAZY_FOREST.md`: kịch bản sản xuất Tập 03 theo 15 trang.
- `docs/STORY_BUBBLE_SEA.md`: kịch bản sản xuất Tập 04 theo 15 trang.
- `docs/STORY_01_SCRIPT.md`: kịch bản ngoại truyện Đom Đóm theo 14 trang.
- `docs/CAI_CHARACTER.md`: hồ sơ tính cách gốc của Cải.
- `assets/stories/backpack-city/`: 15 tranh WebP của Thành Phố Ba Lô.
- `assets/stories/sky-race/`: 15 tranh WebP của Cuộc Đua Xe Bay.
- `assets/stories/lazy-forest/`: 15 tranh WebP của Rừng Lười Biếng.
- `assets/stories/bubble-sea/`: 15 tranh WebP của Biển Bong Bóng.
- `assets/stories/firefly/`: 14 tranh WebP của ngoại truyện Đom Đóm.
- `app.js`, `styles.css`: thư viện truyện, trình đọc, lật trang, kịch bản và audio preview.

## Tranh minh hoạ

Các bộ tranh được tạo bằng công cụ imagegen tích hợp, dùng ảnh Cải làm tham chiếu nhận diện và ảnh phiêu lưu do gia đình cung cấp làm tham chiếu chất lượng/phong cách. Prompt chung và mô tả cảnh từng trang nằm trong `docs/ART_DIRECTION.md` và các file kịch bản.

## Git

Commit `461b8eb` giữ nguyên bản game tương tác đầu tiên. Phiên bản truyện tranh được phát triển sau commit đó để có thể so sánh hoặc quay lại khi cần.
