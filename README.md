# Cải & Biệt đội Bủm

Game web phiêu lưu tương tác dành riêng cho Cải, khoảng 6 tuổi. Bản thử có một tập hoàn chỉnh, dùng chuột, chạm hoặc phím Tab/Enter. Không cần cài thư viện, tài khoản hay API key.

## Chạy

Cần Node.js 20 trở lên:

```sh
npm start
```

Mở http://127.0.0.1:4173. Server chỉ nghe trên máy hiện tại. Chưa phát hành ra internet. Các file tĩnh có thể triển khai sau khi gia đình duyệt bản chơi thử.

```sh
npm test
```

## Nội dung

- `docs/CAI_CHARACTER.md`: hồ sơ nhân vật gốc, dùng để kiểm tra mọi tập sau.
- `docs/GAME_DESIGN.md`: tư vấn loại game, cốt truyện, mỹ thuật, nhịp chơi, phạm vi và kế hoạch phát triển.
- `docs/ART_DIRECTION.md`: nguồn ảnh và prompt cảnh mới tạo bằng imagegen tích hợp.
- `state.js`: trạng thái tập truyện; kiểm tra tiến độ lưu, thứ tự nhiệm vụ và dấu khám phá.
- `app.js`, `styles.css`, `index.html`: giao diện và trò chơi không phụ thuộc framework.
- `assets/`: cảnh chơi và ảnh tham chiếu người dùng cung cấp.

## Những gì bản thử làm được

Tìm ba món đồ → lắp ba bộ phận đúng thứ tự → thử vòng thở (có thể bỏ qua) → chọn cách đón gió → xe chạy → nhận dấu và kết thúc. Có gợi ý, tạm nghỉ, sổ khám phá, hiệu ứng âm thanh tự tổng hợp, tuỳ chọn đọc lời thoại, góc bố mẹ, chơi lại và lưu tiến độ bằng localStorage.

## Giới hạn cần biết

- Đây là truyện tương tác trên một tranh nền 3D, chưa phải game điều khiển nhân vật 3D hoặc chạy nhảy tự do.
- Tập 2 và 3 mới là ý tưởng, được ghi rõ trên giao diện.
- Thời lượng mục tiêu 5–8 phút tính cả trò chuyện, chưa đo với Cải. Có thể chơi nhanh hơn nhiều.
- Lời đọc phụ thuộc giọng tiếng Việt trên thiết bị; không tự phát. Nếu không có giọng, giao diện hướng dẫn bố mẹ cùng đọc. Giọng của hệ thống có thể dùng dịch vụ mạng; không có micro hay nhận diện giọng nói.
- Tiến độ nằm trên trình duyệt hiện tại; không đồng bộ, có thể mất khi xoá dữ liệu. Nếu lưu bị chặn, game vẫn chạy trong phiên đó.
- Hiện dùng emoji cho chiếc xe chuyển động và hai hình minh họa tập ý tưởng. Đồ họa sản phẩm tiếp theo cần sprite/hoạt ảnh và thu âm nhất quán.
- Không có analytics, quảng cáo hoặc gọi backend. Các ảnh gốc vẫn nằm trong dự án để tham chiếu. Khi phát hành, chỉ đóng gói những tài sản cần dùng.

## Nguồn kỹ thuật

[MDN: SpeechSynthesis.getVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices) giải thích danh sách giọng do thiết bị cung cấp.
