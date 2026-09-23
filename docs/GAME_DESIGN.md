# Cải & Biệt đội Bủm

## Đề xuất sản phẩm

Game web phiêu lưu dạng truyện tương tác 2.5D: tranh có chiều sâu, các vật thể chạm được và chuyển động nhẹ. Chơi trên máy tính hoặc tablet, dùng chuột hoặc ngón tay. Tập đầu nhắm khoảng 5–8 phút khi cùng trò chuyện với bố mẹ; thời gian này là mục tiêu thiết kế, chưa phải số đo playtest. Không cần tài khoản, không quảng cáo, không vật phẩm mua, không bảng xếp hạng.

Lựa chọn này dựa trên mô tả của gia đình: Cải thích khám phá thật, tương tác, máy móc và truyện hơn chơi điện thoại lâu. Điểm mạnh là nhịp chơi tự quyết, có hội thoại, thử nghiệm và điểm kết thúc. Platformer cần phản xạ hoặc thế giới 3D tự do sẽ tăng độ khó điều khiển và chi phí sản xuất; có thể thêm sau khi quan sát Cải chơi.

## Lời hứa của game

“Mỗi tiếng bủm mở ra một điều kỳ lạ. Mỗi cuộc phiêu lưu giúp Cải thử thêm một chút.”

Cải là người khám phá. **Bắp**, hamster vàng tròn trịa, là bạn đồng hành: tốt bụng, mê cà rốt, rất tự tin dù hay đoán sai. **Sâu Bủm**, sâu xanh mềm tròn, xấu hổ vì những cú bủm ngoài ý muốn. Bạn sâu không phải phản diện vì có mùi; bé giúp bạn sửa hậu quả và tìm cách dùng luồng gió tưởng tượng trong thế giới hoạt hình. Đây là cơ chế hư cấu, không phải giải thích sinh học.

## Tập 1 — Bí mật khu vườn tí hon

1. **Tiếng động sau bụi cải:** Cải và Bắp nghe “BỦM!”; chiếc xe chở hạt của Sâu Bủm bung đồ. Bắp tưởng đó là tiếng động cơ tên lửa.
2. **Nhà thám hiểm tí hon:** chạm tìm bánh xe, bánh răng và chiếc lá trong cảnh. Đếm đến ba trong ngữ cảnh có ích. Gợi ý luôn sẵn.
3. **Xưởng xe lá:** chọn đúng bộ phận cho bánh xe → bộ truyền động → cánh quạt. Chọn sai nhận câu gợi mở vui, được thử lại ngay.
4. **Một nhịp bình tĩnh:** Cải sốt ruột vì xe chưa chạy; cùng Bủm hít vào/thở ra theo vòng tròn chậm. Có nút tiếp tục khi đã sẵn sàng, không giữ trẻ trong hoạt động bắt buộc.
5. **Thí nghiệm bủm:** chọn cánh quạt để nhận luồng gió, thay vì còi hoặc viên đá. Xe chuyển động, hạt giống được đưa tới vườn. Kết quả nhìn thấy ngay.
6. **Bạn mới, chuyện mới:** nhận ba dấu trong sổ: tò mò, kiên trì, tử tế. Mời cùng bố mẹ thổi chong chóng giấy và hỏi “Gió làm cánh quạt quay thế nào?”. Không mở tập kế tự động.

## Vòng chơi và tương tác

Quan sát → chạm/thử → nhận phản hồi → nghe một câu chuyện → mở một thay đổi trong cảnh. Mỗi màn chỉ một mục tiêu chính. Nút lớn tối thiểu 44 px, ưu tiên 52–64 px. Có chuột/chạm/bàn phím, trạng thái focus, phản hồi bằng chữ và hình thay vì chỉ âm thanh. Không giới hạn thời gian, điểm phạt hay chuỗi đăng nhập.

## Chỉ đạo mỹ thuật

- Hoạt hình 3D mềm, tròn; ánh nắng vàng, xanh lá, màu kem, cam cà rốt làm điểm nhấn.
- Đồ vật nhỏ thành kiến trúc lớn: lá thành mái, cúc áo thành bánh xe, que thành cầu.
- Giữ khuôn mặt và trang phục Cải nhất quán với ảnh chuẩn; ảnh thứ hai là định hướng bố cục/chất liệu. Phần bẩn/ruồi trong ảnh được giảm để game vui và dễ chịu.
- Giao diện dùng nền giấy kem, chữ xanh đậm, nút tròn, dấu đóng trong sổ. Mỗi màn có một điểm nhìn rõ.
- Bản thử sử dụng tranh raster + lớp tương tác HTML/CSS, chưa có nhân vật 3D chuyển động độc lập. Giai đoạn sau tách background, nhân vật, vật thể và hiệu ứng để chuyển động có chiều sâu.

## Âm thanh và kể chuyện

Hiệu ứng ngắn tự tổng hợp: nhặt đồ, lắp đúng, bủm, hoàn thành; tắt/bật dễ tìm. Đọc tiếng Việt là lựa chọn bổ sung nếu thiết bị có giọng phù hợp. Giọng hệ thống không đồng đều giữa thiết bị; sản phẩm hoàn thiện nên thu lời kể tiếng Việt và lời nhân vật. Không cần micro.

Tài liệu kỹ thuật: [MDN — SpeechSynthesis.getVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices): giọng khả dụng do thiết bị cung cấp. Bản thử chỉ chọn giọng vi, ưu tiên giọng cục bộ; không giả định máy nào cũng có giọng Việt.

## Các tập tiếp theo — mới là ý tưởng

- **Ga tàu Cà Rốt:** sửa đường ray bằng quy luật hình, học kiên trì; Bắp ăn nhầm vé cà rốt của mình.
- **Bưu điện Mây Bông:** chọn phương tiện theo gió/nước/đường; học giữ lời và giúp bạn.
- **Tên lửa Khoai Tây:** lắp tàu, khám phá quỹ đạo bằng hình đơn giản; học hợp tác. “Trạm điều khiển bố mẹ” cùng chơi.
- **Đèn sao cho Bủm:** tự chọn độ sáng, luôn có bạn, khám phá bóng và ánh sáng; chỉ phát triển sau khi gia đình thấy phù hợp với nỗi sợ bóng tối.

## Phạm vi bản chơi thử hiện tại

Một tập hoàn chỉnh với tìm ba món đồ, lắp ba bộ phận, vòng thở tùy chọn, thử nghiệm, kết thúc; sổ khám phá; góc bố mẹ; lưu tiến độ trên trình duyệt, chơi lại; âm thanh tổng hợp; đọc câu hiện tại nếu có giọng Việt. Không có backend, đồng bộ tài khoản hoặc phát hành công khai. Hai tập khác trên giao diện được ghi rõ là ý tưởng.

## Kế hoạch phát triển và tiêu chí quyết định

1. Cho Cải chơi một lượt cùng bố/mẹ. Quan sát bé có tự biết chạm ở đâu, hiểu mục tiêu qua hình, thấy vui và muốn kể lại câu chuyện không.
2. Nếu phải đọc hướng dẫn nhiều: bổ sung thu âm và hoạt ảnh hướng dẫn trước khi mở rộng số tập.
3. Nếu bé thích đi lại và điều khiển: thêm cơ chế chạm để Cải bước tới vật, giữ đường đi tự động.
4. Sau khi chốt nhịp chơi: sản xuất bộ biểu cảm Cải/Bắp/Bủm, hoạt ảnh và ba tập đầu; kiểm tra tablet thật, âm lượng, tải ảnh, cảm ứng và lưu tiến độ.
5. Chỉ cân nhắc engine 2D khi chuyển động/collision thực sự cần; không cần dựng toàn bộ 3D cho lối chơi này.

## Câu hỏi playtest

- Bé có tìm nút bắt đầu và đồ vật mà không cần bố mẹ chỉ từng lần?
- Bé có cười ở tiếng bủm hay phản ứng của Bắp? Có chi tiết nào khó chịu/sợ?
- Chọn sai có khiến bé thử tiếp hay bực? Gợi ý có vừa đủ không?
- Bé có kể lại vì sao giúp Sâu Bủm và xe chạy được thế nào?
- Khi kết thúc, bé có vui vẻ chuyển sang hoạt động thật không?
